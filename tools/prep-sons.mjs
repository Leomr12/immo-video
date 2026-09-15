/**
 * Fabrique les bruitages et la nappe musicale du film.
 *
 * Tout est synthétisé ici, à partir de rien : pas de banque de sons, donc pas de
 * licence à vérifier et pas de fichier téléchargé dont on ne saurait pas d'où il
 * vient. C'est la réponse au « ⟦ prévoir la licence de la piste avant diffusion ⟧ »
 * du dossier — il n'y a plus de licence à prévoir.
 *
 * Sortie : public/son/bruitages/*.mp3 et public/son/musique/nappe.mp3.
 *
 * Relancer :  node tools/prep-sons.mjs
 * (nécessite le ffmpeg de Remotion, appelé via `npx remotion ffmpeg`)
 */
import {execFileSync} from 'node:child_process';
import {mkdirSync, writeFileSync, unlinkSync} from 'node:fs';
import {dirname} from 'node:path';

const SR = 44100;
const racine = new URL('..', import.meta.url).pathname;

// ── Boîte à outils ────────────────────────────────────────────────────────────

/** Bruit blanc à graine fixe : deux exécutions donnent le même fichier. */
const bruit = (() => {
  let a = 987654321;
  return () => {
    a = (a * 1103515245 + 12345) & 0x7fffffff;
    return (a / 0x3fffffff) - 1;
  };
})();

/** Passe-bas à un pôle. `coupure` en Hz. */
const passeBas = (entree, coupure) => {
  const sortie = new Float64Array(entree.length);
  let precedent = 0;
  const k = Math.exp((-2 * Math.PI * coupure) / SR);
  for (let i = 0; i < entree.length; i++) {
    precedent = entree[i] * (1 - k) + precedent * k;
    sortie[i] = precedent;
  }
  return sortie;
};

/** Passe-haut à un pôle, par soustraction du passe-bas. */
const passeHaut = (entree, coupure) => {
  const bas = passeBas(entree, coupure);
  const sortie = new Float64Array(entree.length);
  for (let i = 0; i < entree.length; i++) sortie[i] = entree[i] - bas[i];
  return sortie;
};

/** Décroissance exponentielle, `tau` en secondes. */
const decroissance = (t, tau) => Math.exp(-t / tau);

/** Attaque courte puis décroissance — évite le clic de début de fichier. */
const enveloppe = (t, attaque, tau) =>
  (t < attaque ? t / attaque : 1) * decroissance(Math.max(0, t - attaque), tau);

/** Saturation douce : arrondit les crêtes au lieu de les écrêter. */
const adoucir = (x) => Math.tanh(x * 1.2) / Math.tanh(1.2);

/**
 * Ramène le signal à une crête donnée.
 *
 * Sans cela chaque son sort au niveau où la synthèse l'a laissé : le souffle
 * saturait pendant que le tick s'entendait à peine, et les volumes réglés dans
 * `bruitages.ts` ne voulaient plus rien dire. Après passage ici, un volume de
 * 0,8 signifie la même chose pour tous.
 */
const normaliser = (canaux, crete) => {
  let pic = 0;
  for (const canal of canaux) for (const v of canal) pic = Math.max(pic, Math.abs(v));
  if (pic === 0) return canaux;
  const gain = crete / pic;
  for (const canal of canaux) for (let i = 0; i < canal.length; i++) canal[i] *= gain;
  return canaux;
};

/** Écrit un WAV 16 bits. `canaux` est un tableau de Float64Array. */
const ecrireWav = (chemin, canaux) => {
  const n = canaux[0].length;
  const c = canaux.length;
  const donnees = Buffer.alloc(n * c * 2);
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < c; k++) {
      const v = Math.max(-1, Math.min(1, canaux[k][i]));
      donnees.writeInt16LE(Math.round(v * 32767), (i * c + k) * 2);
    }
  }
  const entete = Buffer.alloc(44);
  entete.write('RIFF', 0);
  entete.writeUInt32LE(36 + donnees.length, 4);
  entete.write('WAVE', 8);
  entete.write('fmt ', 12);
  entete.writeUInt32LE(16, 16);
  entete.writeUInt16LE(1, 20);
  entete.writeUInt16LE(c, 22);
  entete.writeUInt32LE(SR, 24);
  entete.writeUInt32LE(SR * c * 2, 28);
  entete.writeUInt16LE(c * 2, 32);
  entete.writeUInt16LE(16, 34);
  entete.write('data', 36);
  entete.writeUInt32LE(donnees.length, 40);
  mkdirSync(dirname(chemin), {recursive: true});
  writeFileSync(chemin, Buffer.concat([entete, donnees]));
};

/** WAV → MP3, via le ffmpeg que Remotion embarque. */
const versMp3 = (wav, mp3, debit = '160k') => {
  execFileSync('npx', ['remotion', 'ffmpeg', '-y', '-loglevel', 'error', '-i', wav, '-codec:a', 'libmp3lame', '-b:a', debit, mp3], {
    cwd: racine,
    stdio: 'inherit',
  });
  unlinkSync(wav);
};

const secondes = (s) => Math.round(s * SR);

// ── Bruitages ─────────────────────────────────────────────────────────────────

/** Le *tick* du radar : très court, haut, discret. Plan 1. */
const tick = () => {
  const n = secondes(0.06);
  const s = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    s[i] = (Math.sin(2 * Math.PI * 2300 * t) * 0.7 + bruit() * 0.3) * enveloppe(t, 0.0006, 0.009);
  }
  return [passeHaut(s, 600)];
};

/** Le *ding* de validation : une cloche à deux partiels. Plan 8. */
const ding = () => {
  const n = secondes(1.1);
  const s = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    s[i] =
      Math.sin(2 * Math.PI * 1046.5 * t) * enveloppe(t, 0.002, 0.26) * 0.55 +
      Math.sin(2 * Math.PI * 1568 * t) * enveloppe(t, 0.002, 0.15) * 0.3 +
      Math.sin(2 * Math.PI * 2093 * t) * enveloppe(t, 0.001, 0.06) * 0.14;
  }
  return [s];
};

/** Le *clic* de souris : deux impulsions, l'enfoncement et le relâchement. Plans 9 et 24. */
const clic = () => {
  const n = secondes(0.12);
  const s = new Float64Array(n);
  const impulsion = (depart, force, tau) => {
    for (let i = secondes(depart); i < n; i++) {
      const t = (i - secondes(depart)) / SR;
      s[i] += (bruit() * 0.8 + Math.sin(2 * Math.PI * 1700 * t) * 0.2) * decroissance(t, tau) * force;
    }
  };
  impulsion(0, 0.9, 0.0035);
  impulsion(0.045, 0.55, 0.0028);
  return [passeHaut(passeBas(s, 7000), 900)];
};

/** Le *clac* de pause : un corps grave sous une attaque sèche. Plan 3. */
const clac = () => {
  const n = secondes(0.3);
  const s = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    s[i] =
      bruit() * decroissance(t, 0.006) * 0.8 +
      Math.sin(2 * Math.PI * 150 * t) * decroissance(t, 0.07) * 0.5 +
      Math.sin(2 * Math.PI * 92 * t) * decroissance(t, 0.11) * 0.35;
  }
  return [passeBas(s, 5200)];
};

/** Le souffle montant, juste avant la marque. Plan 8. */
const souffle = () => {
  const duree = 1.9;
  const n = secondes(duree);
  const brut = new Float64Array(n);
  for (let i = 0; i < n; i++) brut[i] = bruit();
  // Le filtre s'ouvre à mesure que le souffle monte : un seul passe-bas dont la
  // coupure glisse, écrit à la main parce que la coupure varie par échantillon.
  const s = new Float64Array(n);
  let precedent = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const p = t / duree;
    const coupure = 180 + Math.pow(p, 2.2) * 6400;
    const k = Math.exp((-2 * Math.PI * coupure) / SR);
    precedent = brut[i] * (1 - k) + precedent * k;
    const gain = Math.pow(p, 1.6) * (p > 0.93 ? (1 - p) / 0.07 : 1);
    s[i] = precedent * gain * 2.6 + Math.sin(2 * Math.PI * (110 + p * 180) * t) * gain * 0.12;
  }
  return [s];
};

/** Le point qui se pose sur la parcelle : un *pop* rond et bref. Plan 9. */
const pose = () => {
  const n = secondes(0.35);
  const s = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    // La hauteur tombe vite : c'est ce qui fait entendre « ça se pose ».
    const f = 420 * Math.exp(-t * 16) + 150;
    s[i] = Math.sin(2 * Math.PI * f * t) * enveloppe(t, 0.003, 0.075) * 0.9;
  }
  return [passeBas(s, 3000)];
};

// ── La nappe ──────────────────────────────────────────────────────────────────

/**
 * 67,5 s à 104 BPM, en la mineur, sans voix.
 *
 * Elle suit le film plutôt que de tourner en boucle : elle n'est presque rien
 * pendant l'accroche, s'installe sur le coût du flou, s'ouvre en grand à
 * l'arrivée de la marque, monte au plan 20 comme le demande le script, se retire
 * sous la typographie de la fin, et s'éteint en 400 ms sur la dernière image.
 */
const nappe = () => {
  const duree = 67.5;
  const n = secondes(duree);
  const g = new Float64Array(n);
  const d = new Float64Array(n);

  const BPM = 104;
  const tempsMesure = (60 / BPM) * 4;

  // La ronde d'accords, quatre mesures chacune : Am · F · C · G.
  const ACCORDS = [
    {fondamentale: 110.0, notes: [220.0, 261.63, 329.63]}, // Am
    {fondamentale: 87.31, notes: [174.61, 220.0, 261.63]}, // F
    {fondamentale: 130.81, notes: [196.0, 261.63, 329.63]}, // C
    {fondamentale: 98.0, notes: [196.0, 246.94, 293.66]}, // G
  ];

  /** Rampe douce entre deux instants — sert à ouvrir et fermer chaque couche. */
  const palier = (t, a, b, de, vers) => {
    if (t <= a) return de;
    if (t >= b) return vers;
    const p = (t - a) / (b - a);
    return de + (vers - de) * (p * p * (3 - 2 * p));
  };

  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const accord = ACCORDS[Math.floor(t / tempsMesure) % ACCORDS.length];

    // Les niveaux de chaque couche, calés sur les actes du film.
    const niveauNappe =
      palier(t, 0, 3, 0.18, 0.34) *
      palier(t, 8.5, 12, 1, 1.25) *
      palier(t, 18.12, 20, 1, 1.5) *
      palier(t, 56.5, 58, 1, 0.8) *
      palier(t, 64, 67.1, 1, 0.85);
    const niveauBasse = palier(t, 8.5, 11, 0, 1) * palier(t, 56.5, 58, 1, 0.75);
    const niveauPouls = palier(t, 12.5, 15, 0, 1) * palier(t, 50.93, 53, 1, 1.3) * palier(t, 56.5, 57.5, 1, 0);
    const niveauArpege = palier(t, 18.12, 21, 0, 1) * palier(t, 50.93, 53, 1, 1.25) * palier(t, 56.5, 57.5, 1, 0);

    // La nappe : trois voix légèrement désaccordées, ouvertes en stéréo.
    let nappeG = 0;
    let nappeD = 0;
    accord.notes.forEach((f, k) => {
      const derive = Math.sin(2 * Math.PI * (0.07 + k * 0.03) * t) * 0.6;
      nappeG += Math.sin(2 * Math.PI * (f - derive) * t + k) * 0.33;
      nappeD += Math.sin(2 * Math.PI * (f + derive) * t + k * 1.7) * 0.33;
      // Une octave au-dessus, très en retrait : c'est ce qui donne l'air « ouvert ».
      nappeG += Math.sin(2 * Math.PI * (f * 2 + derive) * t) * 0.07;
      nappeD += Math.sin(2 * Math.PI * (f * 2 - derive) * t) * 0.07;
    });

    const basse =
      (Math.sin(2 * Math.PI * accord.fondamentale * t) * 0.7 +
        Math.sin(2 * Math.PI * accord.fondamentale * 0.5 * t) * 0.3) *
      niveauBasse *
      0.3;

    // Le pouls : une note tenue courte sur chaque temps, pas une grosse caisse.
    const tempsDansMesure = (t % (60 / BPM)) / (60 / BPM);
    const pouls =
      Math.sin(2 * Math.PI * 72 * t) * decroissance(tempsDansMesure * (60 / BPM), 0.055) * niveauPouls * 0.22;

    // L'arpège : une croche sur deux, en sinus doux, décalé entre les deux oreilles.
    const croche = (60 / BPM) / 2;
    const indiceCroche = Math.floor(t / croche);
    const dansCroche = t % croche;
    const noteArpege = accord.notes[indiceCroche % accord.notes.length] * 2;
    const arpege =
      Math.sin(2 * Math.PI * noteArpege * t) * enveloppe(dansCroche, 0.006, 0.075) * niveauArpege * 0.12;

    g[i] = nappeG * niveauNappe * 0.38 + basse + pouls + arpege * (indiceCroche % 2 === 0 ? 1 : 0.55);
    d[i] = nappeD * niveauNappe * 0.38 + basse + pouls + arpege * (indiceCroche % 2 === 0 ? 0.55 : 1);
  }

  // Un peu de matière retirée dans le grave, puis arrondi des crêtes.
  const gFiltre = passeHaut(g, 32);
  const dFiltre = passeHaut(d, 32);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    // Fondu d'ouverture, et les 400 ms de fermeture exigées par le dossier.
    const bords = Math.min(1, t / 1.2) * Math.min(1, (duree - t) / 0.4);
    gFiltre[i] = adoucir(gFiltre[i] * 0.9) * bords;
    dFiltre[i] = adoucir(dFiltre[i] * 0.9) * bords;
  }
  return [gFiltre, dFiltre];
};

// ── Écriture ──────────────────────────────────────────────────────────────────

const bruitages = {tick, ding, clic, clac, souffle, pose};
for (const [nom, fabrique] of Object.entries(bruitages)) {
  const wav = `${racine}public/son/bruitages/${nom}.wav`;
  ecrireWav(wav, normaliser(fabrique(), 0.89));
  versMp3(wav, `${racine}public/son/bruitages/${nom}.mp3`, '192k');
  console.log(`✓ bruitages/${nom}.mp3`);
}

const wavNappe = `${racine}public/son/musique/nappe.wav`;
ecrireWav(wavNappe, normaliser(nappe(), 0.8));
versMp3(wavNappe, `${racine}public/son/musique/nappe.mp3`, '160k');
console.log('✓ musique/nappe.mp3');

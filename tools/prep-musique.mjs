/**
 * Prépare la piste musicale pour le montage.
 *
 * La piste livrée est normalisée à −1,0 dBFS de crête : à ce niveau, la monter
 * d'un décibel la ferait écrêter. Or le film en a besoin plus fort après 41 s,
 * là où la voix off s'arrête et où la musique porte seule.
 *
 * `loudnorm` rend la marge : même sensation de niveau, crête ramenée à −4,5 dBFS.
 * On peut alors pousser de 3,5 dB au tunnel sans jamais toucher le plafond.
 *
 * Le fichier livré n'est pas modifié — il reste la source. C'est `nappe-mix.mp3`
 * que la vidéo monte.
 *
 * Relancer :  node tools/prep-musique.mjs
 */
import {execFileSync} from 'node:child_process';

const racine = new URL('..', import.meta.url).pathname;
const source = `${racine}public/son/musique/nappe.mp3`;
const sortie = `${racine}public/son/musique/nappe-mix.mp3`;

// ffmpeg écrit son rapport loudnorm sur la sortie d'erreur, pas sur la sortie
// standard : on redirige donc les deux au même endroit pour pouvoir le lire.
const ffmpeg = (args) =>
  execFileSync('sh', ['-c', `npx remotion ffmpeg ${args.map((a) => `'${a}'`).join(' ')} 2>&1`], {
    cwd: racine,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });

// Premier passage : mesurer. Sans lui, loudnorm travaille à l'aveugle et le
// résultat dérive de plusieurs dixièmes de LU.
const mesure = ffmpeg([
  '-hide_banner', '-i', source,
  '-af', 'loudnorm=I=-19:TP=-4.5:LRA=9:print_format=json',
  '-f', 'null', '-',
]);
const json = JSON.parse(mesure.slice(mesure.lastIndexOf('{'), mesure.lastIndexOf('}') + 1));
console.log('mesuré :', `${json.input_i} LUFS · crête vraie ${json.input_tp} dBTP · LRA ${json.input_lra}`);

// Second passage : appliquer, en repartant des valeurs mesurées.
ffmpeg([
  '-y', '-loglevel', 'error', '-i', source,
  '-af',
  `loudnorm=I=-19:TP=-4.5:LRA=9:measured_I=${json.input_i}:measured_TP=${json.input_tp}` +
    `:measured_LRA=${json.input_lra}:measured_thresh=${json.input_thresh}:offset=${json.target_offset}:linear=true`,
  '-codec:a', 'libmp3lame', '-b:a', '192k', sortie,
]);
console.log('✓ musique/nappe-mix.mp3');

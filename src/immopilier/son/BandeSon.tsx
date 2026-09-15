import React from 'react';
import {Audio} from '@remotion/media';
import {AbsoluteFill, Sequence, interpolate, staticFile} from 'remotion';
import {BRUITAGES, TICKS_RADAR} from './bruitages';
import {VOIX_OFF} from './voix-off';

/**
 * La bande-son : musique, voix off, bruitages.
 *
 * Chaque élément ne se monte que si son `fichier` est renseigné — tant que rien
 * n'est enregistré, la composition se rend en silence, sans erreur. On peut donc
 * livrer l'image avant le son et brancher les pistes une par une.
 *
 * La musique baisse sous chaque réplique (`MUSIQUE.volume`) : c'est le seul
 * traitement de mixage fait ici, le reste se règle au montage son.
 */

/**
 * La piste fournie par le commanditaire : 67,57 s, 116 BPM, sans voix, avec son
 * propre fondu de sortie à partir de 64 s. Elle est taillée pour le film — sa
 * durée est celle du montage à 7 centièmes près — donc elle démarre à l'image 0
 * et n'est ni bouclée ni raccourcie.
 *
 * Son fondu d'ouverture est très court ; celui écrit ici n'en rajoute presque
 * pas, il évite seulement le clic de premier échantillon. La fermeture, elle,
 * est déjà dans le fichier : la rampe de `volume` ne fait que garantir le silence
 * sur la toute dernière image.
 *
 * ⟦ Le dossier demandait une piste entre 100 et 110 BPM ; celle-ci est à 116.
 *   Écart assumé par le commanditaire, qui l'a fournie. ⟧
 */
export const MUSIQUE = {
  fichier: 'nappe.mp3' as string | null,
  /** Niveau nominal, hors passages parlés. */
  volume: 0.82,
  /** Niveau sous la voix off — la musique s'efface, elle ne disparaît pas. */
  volumeSousVoix: 0.26,
};

/**
 * Images où la voix off parle, pour baisser la musique dessous.
 *
 * Seules comptent les répliques réellement enregistrées : esquiver sous une voix
 * absente laisserait la musique au niveau bas pendant tout le film, et on
 * n'entendrait presque rien.
 *
 * Faute de connaître la durée d'un fichier avant de l'avoir, on tient le niveau
 * bas jusqu'à la réplique suivante. Les silences du script — plans 3, 10, 18 et
 * 20 — restent pleins parce qu'aucune réplique n'y commence.
 */
const PASSAGES_PARLES = VOIX_OFF.filter((replique) => replique.fichier).map((replique) => {
  const suivante = VOIX_OFF.find((autre) => autre.debut > replique.debut);
  return {debut: replique.debut, fin: suivante ? suivante.debut : 3840};
});

const parle = (frame: number) => PASSAGES_PARLES.some((p) => frame >= p.debut - 12 && frame < p.fin);

/**
 * Les prises de voix sortent à −6 dBFS de crête. On les remonte un peu : c'est la
 * voix qui porte le film, elle doit rester devant la musique sans qu'on ait à
 * baisser tout le reste.
 */
const VOIX_VOLUME = 1.2;

export const BandeSon: React.FC = () => {
  return (
    <AbsoluteFill name="Bande-son">
      {MUSIQUE.fichier ? (
        <Audio
          name="Musique"
          src={staticFile(`son/musique/${MUSIQUE.fichier}`)}
          volume={(f) =>
            // Esquive sous la voix. Les fondus sont courts : la piste porte déjà
            // les siens, on ne fait qu'éviter un clic aux deux extrémités.
            (parle(f) ? MUSIQUE.volumeSousVoix : MUSIQUE.volume) *
            interpolate(f, [0, 8, 4040, 4050], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          }
        />
      ) : null}

      {VOIX_OFF.map((replique) =>
        replique.fichier ? (
          <Sequence key={replique.n} name={`Voix ${replique.n}`} from={replique.debut}>
            <Audio src={staticFile(`son/voix/${replique.fichier}`)} volume={() => VOIX_VOLUME} />
          </Sequence>
        ) : null,
      )}

      {BRUITAGES.map((bruitage) =>
        bruitage.fichier ? (
          <Sequence key={bruitage.image} name={bruitage.role} from={bruitage.image}>
            <Audio src={staticFile(`son/bruitages/${bruitage.fichier}`)} volume={() => bruitage.volume} />
          </Sequence>
        ) : null,
      )}

      {TICKS_RADAR.fichier
        ? TICKS_RADAR.images.map((image) => (
            <Sequence key={image} name="Tick radar" from={image}>
              <Audio src={staticFile(`son/bruitages/${TICKS_RADAR.fichier}`)} volume={() => TICKS_RADAR.volume} />
            </Sequence>
          ))
        : null}
    </AbsoluteFill>
  );
};

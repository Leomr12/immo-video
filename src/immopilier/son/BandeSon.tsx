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
 * ⟦ La piste n'est pas fournie par le dossier. Chercher une piste libre de
 *   droits, tempo 100–110, sans voix, et vérifier la licence même pour une
 *   diffusion organique. Fichier à déposer dans `public/son/musique/`. ⟧
 */
export const MUSIQUE = {
  fichier: null as string | null,
  /** Niveau nominal, hors passages parlés. */
  volume: 0.42,
  /** Niveau sous la voix off — la musique s'efface, elle ne disparaît pas. */
  volumeSousVoix: 0.14,
};

/** Images où la voix off parle, pour baisser la musique dessous. */
const PASSAGES_PARLES = VOIX_OFF.map((replique, i) => ({
  debut: replique.debut,
  // Faute de connaître la durée du fichier avant de l'avoir, on tient le niveau
  // bas jusqu'à la réplique suivante. Les silences du script — plans 3, 10, 18
  // et 20 — restent audibles parce qu'aucune réplique n'y commence.
  fin: VOIX_OFF[i + 1] ? VOIX_OFF[i + 1].debut : 3840,
}));

const parle = (frame: number) => PASSAGES_PARLES.some((p) => frame >= p.debut - 12 && frame < p.fin);

export const BandeSon: React.FC = () => {
  return (
    <AbsoluteFill name="Bande-son">
      {MUSIQUE.fichier ? (
        <Audio
          name="Musique"
          src={staticFile(`son/musique/${MUSIQUE.fichier}`)}
          volume={(f) =>
            // Fondu d'ouverture, esquive sous la voix, fondu de 400 ms à la fin.
            (parle(f) ? MUSIQUE.volumeSousVoix : MUSIQUE.volume) *
            interpolate(f, [0, 36, 4026, 4050], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          }
        />
      ) : null}

      {VOIX_OFF.map((replique) =>
        replique.fichier ? (
          <Sequence key={replique.n} name={`Voix ${replique.n}`} from={replique.debut}>
            <Audio src={staticFile(`son/voix/${replique.fichier}`)} />
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

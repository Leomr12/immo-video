import React from 'react';
import {Audio} from '@remotion/media';
import {AbsoluteFill, Easing, Sequence, interpolate, staticFile} from 'remotion';
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
  fichier: 'nappe-mix.mp3' as string | null,
  /**
   * Niveau nominal, hors passages parlés.
   *
   * La piste mixée plafonne à −6,7 dBFS de crête : on peut donc la monter
   * jusqu'à 2,17 avant d'écrêter, ce qui laisse de quoi la tenir présente sur
   * tout le film et la pousser encore au tunnel.
   */
  volume: 1.19,
  /**
   * Niveau à partir du tunnel du plan 16, à l'image 2460.
   *
   * La voix off s'arrête à 39,7 s et la musique porte seule tout le dernier
   * tiers : sans cette montée, le film s'éteint doucement là où il devrait
   * conclure. +3 dB, atteints en 0,4 s — assez pour qu'on le sente, assez lent
   * pour qu'on ne l'entende pas comme un défaut.
   */
  volumeApresTunnel: 1.68,
  /**
   * Ce que la voix off retire à la musique — une fraction du niveau en cours, et
   * non une valeur absolue : la musique doit s'effacer autant avant qu'après la
   * montée.
   */
  facteurSousVoix: 0.32,
};

/**
 * Images où la voix off parle, pour baisser la musique dessous.
 *
 * Chaque passage dure exactement la prise, relevée sur le fichier, plus une
 * demi-seconde de reprise. Les répliques font trois secondes pour des créneaux de
 * six : tenir le niveau bas jusqu'à la suivante laissait la musique étouffée
 * pendant tout le premier tiers, silences compris.
 *
 * Seules comptent les répliques réellement enregistrées — esquiver sous une voix
 * absente reviendrait à baisser pour rien.
 */
const PASSAGES_PARLES = VOIX_OFF.filter((replique) => replique.fichier && replique.duree).map((replique) => ({
  debut: replique.debut - 12,
  fin: replique.debut + (replique.duree ?? 0) + 30,
}));

const parle = (frame: number) => PASSAGES_PARLES.some((p) => frame >= p.debut && frame < p.fin);

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
            // Montée au tunnel, esquive sous la voix, et des fondus très courts :
            // la piste porte déjà les siens, on évite seulement un clic aux deux
            // extrémités.
            interpolate(f, [2460, 2484], [1.19, 1.68], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }) *
            (parle(f) ? MUSIQUE.facteurSousVoix : 1) *
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

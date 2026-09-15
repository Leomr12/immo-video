import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Halo} from '../composants/Halo';
import {TypoCinetique} from '../composants/TypoCinetique';

/**
 * Plan 4 · 06,20 → 08,50 · fond sombre
 *
 * Noir, halo bleu diffus au ras du bord bas. Deux lignes qui se succèdent au
 * centre ; « est » passe en `--accent-400`.
 *
 * Caméra : le bloc de texte continue de reculer légèrement — le mouvement que la
 * fenêtre du plan 3 avait engagé ne s'interrompt pas, il se transmet au texte.
 */
export const Plan04: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 4 — Une annonce ne dit jamais où elle est">
      <Halo
        intensite={interpolate(frame, [0, 46], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.2, 0.8, 0.2, 1),
        })}
      />

      <AbsoluteFill
        name="Constat"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          scale: interpolate(frame, [0, 138], [1.05, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
        }}
      >
        <div style={{width: 1560, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
          <TypoCinetique
            mots={[
              {texte: 'Parce'},
              {texte: "qu'une"},
              {texte: 'annonce'},
              {texte: 'ne'},
              {texte: 'dit'},
              {texte: 'jamais'},
            ]}
            depart={4}
            couleur="#f6f6f8"
            couleurAccent="#6e88f7"
            taille={92}
          />
          <TypoCinetique
            mots={[{texte: 'où'}, {texte: 'elle'}, {texte: 'est', accent: true, suffixe: '.'}]}
            depart={66}
            couleur="#f6f6f8"
            couleurAccent="#6e88f7"
            taille={92}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

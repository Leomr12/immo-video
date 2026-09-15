import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {PlateauCarte} from '../composants/PlateauCarte';
import {TypoCinetique} from '../composants/TypoCinetique';

/**
 * Plan 2 · 02,40 → 04,60 · fond blanc
 *
 * Le radar se resserre et devient une boussole de carte ; l'aiguille tourne sans
 * se fixer. Typographie cinétique en haut de cadre.
 *
 * Caméra : la poussée du plan 1 se poursuit et s'accélère, de 1,06 à 1,90. Le
 * plan 1 s'achevait exactement sur 1,06 : le raccord est un mouvement, pas une
 * coupe.
 *
 * Texte — « Mais où se trouve **vraiment** ce bien ? », accent `--accent-600`.
 * C'est mot pour mot la fin de la première réplique de la voix off : l'écran et la
 * voix disent la même chose, au même moment.
 */
export const Plan02: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 2 — Boussole">
      <PlateauCarte
        image={144 + frame}
        zoom={interpolate(frame, [0, 132], [1.06, 1.9], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.2, 0.8, 0.2, 1),
        })}
        boussole={interpolate(frame, [0, 34], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.2, 0.8, 0.2, 1),
        })}
      />

      <AbsoluteFill
        name="Question"
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 148,
        }}
      >
        <div style={{width: 1560}}>
          <TypoCinetique
            mots={[
              {texte: 'Mais'},
              {texte: 'où'},
              {texte: 'se'},
              {texte: 'trouve'},
              {texte: 'vraiment', accent: true},
              {texte: 'ce'},
              {texte: 'bien', suffixe: ' ?'},
            ]}
            depart={10}
            couleur="#121216"
            couleurAccent="#2e4fe6"
            taille={92}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {FicheAdresse} from '../composants/FicheAdresse';

/**
 * Plan 12 · 31,18 → 32,78 · fond sombre
 *
 * La fiche adresse se déroule verticalement, très vite, comme un long document
 * qu'on fait défiler. Défilement rapide puis arrêt net, avec un léger rebond.
 *
 * Voix off — « Et l'adresse, elle, raconte tout le reste. »
 *
 * Le rebond est ici voulu par le script, et il ne contredit pas la charte : ce
 * qu'elle proscrit, c'est le texte qui entre en rebondissant, pas l'inertie d'un
 * document qu'on relâche. Il reste très court — 3 % de dépassement.
 */
export const Plan12: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 12 — La fiche se déroule" style={{alignItems: 'center', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          top: 120,
          translate: interpolate(frame, [0, 74, 86], ['0px 0px', '0px -2420px', '0px -2340px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: [Easing.bezier(0.55, 0, 0.35, 1), Easing.bezier(0.2, 0.8, 0.2, 1)],
          }),
          // Le flou de filé s'efface à l'arrêt.
          filter: `blur(${interpolate(frame, [0, 16, 66, 78], [0, 7, 7, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })}px)`,
        }}
      >
        <FicheAdresse largeur={1180} />
      </div>
    </AbsoluteFill>
  );
};

import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {PlateauCarte} from '../composants/PlateauCarte';

/**
 * Plan 1 · 00,00 → 02,40 · fond blanc
 *
 * Carte de France en aplat, vue de dessus. Un balayage radar bleu fait un tour
 * complet en 2,4 s ; à chaque passage, des ventes publiées s'allument puis
 * s'estompent. Pas de texte : la voix off pose seule « Une annonce qui te plaît. »
 *
 * Caméra : une poussée très lente, qui ne s'arrête pas à la fin du plan — c'est
 * elle que le plan 2 reprend en l'accélérant.
 */
export const Plan01: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 1 — Radar sur la France">
      <PlateauCarte
        image={frame}
        zoom={interpolate(frame, [0, 144], [1, 1.06], {
          extrapolateLeft: 'clamp',
          easing: Easing.bezier(0.2, 0.8, 0.2, 1),
        })}
        boussole={0}
      />
    </AbsoluteFill>
  );
};

import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {FRANCE_BOX, FRANCE_DOTS, FRANCE_OUTLINE} from '../geo/france';

/**
 * Plan 20 · 50,93 → 53,00 · fond sombre
 *
 * La carte se remplit de points, vue de haut : la France entière s'allume comme
 * une constellation. Dézoom continu, les points s'agglomèrent.
 *
 * Pas de voix off — c'est la montée musicale. Le plan 1 ouvrait sur cette même
 * carte en blanc ; elle revient ici en négatif, et l'acte IV boucle l'acte I.
 */
export const Plan20: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 20 — La France en constellation" style={{alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          width: 1180,
          height: 1180,
          // Dézoom continu : les points se resserrent en constellation.
          scale: interpolate(frame, [0, 124], [1.62, 0.92], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: 'perceptual-scale',
          }),
        }}
      >
        <svg viewBox={`-100 -100 ${FRANCE_BOX + 200} ${FRANCE_BOX + 200}`} style={{width: '100%', height: '100%'}}>
          <path d={FRANCE_OUTLINE} fill="#0f0f12" stroke="#33333a" strokeWidth={1.4} strokeLinejoin="round" />

          {FRANCE_DOTS.map((dot, i) => (
            <circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r={5}
              fill="#6e88f7"
              style={{
                // Les points s'allument du sud vers le nord, en désordre.
                opacity: interpolate(frame, [(i % 29) * 2.4, (i % 29) * 2.4 + 18], [0, 0.92], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: Easing.bezier(0.2, 0.8, 0.2, 1),
                }),
              }}
            />
          ))}
        </svg>
      </div>
    </AbsoluteFill>
  );
};

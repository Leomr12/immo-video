import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {DPE} from '../charte';

/**
 * L'étiquette DPE du plan 13 : les sept barres A → G, aux sept couleurs
 * officielles. Les lettres sont toujours blanches, comme sur le site.
 */
export const EtiquetteDPE: React.FC<{
  readonly retenue: keyof typeof DPE;
  readonly depart: number;
}> = ({retenue, depart}) => {
  const frame = useCurrentFrame();

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
      {(Object.keys(DPE) as (keyof typeof DPE)[]).map((lettre, i) => (
        <div
          key={lettre}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 52,
            // La barre de la lettre retenue va plus loin que les autres.
            width: interpolate(frame, [depart + i * 4, depart + i * 4 + 14], [0, 200 + i * 52 + (lettre === retenue ? 120 : 0)], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
            paddingLeft: 24,
            borderRadius: '8px 26px 26px 8px',
            backgroundColor: DPE[lettre],
            opacity: lettre === retenue ? 1 : 0.58,
            fontFamily: 'Geist',
            fontWeight: 600,
            fontSize: 32,
            color: '#ffffff',
            overflow: 'hidden',
          }}
        >
          {lettre}
        </div>
      ))}
    </div>
  );
};

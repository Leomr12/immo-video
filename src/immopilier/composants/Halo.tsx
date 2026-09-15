import React from 'react';
import {AbsoluteFill} from 'remotion';

/**
 * Le halo bleu diffus au ras du bord bas, sur fond sombre — le motif de fond de
 * tout l'acte II et de l'acte IV. Repris du modèle, aux couleurs d'Immopilier.
 */
export const Halo: React.FC<{readonly intensite: number}> = ({intensite}) => {
  return (
    <AbsoluteFill
      name="Halo bas"
      style={{
        opacity: intensite,
        background:
          'radial-gradient(120% 62% at 50% 116%, rgba(74,107,242,0.55) 0%, rgba(74,107,242,0.22) 32%, rgba(74,107,242,0.04) 62%, rgba(10,10,12,0) 78%)',
      }}
    />
  );
};

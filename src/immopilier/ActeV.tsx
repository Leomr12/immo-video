import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Raccord} from './composants/Raccord';
import {Plan23} from './plans/Plan23';
import {Plan24} from './plans/Plan24';

/**
 * Acte V — L'appel à l'action · 61,00 → 67,50 (plans 23 et 24)
 *
 * Retour au blanc. Le plan 24 ne prend pas de `<Raccord>` : il ferme le film sur
 * son propre fondu au blanc, et il n'y a plus rien après lui à croiser.
 *
 * Images relatives au début de l'acte, placé à 3660 par la composition complète.
 */
export const ActeV: React.FC = () => {
  return (
    <AbsoluteFill name="Acte V — L'appel à l'action">
      <Sequence name="Plan 23 · 61,00 → 64,00 s" durationInFrames={190}>
        <Raccord duree={180}>
          <Plan23 />
        </Raccord>
      </Sequence>

      <Sequence name="Plan 24 · 64,00 → 67,50 s" from={180} durationInFrames={210}>
        <Plan24 />
      </Sequence>
    </AbsoluteFill>
  );
};

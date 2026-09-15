import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Raccord} from './composants/Raccord';
import {Plan20} from './plans/Plan20';
import {Plan21} from './plans/Plan21';
import {Plan22} from './plans/Plan22';

/**
 * Acte IV — La preuve · 50,93 → 61,00 (plans 20 à 22)
 *
 * Tout l'acte est sur fond sombre. Il ramène la carte de France du plan 1, en
 * négatif cette fois, avant de ne plus laisser que des chiffres puis des mots :
 * l'image se dépouille à mesure que la démonstration se resserre.
 *
 * Images relatives au début de l'acte, placé à 3056 par la composition complète.
 */
export const ActeIV: React.FC = () => {
  return (
    <AbsoluteFill name="Acte IV — La preuve">
      <Sequence name="Plan 20 · 50,93 → 53,00 s" durationInFrames={134}>
        <Raccord duree={124}>
          <Plan20 />
        </Raccord>
      </Sequence>

      <Sequence name="Plan 21 · 53,00 → 56,50 s" from={124} durationInFrames={220}>
        <Raccord duree={210}>
          <Plan21 />
        </Raccord>
      </Sequence>

      <Sequence name="Plan 22 · 56,50 → 61,00 s" from={334} durationInFrames={280}>
        <Raccord duree={270}>
          <Plan22 />
        </Raccord>
      </Sequence>
    </AbsoluteFill>
  );
};

import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {ActeI} from './ActeI';
import {ActeII} from './ActeII';
import {Fond} from './composants/Fond';

/**
 * Immopilier — « Géolocalise, analyse, décide »
 * 1920 × 1080 · 60 fps · 67,5 s (4050 images) · 24 plans, cinq actes.
 *
 * Voir dossier-immopilier/SCRIPT-VIDEO.md pour le conducteur complet et
 * src/immopilier/minutage.ts pour les bornes de chaque plan à l'image près.
 *
 * Actes montés à ce jour :
 *   I.  L'accroche      0,0 → 8,5 s    plans 1–4    ✓
 *   II. Le coût du flou 8,5 → 18,1 s   plans 5–7    ✓
 *   III. Le produit     18,1 → 50,9 s  plans 8–19   à monter
 *   IV. La preuve       50,9 → 61,0 s  plans 20–22  à monter
 *   V.  L'appel         61,0 → 67,5 s  plans 23–24  à monter
 */
export const Immopilier: React.FC = () => {
  return (
    <AbsoluteFill name="Immopilier 67,5 s">
      <Fond />
      <ActeI />

      <Sequence name="Acte II — Le coût du flou" from={510} durationInFrames={577}>
        <ActeII />
      </Sequence>
    </AbsoluteFill>
  );
};

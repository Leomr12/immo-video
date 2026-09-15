import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {ActeI} from './ActeI';
import {ActeII} from './ActeII';
import {ActeIII} from './ActeIII';
import {ActeIV} from './ActeIV';
import {ActeV} from './ActeV';
import {Fond} from './composants/Fond';
import {BandeSon} from './son/BandeSon';

/**
 * Immopilier — « Géolocalise, analyse, décide »
 * 1920 × 1080 · 60 fps · 67,5 s (4050 images) · 24 plans, cinq actes.
 *
 * Voir dossier-immopilier/SCRIPT-VIDEO.md pour le conducteur complet et
 * src/immopilier/minutage.ts pour les bornes de chaque plan à l'image près.
 *
 * La bande-son est câblée mais muette : chaque réplique, chaque bruitage et la
 * musique ne se montent que si leur fichier est renseigné. Voir SON.md.
 *
 * Les cinq actes sont montés.
 *   I.  L'accroche      0,0 → 8,5 s    plans 1–4
 *   II. Le coût du flou 8,5 → 18,1 s   plans 5–7
 *   III. Le produit     18,1 → 50,9 s  plans 8–19
 *   IV. La preuve       50,9 → 61,0 s  plans 20–22
 *   V.  L'appel         61,0 → 67,5 s  plans 23–24
 */
export const Immopilier: React.FC = () => {
  return (
    <AbsoluteFill name="Immopilier 67,5 s">
      <Fond />
      <ActeI />

      <Sequence name="Acte II — Le coût du flou" from={510} durationInFrames={577}>
        <ActeII />
      </Sequence>

      <Sequence name="Acte III — Le produit" from={1087} durationInFrames={1969}>
        <ActeIII />
      </Sequence>

      <Sequence name="Acte IV — La preuve" from={3056} durationInFrames={604}>
        <ActeIV />
      </Sequence>

      <Sequence name="Acte V — L'appel à l'action" from={3660} durationInFrames={390}>
        <ActeV />
      </Sequence>

      <BandeSon />
    </AbsoluteFill>
  );
};

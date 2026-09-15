import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Raccord} from './composants/Raccord';
import {Plan08} from './plans/Plan08';
import {Plan09} from './plans/Plan09';
import {Plan10} from './plans/Plan10';
import {Plan11} from './plans/Plan11';
import {Plan12} from './plans/Plan12';
import {Plan13} from './plans/Plan13';
import {Plan14} from './plans/Plan14';
import {Plan15} from './plans/Plan15';
import {Plan16} from './plans/Plan16';
import {Plan17} from './plans/Plan17';
import {Plan18} from './plans/Plan18';
import {Plan19} from './plans/Plan19';

/**
 * Acte III — Le produit · 18,12 → 50,93 (plans 8 à 19)
 *
 * Le plus long des cinq actes, et le seul qui bascule quatre fois entre le clair
 * et le sombre : à l'arrivée de la marque (8), au tableau de bord (10), à la
 * couronne des communes (15) et à la fiche récapitulative (18). Ces bascules sont
 * portées par `<Fond>`, la couche de fond continue, jamais par une coupe.
 *
 * Les images sont relatives au début de l'acte, que la composition complète place
 * à l'image 1087. Chaque plan est enveloppé d'un `<Raccord>` qui porte sa durée
 * au script : c'est lui qui joue le croisement de caméra sur les dix images de
 * recouvrement avec le plan suivant.
 */
export const ActeIII: React.FC = () => {
  return (
    <AbsoluteFill name="Acte III — Le produit">
      <Sequence name="Plan 8 · 18,12 → 22,40 s" durationInFrames={267}>
        <Raccord duree={257}>
          <Plan08 />
        </Raccord>
      </Sequence>

      <Sequence name="Plan 9 · 22,40 → 26,80 s" from={257} durationInFrames={274}>
        <Raccord duree={264}>
          <Plan09 />
        </Raccord>
      </Sequence>

      <Sequence name="Plan 10 · 26,80 → 28,18 s" from={521} durationInFrames={93}>
        <Raccord duree={83}>
          <Plan10 />
        </Raccord>
      </Sequence>

      <Sequence name="Plan 11 · 28,18 → 31,18 s" from={604} durationInFrames={190}>
        <Raccord duree={180}>
          <Plan11 />
        </Raccord>
      </Sequence>

      <Sequence name="Plan 12 · 31,18 → 32,78 s" from={784} durationInFrames={106}>
        <Raccord duree={96}>
          <Plan12 />
        </Raccord>
      </Sequence>

      <Sequence name="Plan 13 · 32,78 → 35,28 s" from={880} durationInFrames={160}>
        <Raccord duree={150}>
          <Plan13 />
        </Raccord>
      </Sequence>

      <Sequence name="Plan 14 · 35,28 → 38,37 s" from={1030} durationInFrames={195}>
        <Raccord duree={185}>
          <Plan14 />
        </Raccord>
      </Sequence>

      <Sequence name="Plan 15 · 38,37 → 41,00 s" from={1215} durationInFrames={168}>
        <Raccord duree={158}>
          <Plan15 />
        </Raccord>
      </Sequence>

      <Sequence name="Plan 16 · 41,00 → 43,50 s" from={1373} durationInFrames={160}>
        <Raccord duree={150}>
          <Plan16 />
        </Raccord>
      </Sequence>

      <Sequence name="Plan 17 · 43,50 → 46,53 s" from={1523} durationInFrames={192}>
        <Raccord duree={182}>
          <Plan17 />
        </Raccord>
      </Sequence>

      <Sequence name="Plan 18 · 46,53 → 48,00 s" from={1705} durationInFrames={98}>
        <Raccord duree={88}>
          <Plan18 />
        </Raccord>
      </Sequence>

      <Sequence name="Plan 19 · 48,00 → 50,93 s" from={1793} durationInFrames={176}>
        <Raccord duree={166}>
          <Plan19 />
        </Raccord>
      </Sequence>
    </AbsoluteFill>
  );
};

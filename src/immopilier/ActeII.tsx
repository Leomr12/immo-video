import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Plan05} from './plans/Plan05';
import {Plan06} from './plans/Plan06';
import {Plan07} from './plans/Plan07';

/**
 * Acte II — Le coût du flou · 08,50 → 18,12 (plans 5 à 7)
 *
 * Tout l'acte est sur fond sombre : aucune bascule de fond, donc les raccords
 * reposent entièrement sur la caméra. Le travelling latéral du plan 5 se prolonge
 * dans le recul du plan 6, qui se prolonge dans la chute du dossier au plan 7.
 *
 * Les images sont exprimées en relatif : l'acte commence à 510 dans le film, et
 * c'est `<ActeII>` qui est placé là par la composition complète.
 */
export const ActeII: React.FC = () => {
  return (
    <AbsoluteFill name="Acte II — Le coût du flou">
      <Sequence name="Plan 5 · 8,5 → 12,5 s" durationInFrames={250}>
        <Plan05 />
      </Sequence>

      <Sequence name="Plan 6 · 12,5 → 15,82 s" from={240} durationInFrames={209}>
        <Plan06 />
      </Sequence>

      <Sequence name="Plan 7 · 15,82 → 18,12 s" from={439} durationInFrames={138}>
        <Plan07 />
      </Sequence>
    </AbsoluteFill>
  );
};

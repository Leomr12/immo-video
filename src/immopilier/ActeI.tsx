import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Plan01} from './plans/Plan01';
import {Plan02} from './plans/Plan02';
import {Plan03} from './plans/Plan03';
import {Plan04} from './plans/Plan04';

/**
 * Acte I — L'accroche · 00,00 → 08,50 (plans 1 à 4)
 *
 * Les plans démarrent aux images exactes du script : 0, 144, 276, 372. Chacun
 * déborde de quelques images sur le suivant, et sa dernière valeur de caméra est
 * la première du plan d'après — le raccord se lit comme un mouvement continu,
 * jamais comme une coupe. C'est pour cela qu'on n'utilise pas `<TransitionSeries>`,
 * qui raccourcirait la frise et décalerait tous les timecodes.
 *
 * Le fond, lui, n'est pas ici : c'est une couche unique qui traverse toute la
 * vidéo (`<Fond>`), pour que la bascule blanc → sombre de l'image 318 soit un
 * changement de couleur et non un changement de plan.
 */
export const ActeI: React.FC = () => {
  return (
    <AbsoluteFill name="Acte I — L'accroche">
      <Sequence name="Plan 1 · 0,0 → 2,4 s" durationInFrames={152}>
        <Plan01 />
      </Sequence>

      <Sequence name="Plan 2 · 2,4 → 4,6 s" from={144} durationInFrames={140}>
        <Plan02 />
      </Sequence>

      <Sequence name="Plan 3 · 4,6 → 6,2 s" from={276} durationInFrames={110}>
        <Plan03 />
      </Sequence>

      <Sequence name="Plan 4 · 6,2 → 8,5 s" from={372} durationInFrames={138}>
        <Plan04 />
      </Sequence>
    </AbsoluteFill>
  );
};

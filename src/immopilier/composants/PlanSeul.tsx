import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Fond} from './Fond';

/**
 * Enveloppe d'un plan prévisualisé seul.
 *
 * Le fond de la vidéo est une couche unique qui traverse les 4050 images ; un
 * plan sorti de son contexte perdrait donc sa couleur. `trimBefore` avance
 * l'horloge de `<Fond>` jusqu'à l'image où le plan commence dans le film : le
 * plan vu seul a exactement le fond qu'il aura au montage, bascule comprise.
 */
export const PlanSeul: React.FC<{
  /** Image de début du plan dans le film complet — voir minutage.ts. */
  readonly debut: number;
  readonly children: React.ReactNode;
}> = ({debut, children}) => {
  return (
    <AbsoluteFill>
      <Sequence layout="absolute-fill" trimBefore={debut}>
        <Fond />
      </Sequence>
      {children}
    </AbsoluteFill>
  );
};

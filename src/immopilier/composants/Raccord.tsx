import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';

/**
 * Le raccord entre deux plans : un mouvement de caméra, jamais une coupe.
 *
 * Le plan sortant continue de reculer pendant que l'entrant finit d'arriver, et
 * les deux se croisent sur le recouvrement. Comme le fond de la vidéo est une
 * couche continue et que les plans sont transparents, il ne reste à croiser que
 * leur contenu : à aucune image le cadre ne change d'un bloc.
 *
 * `duree` est la durée du plan au script. Les images au-delà sont le
 * recouvrement, joué seulement dans l'assemblage de l'acte — un plan prévisualisé
 * seul s'arrête à sa durée et ne montre pas sa sortie.
 */
export const Raccord: React.FC<{
  readonly duree: number;
  /** Longueur du croisement, en images. */
  readonly recouvrement?: number;
  readonly children: React.ReactNode;
}> = ({duree, recouvrement = 10, children}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [0, 9, duree, duree + recouvrement], [0, 1, 1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: [Easing.bezier(0.2, 0.8, 0.2, 1), Easing.linear, Easing.bezier(0.4, 0, 0.2, 1)],
        }),
        scale: interpolate(frame, [0, 9, duree, duree + recouvrement], [1.035, 1, 1, 0.975], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: [Easing.bezier(0.2, 0.8, 0.2, 1), Easing.linear, Easing.bezier(0.4, 0, 0.2, 1)],
          output: 'perceptual-scale',
        }),
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

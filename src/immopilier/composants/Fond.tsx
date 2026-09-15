import React from 'react';
import {AbsoluteFill, interpolateColors, useCurrentFrame} from 'remotion';

/**
 * Le fond de toute la vidéo, en une seule couche continue.
 *
 * Les bascules clair ↔ sombre du script ne sont donc jamais une coupe : c'est la
 * même surface qui change de couleur en 400 ms, courbe de la charte. Les images
 * de bascule sont celles du script, pas les bornes de plan — au plan 3 par
 * exemple, la fenêtre recule d'abord 700 ms, et le fond ne bascule qu'ensuite.
 */

/** Image à laquelle chaque bascule démarre, et la couleur visée. */
export const BASCULES = [
  {image: 318, vers: '#0a0a0c'}, // plan 3 — après le recul de la fenêtre
  {image: 1087, vers: '#ffffff'}, // plan 8 — l'arrivée de la marque
  {image: 1608, vers: '#0a0a0c'}, // plan 10 — le tableau de bord
  {image: 2302, vers: '#ffffff'}, // plan 15 — la couronne des communes
  {image: 2792, vers: '#0a0a0c'}, // plan 18 — la fiche récapitulative
  {image: 3660, vers: '#ffffff'}, // plan 23 — l'appel à l'action
] as const;

export const Fond: React.FC = () => {
  const frame = useCurrentFrame();

  // Une seule rampe par bascule : [début, début + 400 ms] → [couleur d'avant, couleur d'après].
  const etapes: number[] = [0];
  const couleurs: string[] = ['#ffffff'];
  for (const b of BASCULES) {
    etapes.push(b.image, b.image + 24);
    couleurs.push(couleurs[couleurs.length - 1], b.vers);
  }

  return (
    <AbsoluteFill
      name="Fond"
      style={{
        backgroundColor: interpolateColors(frame, etapes, couleurs),
      }}
    />
  );
};

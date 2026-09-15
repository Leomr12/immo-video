import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Boussole} from './Boussole';
import {CarteFrance} from './CarteFrance';

/**
 * Le décor commun aux plans 1, 2 et 3 : la carte, et la boussole qui naît en son
 * centre. Les trois plans partagent ce même plateau, rendu aux mêmes valeurs aux
 * images de raccord — c'est ce qui permet d'enchaîner par un mouvement de caméra
 * plutôt que par une coupe.
 */
export const PlateauCarte: React.FC<{
  readonly image: number;
  /** Échelle de caméra appliquée au plateau. */
  readonly zoom: number;
  /** Présence de la boussole, 0 → 1. À 1 la carte s'efface derrière elle. */
  readonly boussole: number;
}> = ({image, zoom, boussole}) => {
  return (
    <AbsoluteFill name="Plateau carte" style={{alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          width: 1030,
          height: 1030,
          scale: zoom,
          opacity: 1 - boussole * 0.72,
          filter: `blur(${boussole * 5}px)`,
          willChange: 'scale, opacity, filter',
        }}
      >
        <CarteFrance image={image} tour={144} fond="#f6f6f8" trait="#e5e5e9" />
      </div>

      <div
        style={{
          position: 'absolute',
          width: 540,
          height: 540,
          opacity: boussole,
          scale: 0.4 + boussole * 0.6,
          willChange: 'opacity, scale',
        }}
      >
        <Boussole image={image} trait="#121216" />
      </div>
    </AbsoluteFill>
  );
};

import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';

/**
 * Un chiffre qui monte en compteur.
 *
 * Les chiffres tabulaires sont indispensables : sans eux les largeurs changent à
 * chaque incrément et le nombre tressaute pendant qu'il monte (charte § 2).
 * Le séparateur de milliers est une espace fine insécable — `34 935`, jamais
 * `34,935`, l'une des rares choses que le modèle fait à l'anglaise.
 */
export const Compteur: React.FC<{
  readonly vers: number;
  readonly depart?: number;
  readonly duree?: number;
  /** Nombre de décimales. */
  readonly decimales?: number;
  readonly prefixe?: string;
  readonly suffixe?: string;
  readonly style?: React.CSSProperties;
}> = ({vers, depart = 0, duree = 54, decimales = 0, prefixe = '', suffixe = '', style}) => {
  const frame = useCurrentFrame();

  const valeur = interpolate(frame, [depart, depart + duree], [0, vers], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  const [entiere, fraction] = valeur.toFixed(decimales).split('.');
  const groupee = entiere.replace('-', '−').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return (
    <span style={{fontVariantNumeric: 'tabular-nums', ...style}}>
      {prefixe}
      {groupee}
      {fraction ? `,${fraction}` : ''}
      {suffixe}
    </span>
  );
};

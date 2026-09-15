import React from 'react';
import {Easing, interpolate} from 'remotion';
import {FRANCE_BOX, FRANCE_DOTS, FRANCE_OUTLINE} from '../geo/france';

/**
 * La carte de France du plan 1 : un aplat très épuré, un balayage radar qui part
 * du centre, et les ventes publiées qui s'allument au passage du faisceau.
 *
 * Géométrie : Natural Earth 1:50m projetée en conique conforme 44°/49°, figée
 * par tools/prep-france.mjs — le rendu ne dépend d'aucune tuile ni d'aucun réseau.
 */

/** Angle d'un point vu du centre, exprimé en fraction de tour depuis le nord. */
const tourDepuisLeNord = (x: number, y: number) => {
  const angle = Math.atan2(y - FRANCE_BOX / 2, x - FRANCE_BOX / 2) * (180 / Math.PI);
  return (((angle + 90) % 360) + 360) % 360 / 360;
};

export const CarteFrance: React.FC<{
  /**
   * Image à laquelle la carte est rendue. C'est un paramètre et non
   * `useCurrentFrame()` : le plan 3 fige la carte sur une image du plan 2, il
   * faut donc pouvoir la remonter de l'extérieur.
   */
  readonly image: number;
  /** Durée d'un tour complet du radar, en images. */
  readonly tour: number;
  readonly fond: string;
  readonly trait: string;
}> = ({image, tour, fond, trait}) => {
  const frame = image;

  return (
    // Le viewBox déborde du tracé de 100 unités sur chaque bord : le disque du
    // radar y tient en entier, sans être rogné par l'arête du cadre.
    <svg viewBox={`-100 -100 ${FRANCE_BOX + 200} ${FRANCE_BOX + 200}`} style={{width: '100%', height: '100%'}}>
      <defs>
        <radialGradient id="faisceau" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="560">
          <stop offset="0%" stopColor="#4a6bf2" stopOpacity="0.28" />
          <stop offset="55%" stopColor="#4a6bf2" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#4a6bf2" stopOpacity="0" />
        </radialGradient>
        <clipPath id="disqueRadar">
          <circle cx={FRANCE_BOX / 2} cy={FRANCE_BOX / 2} r={FRANCE_BOX * 0.56} />
        </clipPath>
      </defs>

      <path d={FRANCE_OUTLINE} fill={fond} stroke={trait} strokeWidth={1.6} strokeLinejoin="round" />

      <g clipPath="url(#disqueRadar)" style={{rotate: `${(frame / tour) * 360}deg`, transformOrigin: '500px 500px'}}>
        <path d="M500,500 L71,140.1 A560,560 0 0,1 500,-60 Z" fill="url(#faisceau)" />
        <line x1="500" y1="500" x2="500" y2="-60" stroke="#4a6bf2" strokeWidth={2.5} strokeOpacity={0.5} />
      </g>

      {FRANCE_DOTS.map((dot, i) => {
        // Le point s'allume quand le faisceau le croise, puis s'estompe.
        const age = frame - tourDepuisLeNord(dot.x, dot.y) * tour;
        return (
          <circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r={4.2}
            fill="#4a6bf2"
            style={{
              opacity: interpolate(age, [0, 12, 78], [0, 1, 0.14], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
              }),
              scale: interpolate(age, [0, 12], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
                output: 'perceptual-scale',
              }),
              transformOrigin: `${dot.x}px ${dot.y}px`,
            }}
          />
        );
      })}
    </svg>
  );
};

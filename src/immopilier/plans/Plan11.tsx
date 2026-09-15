import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {ECHELLE_PRIX} from '../charte';

/**
 * Plan 11 · 28,18 → 31,18 · fond sombre
 *
 * La carte des prix : des mailles de 200 m colorées du bleu pâle au rouge, qui se
 * soulèvent en 3D quand la caméra s'incline. Inclinaison 0° → 55°, rotation −18°,
 * les mailles s'extrudent en cascade depuis le centre de l'écran.
 *
 * Voix off — « Le prix au m², rue par rue, sur les ventes réellement signées. »
 *
 * L'ordre de l'échelle des prix est imposé par la charte : il correspond à la
 * légende du produit, du moins cher au plus cher. Chaque maille a un vrai mur
 * latéral, pas une ombre portée : sous une inclinaison de 55° une ombre se
 * coucherait au sol au lieu de se dresser.
 */

const COLONNES = 15;
const RANGEES = 11;
const MAILLE = 108;

/** Suite déterministe : la même carte de chaleur à chaque rendu. */
const alea = (graine: number) => {
  const x = Math.sin(graine * 73.3 + 19.1) * 19377.7;
  return x - Math.floor(x);
};

/** Les prix montent vers le centre : un cœur de bourg cher, des franges moins chères. */
const MAILLES = Array.from({length: COLONNES * RANGEES}).map((_, i) => {
  const colonne = i % COLONNES;
  const rangee = Math.floor(i / COLONNES);
  const dx = (colonne - (COLONNES - 1) / 2) / ((COLONNES - 1) / 2);
  const dy = (rangee - (RANGEES - 1) / 2) / ((RANGEES - 1) / 2);
  const distance = Math.min(1, Math.sqrt(dx * dx + dy * dy));
  const valeur = Math.max(0, Math.min(0.999, 1 - distance + (alea(i + 7) - 0.5) * 0.42));
  return {
    i,
    colonne,
    rangee,
    distance,
    niveau: Math.floor(valeur * ECHELLE_PRIX.length),
    hauteur: 14 + valeur * 128,
  };
});

export const Plan11: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      name="Plan 11 — La carte des prix"
      style={{alignItems: 'center', justifyContent: 'center', perspective: 2200, overflow: 'hidden'}}
    >
      <div
        style={{
          width: COLONNES * MAILLE,
          height: RANGEES * MAILLE,
          transformStyle: 'preserve-3d',
          // 600 ms pour passer de la vue de dessus à la vue inclinée, courbe
          // `ease-out` : le réglage « inclinaison 2D → 3D » de la charte.
          rotate: `x ${interpolate(frame, [12, 48], [0, 55], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}deg`,
          translate: interpolate(frame, [12, 48], ['0px 0px', '0px -60px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            rotate: `z ${interpolate(frame, [12, 48], [0, -18], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            })}deg`,
          }}
        >
          {MAILLES.map((maille) => (
            <div
              key={maille.i}
              style={{
                position: 'absolute',
                left: maille.colonne * MAILLE,
                top: maille.rangee * MAILLE,
                width: MAILLE - 4,
                height: MAILLE - 4,
                transformStyle: 'preserve-3d',
                // L'extrusion part du centre de l'écran et gagne les bords.
                translate: `0px 0px ${
                  maille.hauteur *
                  interpolate(frame, [20 + maille.distance * 70, 56 + maille.distance * 70], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  })
                }px`,
              }}
            >
              <div style={{position: 'absolute', inset: 0, backgroundColor: ECHELLE_PRIX[maille.niveau]}} />
              {/* Le mur sud de la maille, rabattu à la verticale. */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: MAILLE - 4,
                  width: MAILLE - 4,
                  height: maille.hauteur,
                  backgroundColor: ECHELLE_PRIX[maille.niveau],
                  filter: 'brightness(0.55)',
                  transformOrigin: 'top center',
                  rotate: 'x -90deg',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 96,
          bottom: 88,
          // Le tapis de mailles ouvre son propre contexte d'empilement : sans
          // z-index la légende passerait dessous et deviendrait illisible.
          zIndex: 2,
          padding: '16px 26px',
          borderRadius: 999,
          backgroundColor: 'rgba(10,10,12,0.78)',
          fontFamily: 'Geist',
          fontWeight: 400,
          fontSize: 30,
          color: '#f6f6f8',
          opacity: interpolate(frame, [54, 76], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
        }}
      >
        Prix au m² — médiane par maille de 200 m · 2020–2024
      </div>
    </AbsoluteFill>
  );
};

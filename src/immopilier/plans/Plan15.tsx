import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {BIEN, COMMUNES_VOISINES, euroM2, milliers} from '../bien';

/**
 * Plan 15 · 38,37 → 41,00 · fond blanc
 *
 * Bascule au blanc. Une couronne de communes tourne autour du point central,
 * chacune avec son prix au m². Rotation lente, 30°/seconde.
 *
 * Voix off — « Les communes autour, comparées au même mètre carré. »
 *
 * Les communes et leurs prix sont dans `bien.ts`, avec la réserve qui va avec :
 * les voisines sont réelles, les prix sont des valeurs d'attente.
 */

const RAYON = 452;

export const Plan15: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 15 — La couronne des communes" style={{alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          position: 'relative',
          width: RAYON * 2,
          height: RAYON * 2,
          // 30°/seconde, soit 0,5° par image.
          rotate: `${frame * 0.5}deg`,
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
          scale: interpolate(frame, [0, 30], [0.9, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            output: 'perceptual-scale',
          }),
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 999,
            border: '1px dashed #d5d5db',
          }}
        />

        {COMMUNES_VOISINES.map((commune, i) => (
          <div
            key={commune.nom}
            style={{
              position: 'absolute',
              left: RAYON + Math.cos((i / COMMUNES_VOISINES.length) * 2 * Math.PI - Math.PI / 2) * RAYON,
              top: RAYON + Math.sin((i / COMMUNES_VOISINES.length) * 2 * Math.PI - Math.PI / 2) * RAYON,
              translate: '-50% -50%',
              // La pastille compense la rotation de la couronne : les libellés
              // restent horizontaux, seule la couronne tourne.
              rotate: `${-frame * 0.5}deg`,
              padding: '18px 30px',
              borderRadius: 999,
              backgroundColor: '#ffffff',
              border: '1px solid #e5e5e9',
              boxShadow: '0 18px 46px rgba(18,18,22,0.10)',
              display: 'flex',
              alignItems: 'baseline',
              gap: 18,
              whiteSpace: 'nowrap',
              opacity: interpolate(frame, [10 + i * 5, 26 + i * 5], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
              }),
            }}
          >
            <span style={{fontFamily: 'Geist', fontWeight: 400, fontSize: 28, color: '#4d4d57'}}>{commune.nom}</span>
            <span
              style={{
                fontFamily: 'Geist',
                fontWeight: 600,
                fontSize: 32,
                color: '#121216',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {milliers(commune.prixM2)} €
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div style={{width: 30, height: 30, borderRadius: 999, backgroundColor: '#2e4fe6'}} />
        <div style={{fontFamily: 'Geist', fontWeight: 500, fontSize: 30, color: '#4d4d57'}}>Le bien</div>
        <div
          style={{
            fontFamily: 'Geist',
            fontWeight: 600,
            fontSize: 58,
            letterSpacing: '-0.02em',
            color: '#121216',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {euroM2(BIEN.prixM2)}
        </div>
      </div>
    </AbsoluteFill>
  );
};

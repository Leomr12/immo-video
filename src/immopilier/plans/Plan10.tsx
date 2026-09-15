import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Compteur} from '../composants/Compteur';

/**
 * Plan 10 · 26,80 → 28,18 · fond sombre
 *
 * Trois tuiles de statistiques flottent sur fond sombre, comme le tableau de bord
 * du modèle. Les chiffres montent en compteur sur 900 ms.
 *
 * Pas de voix off : c'est une respiration, le son porte seul.
 */
export const Plan10: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      name="Plan 10 — Trois tuiles de statistiques"
      style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 44}}
    >
      {[
        {libelle: 'Prix médian', depart: 0},
        {libelle: 'Ventes retenues', depart: 6},
        {libelle: 'Écart au quartier', depart: 12},
      ].map((tuile, i) => (
        <div
          key={tuile.libelle}
          style={{
            width: 470,
            padding: '52px 54px 58px',
            borderRadius: 32,
            backgroundColor: '#17171c',
            border: '1px solid #33333a',
            boxShadow: '0 34px 90px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            opacity: interpolate(frame, [tuile.depart, tuile.depart + 14], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
            translate: interpolate(frame, [tuile.depart, tuile.depart + 14], ['0px 26px', '0px 0px'], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
          }}
        >
          <div style={{fontFamily: 'Geist', fontWeight: 500, fontSize: 32, color: '#8b8b96'}}>{tuile.libelle}</div>
          <div
            style={{
              fontFamily: 'Geist',
              fontWeight: 600,
              fontSize: 86,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#f6f6f8',
            }}
          >
            {i === 0 ? <Compteur vers={1854} depart={10} duree={54} suffixe={' €/m²'} /> : null}
            {i === 1 ? <Compteur vers={162} depart={16} duree={54} /> : null}
            {i === 2 ? <Compteur vers={-6} depart={22} duree={54} suffixe={' %'} /> : null}
          </div>
        </div>
      ))}
    </AbsoluteFill>
  );
};

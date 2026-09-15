import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';

/**
 * Plan 18 · 46,53 → 48,00 · fond sombre
 *
 * Une fiche récapitulative, seule au centre, façon carte de visite du modèle.
 * Pas de voix off : c'est une respiration.
 */

const LIGNES = [
  ['Surface', '92 m²'],
  ['Prix affiché', '249 000 €'],
  ['Prix au m²', '2 707 €'],
  ['Médiane du quartier', '2 880 €'],
  ['Écart', '−6 %'],
] as const;

export const Plan18: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 18 — La fiche récapitulative" style={{alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          width: 880,
          padding: '58px 64px 64px',
          borderRadius: 34,
          backgroundColor: '#17171c',
          border: '1px solid #33333a',
          boxShadow: '0 44px 110px rgba(0,0,0,0.62)',
          display: 'flex',
          flexDirection: 'column',
          gap: 26,
          opacity: interpolate(frame, [0, 14], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
          scale: interpolate(frame, [0, 88], [0.94, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: 'perceptual-scale',
          }),
        }}
      >
        {LIGNES.map(([libelle, valeur], i) => (
          <div
            key={libelle}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 40,
              paddingBottom: 20,
              borderBottom: i === 4 ? 'none' : '1px solid #33333a',
              opacity: interpolate(frame, [6 + i * 5, 20 + i * 5], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
              }),
            }}
          >
            <span style={{fontFamily: 'Geist', fontWeight: 400, fontSize: 34, color: '#b3b3bc'}}>{libelle}</span>
            <span
              style={{
                fontFamily: 'Geist',
                fontWeight: 600,
                fontSize: 42,
                letterSpacing: '-0.02em',
                color: i === 4 ? '#6e88f7' : '#f6f6f8',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {valeur}
            </span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

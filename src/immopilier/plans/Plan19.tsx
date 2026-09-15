import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';

/**
 * Plan 19 · 48,00 → 50,93 · fond sombre
 *
 * Deux bulles de conversation : la question de l'utilisateur en bleu, la réponse
 * de l'agent en blanc. La réponse s'écrit mot à mot, curseur clignotant.
 *
 * Voix off — « Demande-lui ce que tu veux : il répond avec les chiffres de la
 * commune. »
 */

const REPONSE = '6 % sous la médiane du quartier, sur 162 ventes retenues depuis 2020.'.split(' ');

export const Plan19: React.FC = () => {
  const frame = useCurrentFrame();

  // La réponse s'écrit un mot toutes les 7 images, à partir de l'image 58.
  const motsEcrits = Math.max(0, Math.min(REPONSE.length, Math.floor((frame - 58) / 7)));
  const fini = motsEcrits >= REPONSE.length;

  return (
    <AbsoluteFill
      name="Plan 19 — Les bulles de l'agent"
      style={{alignItems: 'center', justifyContent: 'center'}}
    >
      <div style={{width: 1280, display: 'flex', flexDirection: 'column', gap: 34}}>
        <div
          style={{
            alignSelf: 'flex-end',
            maxWidth: 820,
            padding: '30px 40px',
            borderRadius: '30px 30px 8px 30px',
            backgroundColor: '#2e4fe6',
            fontFamily: 'Geist',
            fontWeight: 500,
            fontSize: 42,
            lineHeight: 1.3,
            color: '#ffffff',
            opacity: interpolate(frame, [0, 16], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
            translate: interpolate(frame, [0, 16], ['0px 22px', '0px 0px'], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
          }}
        >
          Ce bien est-il au bon prix ?
        </div>

        <div
          style={{
            alignSelf: 'flex-start',
            maxWidth: 1020,
            minHeight: 140,
            padding: '30px 40px',
            borderRadius: '30px 30px 30px 8px',
            backgroundColor: '#17171c',
            border: '1px solid #33333a',
            fontFamily: 'Geist',
            fontWeight: 500,
            fontSize: 42,
            lineHeight: 1.3,
            color: '#f6f6f8',
            fontVariantNumeric: 'tabular-nums',
            opacity: interpolate(frame, [44, 58], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
            translate: interpolate(frame, [44, 58], ['0px 22px', '0px 0px'], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
          }}
        >
          {REPONSE.slice(0, motsEcrits).join(' ')}
          <span style={{opacity: fini ? 0 : Math.floor(frame / 15) % 2, color: '#6e88f7'}}>▍</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

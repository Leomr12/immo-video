import React from 'react';
import {AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame} from 'remotion';
import {Logo} from '../composants/Logo';

/**
 * Plan 8 · 18,12 → 22,40 · fond blanc
 *
 * Le symbole Immopilier apparaît au centre dans un halo bleu concentrique qui
 * pulse deux fois, puis le mot « Immopilier » se déplie à sa droite. Sous le
 * logo, un champ de recherche : l'URL de l'annonce s'y colle caractère par
 * caractère, à 28 caractères par seconde, et un ✓ bleu s'allume au bout.
 *
 * Voix off — « Immopilier. Tu colles le lien de l'annonce. »
 *
 * Le logo est celui de la marque, découvert par un volet qui part de l'épingle :
 * le mot se déplie depuis le logo lui-même, et le plan se referme sur le lockup
 * complet. La charte interdit de séparer l'épingle du mot dans un même plan —
 * ici ils ne sont jamais deux marques distinctes, c'est un seul logo qui se
 * dévoile.
 */

/** URL fictive, comme l'impose le dossier : aucune capture d'un site d'annonces réel. */
const URL_ANNONCE = 'https://annonces.exemple.fr/vente/maison-92m2-33220';

export const Plan08: React.FC = () => {
  const frame = useCurrentFrame();

  // 28 caractères par seconde : chaque caractère prend 60 / 28 image.
  const caracteres = Math.max(0, Math.min(URL_ANNONCE.length, Math.floor(((frame - 96) * 28) / 60)));
  const fini = caracteres >= URL_ANNONCE.length;

  return (
    <AbsoluteFill name="Plan 8 — Immopilier, tu colles le lien" style={{alignItems: 'center', justifyContent: 'center'}}>
      {/* Deux ondes concentriques : scale 0,8 → 1,6, opacité 0,35 → 0. */}
      <div
        style={{
          position: 'absolute',
          top: 300,
          width: 420,
          height: 420,
          borderRadius: 999,
          backgroundColor: '#4a6bf2',
          opacity: interpolate(frame, [6, 54], [0.35, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
          scale: interpolate(frame, [6, 54], [0.8, 1.6], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            output: 'perceptual-scale',
          }),
          filter: 'blur(28px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 300,
          width: 420,
          height: 420,
          borderRadius: 999,
          backgroundColor: '#4a6bf2',
          opacity: interpolate(frame, [30, 78], [0.35, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
          scale: interpolate(frame, [30, 78], [0.8, 1.6], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            output: 'perceptual-scale',
          }),
          filter: 'blur(28px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 396,
          width: 940,
          // Le volet part de l'épingle et découvre le mot vers la droite.
          clipPath: `inset(0 ${interpolate(frame, [26, 62], [85, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          })}% 0 0)`,
          opacity: interpolate(frame, [0, 18], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
          scale: interpolate(frame, [0, 18], [0.94, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            output: 'perceptual-scale',
          }),
        }}
      >
        <Logo variante="light" largeur={940} />
      </div>

      <Interactive.Div
        name="Champ de recherche"
        style={{
          position: 'absolute',
          top: 690,
          display: 'flex',
          alignItems: 'center',
          gap: 26,
          width: 1290,
          height: 118,
          padding: '0 30px 0 38px',
          borderRadius: 999,
          backgroundColor: '#ffffff',
          border: '1px solid #e5e5e9',
          boxShadow: '0 26px 70px rgba(18,18,22,0.10)',
          opacity: interpolate(frame, [76, 96], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
          translate: interpolate(frame, [76, 96], ['0px 18px', '0px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
        }}
      >
        <div
          style={{
            flex: 1,
            fontFamily: 'Geist Mono',
            fontWeight: 400,
            fontSize: 34,
            color: '#4d4d57',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {URL_ANNONCE.slice(0, caracteres)}
          <span style={{opacity: fini ? 0 : Math.floor(frame / 15) % 2, color: '#2e4fe6'}}>|</span>
        </div>

        <div
          style={{
            width: 74,
            height: 74,
            flexShrink: 0,
            borderRadius: 999,
            backgroundColor: '#2e4fe6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: interpolate(frame, [206, 218], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
            scale: interpolate(frame, [206, 222], [0.5, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
              output: 'perceptual-scale',
            }),
          }}
        >
          <svg viewBox="0 0 24 24" width={40} height={40} fill="none" stroke="#ffffff" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};

import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {BIEN, BIEN_ECARTE, euroM2, pourcent} from '../bien';
import {FenetreNavigateur} from '../composants/FenetreNavigateur';

/**
 * Plan 17 · 43,50 → 46,53 · fond blanc
 *
 * Une fenêtre de navigateur, deux biens côte à côte. Un ✗ rouge sur l'un, un ✓
 * bleu sur l'autre.
 *
 * Voix off — « Celle qui est sous le prix du quartier. Et celle qui ne l'est pas. »
 *
 * Le ✗ prend le rouge sémantique `danger`, le ✓ prend l'accent — jamais le vert :
 * le vert n'appartient pas à l'identité, il n'existe que pour les états de
 * formulaire (charte § 1).
 */

const BIENS = [
  {
    pieces: BIEN.pieces,
    surface: BIEN.surface,
    prix: euroM2(BIEN.prixM2),
    ecart: `${pourcent(BIEN.ecart)} sous le quartier`,
    retenu: true,
    depart: 16,
  },
  {
    pieces: BIEN_ECARTE.pieces,
    surface: BIEN_ECARTE.surface,
    prix: euroM2(BIEN_ECARTE.prixM2),
    ecart: `${pourcent(BIEN_ECARTE.ecart)} au-dessus`,
    retenu: false,
    depart: 34,
  },
];

export const Plan17: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 17 — Deux biens comparés" style={{alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          scale: interpolate(frame, [0, 182], [0.96, 1.02], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.33, 0, 0.67, 1),
            output: 'perceptual-scale',
          }),
        }}
      >
        <FenetreNavigateur largeur={1560} hauteur={860} chrome={1}>
          <div style={{display: 'flex', gap: 56, padding: '128px 62px 62px', height: '100%'}}>
            {BIENS.map((bien) => (
              <div
                key={bien.prix}
                style={{
                  flex: 1,
                  position: 'relative',
                  borderRadius: 26,
                  border: '1px solid #e5e5e9',
                  backgroundColor: '#ffffff',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: interpolate(frame, [bien.depart - 12, bien.depart], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
                  }),
                }}
              >
                <div style={{height: 262, background: 'linear-gradient(140deg, #e5e5e9, #d5d5db)', filter: 'blur(7px)'}} />

                <div style={{padding: '30px 34px 34px', display: 'flex', flexDirection: 'column', gap: 12}}>
                  <div style={{fontFamily: 'Geist', fontWeight: 400, fontSize: 28, color: '#6a6a75'}}>
                    {bien.pieces} pièces · {bien.surface}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Geist',
                      fontWeight: 600,
                      fontSize: 54,
                      letterSpacing: '-0.02em',
                      color: '#121216',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {bien.prix}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Geist',
                      fontWeight: 500,
                      fontSize: 30,
                      color: bien.retenu ? '#2e4fe6' : '#b3261e',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {bien.ecart}
                  </div>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    top: 26,
                    right: 26,
                    width: 86,
                    height: 86,
                    borderRadius: 999,
                    backgroundColor: bien.retenu ? '#2e4fe6' : '#b3261e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 16px 40px rgba(18,18,22,0.25)',
                    opacity: interpolate(frame, [bien.depart + 18, bien.depart + 30], [0, 1], {
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                      easing: Easing.bezier(0.2, 0.8, 0.2, 1),
                    }),
                    scale: interpolate(frame, [bien.depart + 18, bien.depart + 34], [0.5, 1], {
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                      easing: Easing.bezier(0.2, 0.8, 0.2, 1),
                      output: 'perceptual-scale',
                    }),
                  }}
                >
                  <svg viewBox="0 0 24 24" width={48} height={48} fill="none" stroke="#ffffff" strokeWidth={2.8} strokeLinecap="round" strokeLinejoin="round">
                    {bien.retenu ? <path d="m5 12.5 4.5 4.5L19 7.5" /> : <path d="M6 6l12 12M18 6L6 18" />}
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </FenetreNavigateur>
      </div>
    </AbsoluteFill>
  );
};

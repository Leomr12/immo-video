import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {EtiquetteDPE} from '../composants/EtiquetteDPE';

/**
 * Plan 13 · 32,78 → 35,28 · fond sombre
 *
 * Quatre blocs de la fiche viennent au premier plan l'un après l'autre : la
 * parcelle et sa contenance, le bâtiment, l'étiquette DPE, les risques et le PLU.
 * Chaque bloc entre en profondeur, reste 500 ms, sort par le haut.
 *
 * Voix off — « La parcelle, le bâtiment, le DPE, les risques, le règlement
 * d'urbanisme. »
 *
 * 150 images pour quatre blocs : un toutes les 36 images, avec un recouvrement
 * de 6 images pour que l'un remplace l'autre sans trou noir entre les deux.
 */

const BLOCS = [
  {
    titre: 'Parcelle',
    lignes: [
      ['Référence', '333780000D1121'],
      ['Contenance', '1 042 m²'],
    ],
  },
  {
    titre: 'Bâtiment',
    lignes: [
      ['Année de construction', '1974'],
      ['Emprise au sol', '118 m²'],
      ['Niveaux', '2'],
    ],
  },
  {titre: 'Diagnostic de performance énergétique', lignes: []},
  {
    titre: "Risques et règlement d'urbanisme",
    lignes: [
      ['Retrait-gonflement des argiles', 'Aléa moyen'],
      ['Inondation', 'Hors zone'],
      ['Zonage PLU', 'UB'],
    ],
  },
] as const;

export const Plan13: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      name="Plan 13 — Parcelle, bâtiment, DPE, risques"
      style={{alignItems: 'center', justifyContent: 'center', perspective: 2000, overflow: 'hidden'}}
    >
      {BLOCS.map((bloc, i) => (
        <div
          key={bloc.titre}
          style={{
            position: 'absolute',
            width: 1120,
            padding: '54px 62px 58px',
            borderRadius: 32,
            backgroundColor: '#17171c',
            border: '1px solid #33333a',
            boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            // Entrée en profondeur, 500 ms de présence, sortie par le haut.
            opacity: interpolate(frame, [i * 36 - 4, i * 36 + 8, i * 36 + 30, i * 36 + 40], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: [Easing.bezier(0.2, 0.8, 0.2, 1), Easing.linear, Easing.bezier(0.4, 0, 0.2, 1)],
            }),
            translate: interpolate(frame, [i * 36 - 4, i * 36 + 8, i * 36 + 30, i * 36 + 40], ['0px 60px', '0px 0px', '0px 0px', '0px -140px'], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: [Easing.bezier(0.2, 0.8, 0.2, 1), Easing.linear, Easing.bezier(0.4, 0, 0.2, 1)],
            }),
            scale: interpolate(frame, [i * 36 - 4, i * 36 + 8], [0.86, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
              output: 'perceptual-scale',
            }),
          }}
        >
          <div style={{fontFamily: 'Geist', fontWeight: 600, fontSize: 46, letterSpacing: '-0.02em', color: '#f6f6f8'}}>
            {bloc.titre}
          </div>

          {i === 2 ? (
            <div style={{display: 'flex', alignItems: 'center', gap: 60}}>
              <EtiquetteDPE retenue="D" depart={i * 36 + 4} />
              <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                <div style={{fontFamily: 'Geist', fontWeight: 400, fontSize: 30, color: '#b3b3bc'}}>
                  Étiquette retenue
                </div>
                <div style={{fontFamily: 'Geist', fontWeight: 600, fontSize: 130, lineHeight: 1, color: '#f3dc2a'}}>
                  D
                </div>
                <div style={{fontFamily: 'Geist', fontWeight: 400, fontSize: 28, color: '#8b8b96'}}>
                  diagnostic de 2022
                </div>
              </div>
            </div>
          ) : (
            bloc.lignes.map(([libelle, valeur]) => (
              <div
                key={libelle}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: 40,
                  paddingBottom: 18,
                  borderBottom: '1px solid #33333a',
                }}
              >
                <span style={{fontFamily: 'Geist', fontWeight: 400, fontSize: 32, color: '#b3b3bc'}}>{libelle}</span>
                <span
                  style={{
                    fontFamily: 'Geist',
                    fontWeight: 500,
                    fontSize: 34,
                    color: '#f6f6f8',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {valeur}
                </span>
              </div>
            ))
          )}
        </div>
      ))}
    </AbsoluteFill>
  );
};

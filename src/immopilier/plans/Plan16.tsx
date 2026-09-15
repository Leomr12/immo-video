import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Compteur} from '../composants/Compteur';

/**
 * Plan 16 · 41,00 → 43,50 · fond blanc
 *
 * L'entonnoir : quarante vignettes d'annonces entrent par la gauche, trois
 * ressortent à droite. Les vignettes accélèrent dans le goulot, les recalées se
 * dissolvent. Les chiffres `40` et `3` encadrent l'entonnoir.
 *
 * Voix off — « De quarante annonces, il t'en reste trois. »
 */

/** Suite déterministe : la même trajectoire d'un rendu à l'autre. */
const alea = (graine: number) => {
  const x = Math.sin(graine * 57.7 + 83.9) * 15731.9;
  return x - Math.floor(x);
};

/** Quarante annonces ; trois seulement passent le goulot. */
const RETENUES = [7, 19, 31];

const ANNONCES = Array.from({length: 40}).map((_, i) => ({
  i,
  y: (alea(i + 11) - 0.5) * 2,
  depart: i * 1.8,
  retenue: RETENUES.includes(i),
  /**
   * Place d'arrivée des trois retenues. Sans elle, elles finissent toutes à la
   * même abscisse avec un écart vertical dérisoire et se recouvrent : on croit
   * n'en voir qu'une, ce qui ruine le « il t'en reste trois ».
   */
  place: RETENUES.indexOf(i),
}));

const ENTREE = 280;
const GOULOT = 1020;
const SORTIE = 1430;

export const Plan16: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 16 — De quarante annonces, il t'en reste trois" style={{overflow: 'hidden'}}>
      <svg viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
        <defs>
          <linearGradient id="entonnoir" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b9c6ff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#2e4fe6" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path d={`M${ENTREE},250 L${GOULOT},470 L${GOULOT},610 L${ENTREE},830 Z`} fill="url(#entonnoir)" />
        <path
          d={`M${ENTREE},250 L${GOULOT},470 M${ENTREE},830 L${GOULOT},610`}
          stroke="#2e4fe6"
          strokeWidth={3}
          fill="none"
          strokeOpacity={0.55}
        />
      </svg>

      {ANNONCES.map((annonce) => {
        // Avant le goulot la vignette dérive ; après, elle est projetée.
        const avance = interpolate(frame, [annonce.depart, annonce.depart + 38, annonce.depart + 56], [0, 0.72, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: [Easing.bezier(0.33, 0, 0.67, 1), Easing.bezier(0.55, 0, 0.35, 1)],
        });
        const x = ENTREE - 240 + avance * (SORTIE - ENTREE + 240);
        const resserre = Math.max(0, Math.min(1, (x - ENTREE) / (GOULOT - ENTREE)));
        // Après le goulot, les retenues rejoignent leur place dans la colonne.
        const sortie = Math.max(0, Math.min(1, (x - GOULOT) / (SORTIE - GOULOT)));
        const yGoulot = annonce.y * (270 - resserre * 200);
        const yFinal = annonce.retenue ? (annonce.place - 1) * 148 : yGoulot;

        return (
          <div
            key={annonce.i}
            style={{
              position: 'absolute',
              left: x,
              top: 540 + yGoulot + (yFinal - yGoulot) * sortie,
              width: 122,
              height: 82,
              marginTop: -41,
              borderRadius: 12,
              backgroundColor: '#ffffff',
              border: '1px solid #d5d5db',
              boxShadow: '0 10px 26px rgba(18,18,22,0.12)',
              // Les recalées se dissolvent au passage du goulot.
              opacity: annonce.retenue
                ? interpolate(frame, [annonce.depart, annonce.depart + 8], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  })
                : interpolate(frame, [annonce.depart, annonce.depart + 8, annonce.depart + 34, annonce.depart + 44], [0, 1, 1, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
            }}
          >
            <div style={{height: 38, borderRadius: '11px 11px 0 0', backgroundColor: '#e5e5e9'}} />
            <div style={{margin: '12px 14px 0', height: 8, borderRadius: 999, backgroundColor: '#e5e5e9'}} />
            <div style={{margin: '8px 14px 0', width: 52, height: 8, borderRadius: 999, backgroundColor: '#e5e5e9'}} />
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 440,
          fontFamily: 'Geist',
          fontWeight: 700,
          fontSize: 190,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: '#121216',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        40
      </div>

      <div
        style={{
          position: 'absolute',
          left: 1616,
          top: 440,
          fontFamily: 'Geist',
          fontWeight: 700,
          fontSize: 190,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: '#2e4fe6',
          opacity: interpolate(frame, [84, 104], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
        }}
      >
        <Compteur vers={3} depart={84} duree={26} />
      </div>
    </AbsoluteFill>
  );
};

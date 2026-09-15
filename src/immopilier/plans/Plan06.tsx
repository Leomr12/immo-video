import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';

/**
 * Plan 6 · 12,50 → 15,82 · fond sombre
 *
 * Des vignettes d'annonces s'empilent et remplissent le cadre, en perspective.
 * Arrivées en cascade, six par seconde, légère rotation aléatoire ; la caméra
 * recule pour toutes les contenir.
 *
 * Voix off — « Multiplie ça par vingt annonces dans la semaine. »
 *
 * Les vignettes sont génériques : photo floutée, pas de logo de portail, pas de
 * capture d'un site tiers, comme l'impose le dossier.
 */

/** Suite déterministe : deux rendus du même plan donnent exactement la même pile. */
const alea = (graine: number) => {
  const x = Math.sin(graine * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Vingt annonces — « vingt annonces dans la semaine ».
 *
 * Réparties sur une grille 5 × 4 bousculée, et non au hasard pur : le hasard
 * laisse des trous, et le script demande que la pile *remplisse* le cadre. La
 * grille déborde largement des 1920 × 1080 parce que la caméra recule jusqu'à
 * 0,82 et découvre alors près de 2 340 px de large.
 */
const VIGNETTES = Array.from({length: 20}).map((_, i) => {
  const colonne = i % 5;
  const rangee = Math.floor(i / 5);
  return {
    i,
    x: -180 + colonne * 528 + (alea(i + 1) - 0.5) * 170,
    y: -70 + rangee * 372 + (alea(i + 41) - 0.5) * 130,
    rotation: (alea(i + 81) - 0.5) * 16, // ±8°
    teinte: 196 + Math.round(alea(i + 121) * 34),
    // L'ordre d'arrivée est brouillé : sans cela la pile se remplirait
    // rangée par rangée, ce qui se lit comme un tableau, pas comme un tas.
    rang: Math.round(alea(i + 161) * 19),
  };
});

export const Plan06: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      name="Plan 6 — Vingt annonces dans la semaine"
      style={{
        perspective: 1800,
        // Images 199 à 209 : sortie du plan, jouée dans l'assemblage de l'acte.
        opacity: interpolate(frame, [199, 209], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
      }}
    >
      <AbsoluteFill
        name="Recul caméra"
        style={{
          scale: interpolate(frame, [0, 199], [1.18, 0.82], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.33, 0, 0.67, 1),
          }),
        }}
      >
        {VIGNETTES.map((v) => (
          <div
            key={v.i}
            style={{
              position: 'absolute',
              left: v.x,
              top: v.y,
              width: 380,
              borderRadius: 20,
              overflow: 'hidden',
              backgroundColor: '#17171c',
              border: '1px solid #33333a',
              boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
              rotate: `${v.rotation}deg`,
              // Six vignettes par seconde, soit une toutes les 10 images.
              opacity: interpolate(frame, [v.rang * 10, v.rang * 10 + 9], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
              }),
              translate: interpolate(frame, [v.rang * 10, v.rang * 10 + 14], ['0px 60px', '0px 0px'], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
              }),
            }}
          >
            <div
              style={{
                height: 190,
                background: `linear-gradient(140deg, hsl(${v.teinte} 16% 30%), hsl(${v.teinte} 14% 18%))`,
                filter: 'blur(9px)',
              }}
            />
            <div style={{padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 8}}>
              <div style={{fontFamily: 'Geist', fontWeight: 400, fontSize: 24, color: '#b3b3bc'}}>
                3 pièces · 92 m²
              </div>
              <div
                style={{
                  fontFamily: 'Geist',
                  fontWeight: 600,
                  fontSize: 38,
                  letterSpacing: '-0.02em',
                  fontVariantNumeric: 'tabular-nums',
                  color: '#f6f6f8',
                }}
              >
                249 000 €
              </div>
              <div style={{fontFamily: 'Geist', fontWeight: 400, fontSize: 22, color: '#8b8b96'}}>
                secteur recherché
              </div>
            </div>
          </div>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

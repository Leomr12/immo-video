import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {ANNONCES} from '../annonces';
import {CADASTRE_SOMBRE, CarteCadastre} from '../composants/CarteCadastre';
import {milliers} from '../bien';

/**
 * Plan 6 · 12,50 → 15,82 · fond sombre
 *
 * Des vignettes d'annonces s'empilent et remplissent le cadre, en perspective.
 * Arrivées en cascade, six par seconde, légère rotation aléatoire ; la caméra
 * recule pour toutes les contenir.
 *
 * Voix off — « Multiplie ça par vingt annonces dans la semaine. »
 *
 * Les treize biens sont tous différents — photo, prix, surface, secteur — parce
 * que le plan doit se lire comme treize annonces, pas comme une vignette
 * dupliquée. Ils sont dans `annonces.ts`.
 *
 * Derrière la pile, le plan cadastral, en encres sourdes. Il dérive lentement à
 * contresens du recul de la caméra : c'est ce qui donne de la profondeur au tas,
 * et c'est aussi la réponse que le produit apportera trois plans plus loin — la
 * carte est déjà là, sous les annonces, on ne la voit simplement pas encore.
 */

/** Suite déterministe : deux rendus du même plan donnent exactement la même pile. */
const alea = (graine: number) => {
  const x = Math.sin(graine * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Treize vignettes sur trois rangées de 5, 4 et 4.
 *
 * Ni grille régulière ni hasard pur : la grille se lit comme un tableau, le
 * hasard laisse des trous alors que la pile doit *remplir* le cadre. Chaque
 * rangée couvre donc toute la largeur, mais avec son propre pas — les colonnes ne
 * s'alignent pas d'une rangée à l'autre, et c'est ce décalage qui casse la
 * grille sans ouvrir de vide sur les bords.
 *
 * Les rangées débordent largement des 1920 × 1080 : la caméra recule jusqu'à 0,82
 * et découvre alors près de 2 340 px de large.
 */
const PAR_RANGEE = [5, 4, 4];
const GAUCHE = -180;
const LARGEUR_UTILE = 2112;

const VIGNETTES = ANNONCES.map((annonce, i) => {
  let rangee = 0;
  let colonne = i;
  while (colonne >= PAR_RANGEE[rangee]) {
    colonne -= PAR_RANGEE[rangee];
    rangee += 1;
  }
  const pas = LARGEUR_UTILE / (PAR_RANGEE[rangee] - 1);
  return {
    ...annonce,
    i,
    x: GAUCHE + colonne * pas + (alea(i + 1) - 0.5) * 150,
    y: -120 + rangee * 470 + (alea(i + 41) - 0.5) * 110,
    // Chacune a sa propre inclinaison et sa propre échelle. Sans cette
    // irrégularité la pile se lit comme une planche contact, pas comme un tas.
    rotation: (alea(i + 81) - 0.5) * 26, // ±13°
    echelle: 0.93 + alea(i + 201) * 0.14,
    // L'ordre d'arrivée est brouillé : sans cela la pile se remplirait rangée par
    // rangée, ce qui se lit comme un tableau qui se charge, pas comme un tas.
    rang: Math.round(alea(i + 161) * 12),
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
        name="Plan cadastral en fond"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          // Le fond avance quand la pile recule : le contresens creuse l'image.
          scale: interpolate(frame, [0, 199], [0.94, 1.14], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.33, 0, 0.67, 1),
          }),
          opacity: interpolate(frame, [0, 26], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
        }}
      >
        <div style={{width: 2400, height: 2400}}>
          <CarteCadastre parcelle={0} palette={CADASTRE_SOMBRE} />
        </div>
      </AbsoluteFill>

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
              scale: v.echelle,
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
            <Img
              src={staticFile(`annonces/${v.photo}`)}
              style={{width: 380, height: 190, objectFit: 'cover', display: 'block'}}
            />
            <div style={{padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 8}}>
              <div style={{fontFamily: 'Geist', fontWeight: 400, fontSize: 24, color: '#b3b3bc'}}>
                {v.pieces} pièces · {v.surface} m²
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
                {milliers(v.prix)} €
              </div>
              <div style={{fontFamily: 'Geist', fontWeight: 400, fontSize: 22, color: '#8b8b96'}}>
                {v.secteur}
              </div>
            </div>
          </div>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

import React from 'react';

/**
 * La carte du plan 9 : voirie et parcellaire, dessinés plutôt que tuilés.
 *
 * Aucun fournisseur de tuiles n'est requis — ni clé, ni réseau, ni attribution à
 * incruster — et le trait reste celui de la charte : aplats `--n-50`, voirie
 * blanche, parcellaire au trait `--n-200`. Deux rendus donnent la même image.
 *
 * Le repère est celui du script : 7 Lotissement du Haut Terrier, 33220
 * Saint-Avit-Saint-Nazaire, parcelle 333780000D1121.
 */

/** Suite déterministe, pour que le parcellaire ne bouge pas d'un rendu à l'autre. */
const alea = (graine: number) => {
  const x = Math.sin(graine * 91.7 + 47.3) * 28461.13;
  return x - Math.floor(x);
};

const ILOTS = Array.from({length: 40}).map((_, i) => {
  const colonne = i % 8;
  const rangee = Math.floor(i / 8);
  return {
    i,
    x: 120 + colonne * 232 + (alea(i + 3) - 0.5) * 34,
    y: 160 + rangee * 348 + (alea(i + 53) - 0.5) * 40,
    largeur: 168 + alea(i + 103) * 44,
    hauteur: 232 + alea(i + 153) * 62,
  };
});

/** Nombre de lanières d'un îlot — le même calcul sert au tracé et à la parcelle. */
const lanieresDe = (i: number) => 3 + Math.floor(alea(i + 203) * 3);

/**
 * La parcelle du bien : une lanière d'un îlot choisi, et non un rectangle posé au
 * milieu du plan — sinon elle chevauche une rue, ce qu'aucun cadastre ne fait.
 * C'est sur elle que la caméra du plan 9 se cale pendant tout le zoom.
 */
const ILOT_DU_BIEN = ILOTS[20];
const LANIERE_DU_BIEN = 1;
const HAUTEUR_LANIERE = ILOT_DU_BIEN.hauteur / lanieresDe(ILOT_DU_BIEN.i);

export const PARCELLE = {
  x: ILOT_DU_BIEN.x + ILOT_DU_BIEN.largeur / 2,
  y: ILOT_DU_BIEN.y + (LANIERE_DU_BIEN + 0.5) * HAUTEUR_LANIERE,
  largeur: ILOT_DU_BIEN.largeur,
  hauteur: HAUTEUR_LANIERE,
};

export const CarteCadastre: React.FC<{
  /** Surlignage de la parcelle, 0 → 1. */
  readonly parcelle: number;
}> = ({parcelle}) => {
  return (
    <svg viewBox="0 0 2000 2000" style={{width: '100%', height: '100%'}}>
      <rect x="0" y="0" width="2000" height="2000" fill="#f0f0f2" />

      {/* Voirie : des rues blanches, plus larges sur les axes. */}
      {Array.from({length: 7}).map((_, i) => (
        <rect key={`h${i}`} x="0" y={100 + i * 348} width="2000" height={i === 3 ? 42 : 26} fill="#ffffff" />
      ))}
      {Array.from({length: 9}).map((_, i) => (
        <rect key={`v${i}`} x={80 + i * 232} y="0" width={i === 4 ? 40 : 24} height="2000" fill="#ffffff" />
      ))}

      {/* Parcellaire : chaque îlot est redécoupé en lanières. */}
      {ILOTS.map((ilot) => {
        const lanieres = lanieresDe(ilot.i);
        return (
          <g key={ilot.i}>
            <rect
              x={ilot.x}
              y={ilot.y}
              width={ilot.largeur}
              height={ilot.hauteur}
              fill="#e5e5e9"
              stroke="#d5d5db"
              strokeWidth={2}
            />
            {Array.from({length: lanieres - 1}).map((_, k) => (
              <line
                key={k}
                x1={ilot.x}
                y1={ilot.y + ((k + 1) * ilot.hauteur) / lanieres}
                x2={ilot.x + ilot.largeur}
                y2={ilot.y + ((k + 1) * ilot.hauteur) / lanieres}
                stroke="#d5d5db"
                strokeWidth={2}
              />
            ))}
          </g>
        );
      })}

      {/* La parcelle du bien : elle s'allume en bleu translucide. */}
      <rect
        x={PARCELLE.x - PARCELLE.largeur / 2}
        y={PARCELLE.y - PARCELLE.hauteur / 2}
        width={PARCELLE.largeur}
        height={PARCELLE.hauteur}
        fill="#4a6bf2"
        fillOpacity={parcelle * 0.34}
        stroke="#2e4fe6"
        strokeWidth={3.2}
        strokeOpacity={parcelle}
      />
    </svg>
  );
};

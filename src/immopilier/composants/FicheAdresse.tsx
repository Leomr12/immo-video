import React from 'react';

/**
 * La fiche adresse du produit — celle que le plan 12 déroule et que le plan 14
 * garde en arrière-plan flouté. Les valeurs sont celles du bien du script :
 * 7 Lotissement du Haut Terrier, parcelle 333780000D1121.
 */

export const SECTIONS = [
  {
    titre: 'Parcelle',
    lignes: [
      ['Référence', '333780000D1121'],
      ['Contenance', '1 042 m²'],
      ['Commune', '33220 Saint-Avit-Saint-Nazaire'],
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
  {
    titre: 'Performance énergétique',
    lignes: [
      ['Étiquette DPE', 'D'],
      ['Étiquette climat', 'D'],
      ['Millésime du diagnostic', '2022'],
    ],
  },
  {
    titre: 'Risques',
    lignes: [
      ['Retrait-gonflement des argiles', 'Aléa moyen'],
      ['Inondation', 'Hors zone'],
      ['Radon', 'Catégorie 1'],
    ],
  },
  {
    titre: "Règlement d'urbanisme",
    lignes: [
      ['Zonage PLU', 'UB'],
      ['Emprise au sol maximale', '40 %'],
      ['Hauteur maximale', '7 m'],
    ],
  },
  {
    titre: 'Marché',
    lignes: [
      ['Prix médian du quartier', '2 880 €/m²'],
      ['Ventes retenues', '162'],
      ['Millésimes', '2020 → 2024'],
    ],
  },
] as const;

export const FicheAdresse: React.FC<{readonly largeur: number}> = ({largeur}) => (
  <div
    style={{
      width: largeur,
      borderRadius: 30,
      backgroundColor: '#121216',
      border: '1px solid #33333a',
      padding: '56px 62px',
      display: 'flex',
      flexDirection: 'column',
      gap: 46,
    }}
  >
    <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
      <div style={{fontFamily: 'Geist', fontWeight: 600, fontSize: 52, letterSpacing: '-0.02em', color: '#f6f6f8'}}>
        7 Lotissement du Haut Terrier
      </div>
      <div style={{fontFamily: 'Geist', fontWeight: 400, fontSize: 32, color: '#8b8b96'}}>
        33220 Saint-Avit-Saint-Nazaire
      </div>
    </div>

    {SECTIONS.map((section) => (
      <div key={section.titre} style={{display: 'flex', flexDirection: 'column', gap: 18}}>
        <div style={{fontFamily: 'Geist', fontWeight: 600, fontSize: 30, color: '#6e88f7', letterSpacing: '0.04em'}}>
          {section.titre.toUpperCase()}
        </div>
        {section.lignes.map(([libelle, valeur]) => (
          <div
            key={libelle}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 40,
              paddingBottom: 16,
              borderBottom: '1px solid #33333a',
            }}
          >
            <span style={{fontFamily: 'Geist', fontWeight: 400, fontSize: 30, color: '#b3b3bc'}}>{libelle}</span>
            <span
              style={{
                fontFamily: 'Geist',
                fontWeight: 500,
                fontSize: 32,
                color: '#f6f6f8',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {valeur}
            </span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

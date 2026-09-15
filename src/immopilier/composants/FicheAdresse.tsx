import React from 'react';
import {BIEN, euroM2} from '../bien';

/**
 * La fiche adresse du produit — celle que le plan 12 déroule et que le plan 14
 * garde en arrière-plan flouté. Les valeurs viennent toutes de `bien.ts`.
 */

export const SECTIONS = [
  {
    titre: 'Parcelle',
    lignes: [
      ['Référence', BIEN.parcelle],
      ['Contenance', BIEN.contenance],
      ['Commune', `${BIEN.codePostal} ${BIEN.ville}`],
    ],
  },
  {
    titre: 'Bâtiment',
    lignes: [
      ['Année de construction', BIEN.anneeConstruction],
      ['Emprise au sol', BIEN.empriseAuSol],
      ['Niveaux', BIEN.niveaux],
    ],
  },
  {
    titre: 'Performance énergétique',
    lignes: [
      ['Étiquette DPE', BIEN.dpe],
      ['Étiquette climat', BIEN.dpe],
      ['Millésime du diagnostic', BIEN.anneeDpe],
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
      ['Zonage PLU', BIEN.zonagePlu],
      ['Emprise au sol maximale', '40 %'],
      ['Hauteur maximale', '7 m'],
    ],
  },
  {
    titre: 'Marché',
    lignes: [
      ['Prix médian du quartier', euroM2(BIEN.medianeQuartier)],
      ['Ventes retenues', String(BIEN.ventesRetenues)],
      ['Millésimes', BIEN.millesimes],
    ],
  },
];

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
        {BIEN.adresse}
      </div>
      <div style={{fontFamily: 'Geist', fontWeight: 400, fontSize: 32, color: '#8b8b96'}}>
        {BIEN.codePostal} {BIEN.ville} · {BIEN.quartier}
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

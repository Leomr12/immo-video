/**
 * Le bien de démonstration, et son quartier.
 *
 * Tout est regroupé ici parce que les mêmes valeurs reviennent dans huit plans :
 * l'encart d'adresse (9), les tuiles (10), la fiche (12 et 14), les blocs (13),
 * la couronne (15), la comparaison (17), le récapitulatif (18) et la réponse de
 * l'agent (19). Éparpillées, elles finissent par se contredire — un prix au m²
 * ici, un écart qui ne colle plus là.
 *
 * ⟦ Adresse et valeurs fictives, cohérentes entre elles mais non vérifiées.
 *   À remplacer par un vrai relevé DVF avant diffusion : le dossier interdit
 *   tout chiffre non vérifié à l'écran. ⟧
 */
export const BIEN = {
  adresse: '18 rue Servan',
  codePostal: '75011',
  ville: 'Paris',
  quartier: 'Saint-Ambroise',

  parcelle: '75111000BR0047',
  contenance: '412 m²',

  pieces: 3,
  surface: '68 m²',
  prix: 662000,
  prixM2: 9735,

  medianeQuartier: 10360,
  ecart: -6,
  ventesRetenues: 248,
  millesimes: '2020 → 2024',

  anneeConstruction: '1902',
  empriseAuSol: '286 m²',
  niveaux: '6',
  dpe: 'D',
  anneeDpe: '2019',
  zonagePlu: 'UG',
} as const;

/**
 * Le nombre de communes couvertes, affiché aux plans 14 et 21.
 *
 * ⟦ Chiffre donné par le commanditaire. Le dossier interdit tout chiffre non
 *   vérifié à l'écran : le recompter avant diffusion, ou retirer le chiffre et
 *   garder la phrase. ⟧
 */
export const COMMUNES_COUVERTES = 30225;

/** Le bien écarté du plan 17 : au-dessus de la médiane du quartier. */
export const BIEN_ECARTE = {
  pieces: 3,
  surface: '71 m²',
  prixM2: 11603,
  ecart: 12,
} as const;

/**
 * Les communes limitrophes du 11ᵉ, pour la couronne du plan 15.
 *
 * ⟦ À CONFIRMER AVANT MONTAGE — les communes sont bien les voisines réelles,
 *   mais les prix sont des valeurs d'attente. Remplacer par la médiane DVF
 *   réelle, ou retirer la commune. ⟧
 */
export const COMMUNES_VOISINES = [
  {nom: 'Saint-Mandé', prixM2: 8610},
  {nom: 'Vincennes', prixM2: 7840},
  {nom: 'Charenton-le-Pont', prixM2: 7190},
  {nom: 'Les Lilas', prixM2: 6880},
  {nom: 'Le Pré-Saint-Gervais', prixM2: 6420},
  {nom: 'Montreuil', prixM2: 6270},
  {nom: 'Pantin', prixM2: 6050},
  {nom: 'Bagnolet', prixM2: 5610},
] as const;

/** `9735` → `9 735`, avec l'espace fine insécable de la charte. */
export const milliers = (n: number) =>
  String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/** `9735` → `9 735 €/m²`. */
export const euroM2 = (n: number) => `${milliers(n)} €/m²`;

/** `-6` → `−6 %` ; `12` → `+12 %`. Le signe moins est le vrai, pas un trait d'union. */
export const pourcent = (n: number) => `${n < 0 ? '−' : '+'}${Math.abs(n)} %`;

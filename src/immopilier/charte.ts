// Jetons de la charte Immopilier — dossier-immopilier/marque/palette.json.
//
// Les scènes écrivent les couleurs en clair dans leurs `style` : le Studio ne
// sait rendre modifiable qu'une valeur littérale, pas une constante importée.
// Ce fichier sert donc de référence de vérité et porte les suites de couleurs
// qu'on ne peut pas inliner (échelle des prix, étiquette DPE).

/** L'identité est monochrome + un seul accent. Un plan où tout est bleu est un plan raté. */
export const COULEURS = {
  fondClair: '#ffffff',
  fondClairAttenue: '#f6f6f8',
  fondSombre: '#0a0a0c',
  fondSombreAttenue: '#0f0f12',
  surfaceSombre: '#121216',
  surfaceSombreElevee: '#17171c',

  texteClair: '#121216',
  texteClairSecondaire: '#4d4d57',
  texteSombre: '#f6f6f8',
  texteSombreSecondaire: '#b3b3bc',

  accent50: '#eef1ff',
  accent200: '#b9c6ff',
  accent400: '#6e88f7', // mots accentués sur fond sombre
  accent500: '#4a6bf2', // points de carte, radar
  accent600: '#2e4fe6', // mots accentués sur fond clair, boutons
  accent700: '#2340bd',

  danger: '#b3261e',
} as const;

/** Échelle des prix, plan 11 — l'ordre est imposé par la légende du produit. */
export const ECHELLE_PRIX = [
  '#e0e7ff',
  '#c7d2fe',
  '#a5b4fc',
  '#818cf8',
  '#fbbf24',
  '#f59e0b',
  '#ef4444',
  '#b91c1c',
] as const;

/** Étiquette DPE, plan 13 — lettres toujours blanches. */
export const DPE = {
  A: '#319a68',
  B: '#5fb15a',
  C: '#a9c94f',
  D: '#f3dc2a',
  E: '#efa33d',
  F: '#e5652c',
  G: '#d22f27',
} as const;

/** Espace fine insécable : séparateur de milliers français. `34 935`, jamais `34,935`. */
export const FINE = ' ';
/** Espace insécable : avant €, %, ?, !. */
export const NBSP = ' ';

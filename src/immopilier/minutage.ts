// Minutage des 24 plans — dossier-immopilier/SCRIPT-VIDEO.md.
//
// La vidéo fait 67,5 s à 60 fps, soit 4050 images. Les timecodes du script sont
// en secondes ; l'arrondi à l'image est fait ici, une fois pour toutes, pour que
// la fin d'un plan soit toujours exactement le début du suivant.

export const FPS = 60;
export const DUREE_TOTALE = 4050; // 67,5 s

export type Plan = {
  /** Numéro du plan au script. */
  readonly n: number;
  /** Première image du plan, incluse. */
  readonly debut: number;
  /** Première image du plan suivant, exclue. */
  readonly fin: number;
  readonly fond: 'clair' | 'sombre';
  readonly titre: string;
};

export const PLANS = [
  {n: 1, debut: 0, fin: 144, fond: 'clair', titre: 'Radar sur la France'},
  {n: 2, debut: 144, fin: 276, fond: 'clair', titre: "Boussole — l'adresse à la main"},
  {n: 3, debut: 276, fin: 372, fond: 'clair', titre: 'La fenêtre recule et se fige'},
  {n: 4, debut: 372, fin: 510, fond: 'sombre', titre: 'Une annonce ne dit jamais où elle est'},

  {n: 5, debut: 510, fin: 750, fond: 'sombre', titre: 'Les cinq étapes à la main'},
  {n: 6, debut: 750, fin: 949, fond: 'sombre', titre: 'Vingt annonces dans la semaine'},
  {n: 7, debut: 949, fin: 1087, fond: 'sombre', titre: 'Le dossier vide'},

  {n: 8, debut: 1087, fin: 1344, fond: 'clair', titre: 'Immopilier — tu colles le lien'},
  {n: 9, debut: 1344, fin: 1608, fond: 'clair', titre: "L'adresse à la parcelle"},
  {n: 10, debut: 1608, fin: 1691, fond: 'sombre', titre: 'Trois tuiles de statistiques'},
  {n: 11, debut: 1691, fin: 1871, fond: 'sombre', titre: 'La carte des prix en 3D'},
  {n: 12, debut: 1871, fin: 1967, fond: 'sombre', titre: "La fiche adresse se déroule"},
  {n: 13, debut: 1967, fin: 2117, fond: 'sombre', titre: 'Parcelle, bâtiment, DPE, risques'},
  {n: 14, debut: 2117, fin: 2302, fond: 'sombre', titre: 'Les compteurs des bases publiques'},
  {n: 15, debut: 2302, fin: 2460, fond: 'clair', titre: 'La couronne des communes'},
  {n: 16, debut: 2460, fin: 2610, fond: 'clair', titre: "L'entonnoir, 40 → 3"},
  {n: 17, debut: 2610, fin: 2792, fond: 'clair', titre: 'Deux biens comparés'},
  {n: 18, debut: 2792, fin: 2880, fond: 'sombre', titre: 'La fiche récapitulative'},
  {n: 19, debut: 2880, fin: 3056, fond: 'sombre', titre: "Les bulles de l'agent"},

  {n: 20, debut: 3056, fin: 3180, fond: 'sombre', titre: 'La France en constellation'},
  {n: 21, debut: 3180, fin: 3390, fond: 'sombre', titre: 'Six bases, cinq millésimes'},
  {n: 22, debut: 3390, fin: 3660, fond: 'sombre', titre: 'Votre copilote'},

  {n: 23, debut: 3660, fin: 3840, fond: 'clair', titre: 'Colle ta première annonce'},
  {n: 24, debut: 3840, fin: 4050, fond: 'clair', titre: 'Logo, bouton, curseur'},
] as const satisfies readonly Plan[];

export const plan = (n: number): Plan => {
  const trouve = PLANS.find((p) => p.n === n);
  if (!trouve) throw new Error(`plan ${n} inconnu`);
  return trouve;
};

/** Durée d'un plan, en images. */
export const duree = (n: number): number => {
  const p = plan(n);
  return p.fin - p.debut;
};

// Durées de la charte (marque/CHARTE-VIDEO.md, § 4 Mouvement), converties en images.
export const MOUVEMENT = {
  /** Apparition d'un mot — 180 ms. */
  mot: 11,
  /** Entrée d'une carte / fiche — 240 ms. */
  fiche: 14,
  /** Bascule de fond clair ↔ sombre — 400 ms. */
  bascule: 24,
  /** Zoom de carte — 2 600 ms. */
  zoomCarte: 156,
  /** Inclinaison 2D → 3D — 600 ms. */
  inclinaison: 36,
  /** Décalage entre deux mots de la typo cinétique — 60 ms. */
  motSuivant: 4,
} as const;

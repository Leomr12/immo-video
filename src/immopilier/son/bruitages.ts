/**
 * Les bruitages, à l'image près.
 *
 * Deux familles, et la distinction compte :
 *
 * — **Les trois sons de la charte** : le *tick* du radar, le *ding* de validation
 *   et le *clic* final, auxquels le script ajoute le *clac* de pause du plan 3 et
 *   le souffle montant du plan 8. Ce sont les moments où le produit *répond* ;
 *   ils s'entendent.
 *
 * — **Les sons d'interface** : ce qui apparaît, ce qui défile, ce qui glisse.
 *   Ils accompagnent le mouvement des blocs, des fiches et des cartes. Ils sont
 *   volontairement très bas (0,10 à 0,22) : c'est de la texture, pas un
 *   événement. Un film sobre ne bruite pas tout — et quarante bruits à plein
 *   niveau transformeraient la démonstration en jeu vidéo.
 *
 * Les fichiers sont fabriqués par `tools/prep-sons.mjs`, synthétisés à partir de
 * rien : aucune banque de sons, donc aucune licence à vérifier. Pour les
 * remplacer par des prises du commerce, il suffit de changer les noms.
 */
export type Bruitage = {
  /** Image à laquelle le son démarre dans le film. */
  readonly image: number;
  readonly role: string;
  readonly fichier: string | null;
  /** Volume, 0 → 1. */
  readonly volume: number;
};

export const BRUITAGES: Bruitage[] = [
  // Acte I
  {image: 318, role: 'plan 3 — le clac de pause, quand la fenêtre se fige', fichier: 'clac.mp3', volume: 0.5},

  // Acte II — le chemin, la pile d'annonces, la croix
  {image: 512, role: 'plan 5 — le travelling latéral démarre', fichier: 'glissement.mp3', volume: 0.2},
  {image: 528, role: 'plan 5 — jalon 1, trouver l’adresse', fichier: 'apparition.mp3', volume: 0.16},
  {image: 576, role: 'plan 5 — jalon 2, situer la parcelle', fichier: 'apparition.mp3', volume: 0.16},
  {image: 624, role: 'plan 5 — jalon 3, comparer les ventes', fichier: 'apparition.mp3', volume: 0.16},
  {image: 672, role: 'plan 5 — jalon 4, lire le quartier', fichier: 'apparition.mp3', volume: 0.16},
  {image: 720, role: 'plan 5 — jalon 5, décider', fichier: 'apparition.mp3', volume: 0.16},

  // Plan 6 : vingt vignettes, un son une fois sur deux — vingt feraient une bouillie.
  {image: 750, role: 'plan 6 — la pile commence', fichier: 'apparition.mp3', volume: 0.13},
  {image: 770, role: 'plan 6 — vignette', fichier: 'apparition.mp3', volume: 0.12},
  {image: 790, role: 'plan 6 — vignette', fichier: 'apparition.mp3', volume: 0.12},
  {image: 810, role: 'plan 6 — vignette', fichier: 'apparition.mp3', volume: 0.12},
  {image: 830, role: 'plan 6 — vignette', fichier: 'apparition.mp3', volume: 0.12},
  {image: 850, role: 'plan 6 — vignette', fichier: 'apparition.mp3', volume: 0.12},
  {image: 870, role: 'plan 6 — vignette', fichier: 'apparition.mp3', volume: 0.12},
  {image: 890, role: 'plan 6 — vignette', fichier: 'apparition.mp3', volume: 0.12},
  {image: 910, role: 'plan 6 — vignette', fichier: 'apparition.mp3', volume: 0.12},
  {image: 930, role: 'plan 6 — dernière vignette', fichier: 'apparition.mp3', volume: 0.12},

  {image: 971, role: 'plan 7 — la croix se trace', fichier: 'clac.mp3', volume: 0.34},

  // Acte III — le produit
  {image: 1087, role: 'plan 8 — le souffle montant sur l’arrivée de la marque', fichier: 'souffle.mp3', volume: 0.38},
  {image: 1254, role: 'plan 8 — le ding propre sur le ✓', fichier: 'ding.mp3', volume: 0.62},
  {image: 1476, role: 'plan 9 — le point qui se pose sur la parcelle', fichier: 'pose.mp3', volume: 0.5},
  {image: 1484, role: 'plan 9 — l’encart d’adresse glisse depuis le bas', fichier: 'apparition.mp3', volume: 0.2},
  {image: 1591, role: 'plan 9 — le clic du curseur sur le ✓', fichier: 'clic.mp3', volume: 0.5},
  {image: 1608, role: 'plan 10 — les trois tuiles de statistiques', fichier: 'apparition.mp3', volume: 0.2},
  {image: 1703, role: 'plan 11 — la carte des prix s’incline en 3D', fichier: 'glissement.mp3', volume: 0.22},
  {image: 1871, role: 'plan 12 — la fiche se déroule', fichier: 'defilement.mp3', volume: 0.34},
  {image: 1967, role: 'plan 13 — bloc parcelle', fichier: 'apparition.mp3', volume: 0.18},
  {image: 2003, role: 'plan 13 — bloc bâtiment', fichier: 'apparition.mp3', volume: 0.18},
  {image: 2039, role: 'plan 13 — bloc DPE', fichier: 'apparition.mp3', volume: 0.18},
  {image: 2075, role: 'plan 13 — bloc risques et PLU', fichier: 'apparition.mp3', volume: 0.18},
  {image: 2125, role: 'plan 14 — compteur ventes analysées', fichier: 'tick.mp3', volume: 0.16},
  {image: 2171, role: 'plan 14 — compteur communes couvertes', fichier: 'tick.mp3', volume: 0.16},
  {image: 2217, role: 'plan 14 — millésimes', fichier: 'tick.mp3', volume: 0.16},
  {image: 2302, role: 'plan 15 — la couronne des communes se déploie', fichier: 'apparition.mp3', volume: 0.2},
  {image: 2544, role: 'plan 16 — les trois retenues arrivent', fichier: 'pose.mp3', volume: 0.3},
  {image: 2626, role: 'plan 17 — le bien retenu', fichier: 'apparition.mp3', volume: 0.18},
  {image: 2644, role: 'plan 17 — le bien écarté', fichier: 'apparition.mp3', volume: 0.18},
  {image: 2792, role: 'plan 18 — la fiche récapitulative', fichier: 'apparition.mp3', volume: 0.2},
  {image: 2880, role: 'plan 19 — la question de l’utilisateur', fichier: 'apparition.mp3', volume: 0.18},
  {image: 2924, role: 'plan 19 — la réponse de l’agent', fichier: 'apparition.mp3', volume: 0.18},

  // Acte IV — la preuve
  {image: 3056, role: 'plan 20 — le dézoom sur la constellation', fichier: 'glissement.mp3', volume: 0.18},
  {image: 3180, role: 'plan 21 — six bases publiques', fichier: 'apparition.mp3', volume: 0.18},
  {image: 3246, role: 'plan 21 — cinq millésimes', fichier: 'apparition.mp3', volume: 0.18},
  {image: 3312, role: 'plan 21 — les communes', fichier: 'apparition.mp3', volume: 0.18},

  // Acte V — le plan 22 et les arcs du 23 restent nus : la musique doit respirer
  // avant la chute, et le dernier clic n'a de poids que sur du silence.
  {image: 3840, role: 'plan 24 — le logo', fichier: 'apparition.mp3', volume: 0.2},
  {image: 3984, role: 'plan 24 — le clic de souris final', fichier: 'clic.mp3', volume: 0.6},
];

/**
 * Le *tick* du radar, plan 1 : un par point allumé, ce serait 150 sons. On n'en
 * garde que huit, régulièrement répartis sur le tour de 2,4 s — l'oreille entend
 * un balayage, pas une mitraille.
 */
export const TICKS_RADAR = {
  fichier: 'tick.mp3' as string | null,
  volume: 0.18,
  images: [6, 24, 42, 60, 78, 96, 114, 132],
};

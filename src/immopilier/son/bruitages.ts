/**
 * Les bruitages, à l'image près.
 *
 * La charte n'en retient que trois — le *tick* du radar, le *ding* de validation
 * et le *clic* final — auxquels le script ajoute le *clac* de pause du plan 3 et
 * le souffle montant du plan 8. En rester là : un film sobre ne se bruite pas
 * partout, il bruite ce qui compte.
 *
 * `fichier` vaut `null` quand aucun son n'est branché — c'est le cas
 * aujourd'hui : les bruitages sont fournis par le commanditaire. Déposer les
 * fichiers dans `public/son/bruitages/` et écrire leur nom ici suffit à les
 * monter, chacun à l'image indiquée.
 *
 * `tools/prep-sons.mjs` sait fabriquer un jeu d'attente si on en a besoin pour
 * juger du rythme avant d'avoir les vrais sons.
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
  {image: 318, role: 'plan 3 — le clac de pause, quand la fenêtre se fige', fichier: null, volume: 0.58},
  {image: 1087, role: 'plan 8 — le souffle montant sur l’arrivée de la marque', fichier: null, volume: 0.44},
  {image: 1309, role: 'plan 8 — le ding propre sur le ✓', fichier: null, volume: 0.66},
  {image: 1476, role: 'plan 9 — le point qui se pose sur la parcelle', fichier: null, volume: 0.6},
  {image: 1591, role: 'plan 9 — le clic du curseur sur le ✓', fichier: null, volume: 0.7},
  {image: 3984, role: 'plan 24 — le clic de souris final', fichier: null, volume: 0.72},
];

/**
 * Le *tick* du radar, plan 1 : un par point allumé, ce serait 150 sons. On n'en
 * garde que huit, régulièrement répartis sur le tour de 2,4 s — l'oreille entend
 * un balayage, pas une mitraille.
 */
export const TICKS_RADAR = {
  fichier: null as string | null,
  volume: 0.24,
  images: [6, 24, 42, 60, 78, 96, 114, 132],
};

/**
 * Les vingt annonces du plan 6 — « Multiplie ça par vingt annonces dans la
 * semaine. »
 *
 * Aucune n'a le même prix, la même surface ni le même nombre de pièces : le plan
 * doit se lire comme vingt biens différents, pas comme une vignette dupliquée.
 * Chaque prix est cohérent avec son bien et avec le prix au m² de son secteur.
 *
 * ⟦ PHOTOS MANQUANTES — `photo` pointe dans `public/annonces/`, et vaut `null`
 *   tant qu'aucune image n'est fournie : la vignette montre alors un aplat
 *   photographique neutre. Déposer les fichiers et écrire leur nom ici, rien
 *   d'autre à toucher. Voir `public/annonces/_photos.md`.
 *
 *   Le dossier rappelle de n'utiliser aucune capture d'un site d'annonces réel
 *   et aucun visage identifiable. ⟧
 */

export type Annonce = {
  /** Lequel des cinq biens — c'est lui qui dit quelle photo va sur la vignette. */
  readonly bien: 1 | 2 | 3 | 4 | 5;
  /** Nom du fichier dans `public/annonces/`, ou `null` tant qu'il n'y a pas de photo. */
  readonly photo: string | null;
  readonly pieces: number;
  readonly surface: number;
  readonly prix: number;
  readonly secteur: string;
};

export const ANNONCES: Annonce[] = [
  {bien: 1, photo: null, pieces: 6, surface: 165, prix: 749000, secteur: 'proche gare'},
  {bien: 2, photo: null, pieces: 5, surface: 142, prix: 585000, secteur: 'secteur recherché'},
  {bien: 3, photo: null, pieces: 9, surface: 310, prix: 1450000, secteur: 'parc arboré'},
  {bien: 4, photo: null, pieces: 4, surface: 96, prix: 289000, secteur: 'vue dégagée'},
  {bien: 5, photo: null, pieces: 5, surface: 128, prix: 395000, secteur: 'cachet ancien'},

  {bien: 2, photo: null, pieces: 4, surface: 108, prix: 432000, secteur: 'quartier calme'},
  {bien: 4, photo: null, pieces: 3, surface: 74, prix: 218000, secteur: 'centre-bourg'},
  {bien: 1, photo: null, pieces: 7, surface: 198, prix: 895000, secteur: 'sans vis-à-vis'},
  {bien: 5, photo: null, pieces: 6, surface: 151, prix: 468000, secteur: 'poutres apparentes'},
  {bien: 3, photo: null, pieces: 8, surface: 264, prix: 1180000, secteur: 'demeure de caractère'},

  {bien: 4, photo: null, pieces: 5, surface: 119, prix: 336000, secteur: 'proche écoles'},
  {bien: 1, photo: null, pieces: 5, surface: 134, prix: 612000, secteur: 'jardin clos'},
  {bien: 3, photo: null, pieces: 11, surface: 382, prix: 1890000, secteur: 'orangerie'},
  {bien: 5, photo: null, pieces: 4, surface: 88, prix: 247000, secteur: 'rénové'},
  {bien: 2, photo: null, pieces: 6, surface: 176, prix: 678000, secteur: 'impasse'},

  {bien: 1, photo: null, pieces: 4, surface: 102, prix: 498000, secteur: 'plain-pied'},
  {bien: 4, photo: null, pieces: 6, surface: 157, prix: 412000, secteur: 'hameau'},
  {bien: 3, photo: null, pieces: 7, surface: 229, prix: 965000, secteur: 'dépendances'},
  {bien: 2, photo: null, pieces: 3, surface: 81, prix: 324000, secteur: 'proche commerces'},
  {bien: 5, photo: null, pieces: 8, surface: 243, prix: 731000, secteur: 'corps de ferme'},
];

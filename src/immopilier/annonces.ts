/**
 * Les vingt annonces du plan 6 — « Multiplie ça par vingt annonces dans la
 * semaine. »
 *
 * Aucune n'a le même prix, la même surface ni le même nombre de pièces : le plan
 * doit se lire comme vingt biens différents, pas comme une vignette dupliquée.
 * Chaque prix est cohérent avec son bien et avec le prix au m² de son secteur.
 *
 * ⟦ PHOTOS — `photo` pointe dans `public/annonces/`. Les cinq fichiers livrés
 *   sont des remplaçants dessinés, pas des photographies : déposer les vraies
 *   images dans ce dossier et remplacer les noms ci-dessous, rien d'autre à
 *   toucher. Le dossier rappelle de n'utiliser aucune capture d'un site
 *   d'annonces ni aucun visage identifiable. ⟧
 */

export type Annonce = {
  readonly photo: string;
  readonly pieces: number;
  readonly surface: number;
  readonly prix: number;
  readonly secteur: string;
};

export const ANNONCES: Annonce[] = [
  {photo: 'pavillon-enduit.svg', pieces: 6, surface: 165, prix: 749000, secteur: 'proche gare'},
  {photo: 'maison-brique.svg', pieces: 5, surface: 142, prix: 585000, secteur: 'secteur recherché'},
  {photo: 'manoir-brique.svg', pieces: 9, surface: 310, prix: 1450000, secteur: 'parc arboré'},
  {photo: 'maison-pierre.svg', pieces: 4, surface: 96, prix: 289000, secteur: 'vue dégagée'},
  {photo: 'interieur-pierre.svg', pieces: 5, surface: 128, prix: 395000, secteur: 'cachet ancien'},

  {photo: 'maison-brique.svg', pieces: 4, surface: 108, prix: 432000, secteur: 'quartier calme'},
  {photo: 'maison-pierre.svg', pieces: 3, surface: 74, prix: 218000, secteur: 'centre-bourg'},
  {photo: 'pavillon-enduit.svg', pieces: 7, surface: 198, prix: 895000, secteur: 'sans vis-à-vis'},
  {photo: 'interieur-pierre.svg', pieces: 6, surface: 151, prix: 468000, secteur: 'poutres apparentes'},
  {photo: 'manoir-brique.svg', pieces: 8, surface: 264, prix: 1180000, secteur: 'demeure de caractère'},

  {photo: 'maison-pierre.svg', pieces: 5, surface: 119, prix: 336000, secteur: 'proche écoles'},
  {photo: 'pavillon-enduit.svg', pieces: 5, surface: 134, prix: 612000, secteur: 'jardin clos'},
  {photo: 'manoir-brique.svg', pieces: 11, surface: 382, prix: 1890000, secteur: 'orangerie'},
  {photo: 'interieur-pierre.svg', pieces: 4, surface: 88, prix: 247000, secteur: 'rénové'},
  {photo: 'maison-brique.svg', pieces: 6, surface: 176, prix: 678000, secteur: 'impasse'},

  {photo: 'pavillon-enduit.svg', pieces: 4, surface: 102, prix: 498000, secteur: 'plain-pied'},
  {photo: 'maison-pierre.svg', pieces: 6, surface: 157, prix: 412000, secteur: 'hameau'},
  {photo: 'manoir-brique.svg', pieces: 7, surface: 229, prix: 965000, secteur: 'dépendances'},
  {photo: 'maison-brique.svg', pieces: 3, surface: 81, prix: 324000, secteur: 'proche commerces'},
  {photo: 'interieur-pierre.svg', pieces: 8, surface: 243, prix: 731000, secteur: 'corps de ferme'},
];

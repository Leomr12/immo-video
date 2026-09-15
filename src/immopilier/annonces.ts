/**
 * Les annonces du plan 6 — « Difficile, dans ces conditions, de savoir si le prix
 * est juste. »
 *
 * Treize biens, treize photos, **jamais deux fois la même**. Aucun n'a le même
 * prix, la même surface ni le même secteur : le plan doit se lire comme treize
 * annonces différentes, pas comme une vignette dupliquée.
 *
 * ⟦ Les prix sont **estimés d'après la photo** — type de bien, état, standing du
 *   quartier qu'on devine. Ils sont cohérents entre eux et avec leur marché
 *   supposé, mais ce ne sont pas des prix relevés. Le dossier interdit tout
 *   chiffre non vérifié à l'écran : à confirmer avant diffusion, ou à remplacer
 *   par de vraies annonces. ⟧
 */

export type Annonce = {
  /** Nom du fichier dans `public/annonces/`. */
  readonly photo: string;
  /** Ce que montre la photo — sert à retrouver l'annonce dans le dossier. */
  readonly sujet: string;
  readonly pieces: number;
  readonly surface: number;
  readonly prix: number;
  readonly secteur: string;
};

export const ANNONCES: Annonce[] = [
  {photo: '00d51cd2-7fc3-44ce-8972-98b713bda667.png', sujet: 'villa contemporaine, toit plat, double garage',
   pieces: 7, surface: 245, prix: 1290000, secteur: 'livraison 2024'},
  {photo: '063ee4ae-2e5f-47b7-86d3-4aa3d3f52202.png', sujet: 'immeuble en pierre de taille, balcons en fer forgé',
   pieces: 6, surface: 178, prix: 985000, secteur: 'pierre de taille'},
  {photo: '0f44065c-f77c-4524-980c-7b519b340f71.png', sujet: 'séjour, murs de pierre, poutres, poêle à bois',
   pieces: 5, surface: 132, prix: 348000, secteur: 'poutres apparentes'},
  {photo: '29f543f9-0a79-4f7b-aaef-4476faa256af.png', sujet: 'longère de pierre, toit de tuiles rouges, grand pré',
   pieces: 6, surface: 165, prix: 395000, secteur: 'vue dégagée'},
  {photo: '61b56a42-7c4c-4457-9f03-576534f811ae.png', sujet: 'salon haussmannien, moulures, cheminée de marbre',
   pieces: 4, surface: 96, prix: 1180000, secteur: 'étage élevé'},
  {photo: '7c524161-6c2c-4d63-be4c-f447534ac8ed.png', sujet: 'maison périgourdine, mur de pierre sèche, olivier',
   pieces: 4, surface: 108, prix: 318000, secteur: 'proche village'},
  {photo: '86939b6e-9e86-4bfc-b4d9-97d499b745bc.png', sujet: 'fermette de pierre, volets gris, pommier, dépendance',
   pieces: 7, surface: 192, prix: 452000, secteur: 'corps de ferme'},
  {photo: 'a05f385a-d7b1-4c55-b930-3ce25d6e683d.png', sujet: 'double séjour haussmannien, parquet à bâtons rompus',
   pieces: 5, surface: 124, prix: 1495000, secteur: 'double séjour'},
  {photo: 'a8e09ead-254a-4f51-aaba-dbe0853dc3af.png', sujet: 'demeure de brique, volets vert foncé, allée de gravier',
   pieces: 9, surface: 285, prix: 1150000, secteur: 'parc arboré'},
  {photo: 'ac8b821a-d373-4804-9cf4-a96fd5f131a4.png', sujet: 'maison de brique rouge, bow-windows, allée pavée',
   pieces: 5, surface: 138, prix: 545000, secteur: 'impasse'},
  {photo: 'b650b7b2-d103-44ae-9e14-1255da56d00e.png', sujet: 'cuisine ouverte, îlot central, électroménager intégré',
   pieces: 6, surface: 152, prix: 489000, secteur: 'cuisine équipée'},
  {photo: 'c1b068bf-9a8e-47bf-91c9-a112e7a8ec78.png', sujet: 'bureau, fenêtre parisienne, parquet clair',
   pieces: 3, surface: 72, prix: 742000, secteur: 'dernier étage'},
  {photo: 'c682e30a-c00e-4b76-b4d8-412349de25e8.png', sujet: 'pavillon à enduit clair, volets gris, garage',
   pieces: 6, surface: 158, prix: 685000, secteur: 'jardin clos'},
];

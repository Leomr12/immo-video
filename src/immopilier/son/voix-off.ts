/**
 * La voix off, une réplique par entrée.
 *
 * Les images de départ sont celles de `dossier-immopilier/sous-titres.srt`,
 * relevées une fois et non ressaisies : le sous-titrage et la voix partent donc
 * exactement ensemble, et la version verticale — celle qui se regarde sans le
 * son — reste calée sur la version sonore.
 *
 * `fichier` vaut `null` tant que la réplique n'est pas enregistrée. Une réplique
 * par fichier plutôt qu'une bande unique : on peut refaire une phrase sans tout
 * réenregistrer, et chacune se recale à l'image près sans qu'on touche aux
 * autres.
 *
 * Les fichiers vont dans `public/son/voix/`, et `fichier` porte le nom, par
 * exemple `'vo-01.mp3'`.
 */
export type Replique = {
  /** Numéro de la réplique, celui du fichier .srt. */
  readonly n: number;
  /** Image à laquelle la réplique démarre dans le film. */
  readonly debut: number;
  /** Le texte dit, pour l'enregistrement et la relecture. */
  readonly texte: string;
  /** Nom du fichier dans `public/son/voix/`, ou `null` si pas encore enregistré. */
  readonly fichier: string | null;
};

export const VOIX_OFF: Replique[] = [
  {n: 1, debut: 0, texte: "Une annonce qui te plaît.", fichier: null},
  {n: 2, debut: 144, texte: "Et toi, tu cherchais l'adresse à la main ?", fichier: null},
  {n: 3, debut: 372, texte: "Parce qu'une annonce ne dit jamais où elle est.", fichier: null},
  {n: 4, debut: 510, texte: "Trouver l'adresse. Situer la parcelle.", fichier: null},
  {n: 5, debut: 630, texte: "Comparer les ventes réelles. Lire le quartier. Décider.", fichier: null},
  {n: 6, debut: 750, texte: "Multiplie ça par vingt annonces dans la semaine.", fichier: null},
  {n: 7, debut: 949, texte: "Et tu n'as toujours aucun repère de prix.", fichier: null},
  {n: 8, debut: 1087, texte: "Immopilier. Tu colles le lien de l'annonce.", fichier: null},
  {n: 9, debut: 1344, texte: "Il te rend l'adresse exacte, sur la carte, à la parcelle.", fichier: null},
  {n: 10, debut: 1500, texte: "Simple, non ?", fichier: null},
  {n: 11, debut: 1691, texte: "Le prix au m², rue par rue, sur les ventes réellement signées.", fichier: null},
  {n: 12, debut: 1871, texte: "Et l'adresse, elle, raconte tout le reste.", fichier: null},
  {n: 13, debut: 1967, texte: "La parcelle, le bâtiment, le DPE, les risques, le règlement d'urbanisme.", fichier: null},
  {n: 14, debut: 2117, texte: "Tout vient des bases publiques de l'État. Rien n'est estimé.", fichier: null},
  {n: 15, debut: 2302, texte: "Les communes autour, comparées au même mètre carré.", fichier: null},
  {n: 16, debut: 2460, texte: "De quarante annonces, il t'en reste trois.", fichier: null},
  {n: 17, debut: 2610, texte: "Celle qui est sous le prix du quartier. Et celle qui ne l'est pas.", fichier: null},
  {n: 18, debut: 2880, texte: "Demande-lui ce que tu veux : il répond avec les chiffres de la commune.", fichier: null},
  {n: 19, debut: 3180, texte: "Six bases publiques. Cinq millésimes de ventes. Toute la France.", fichier: null},
  {n: 20, debut: 3390, texte: "Tu ne compares plus des annonces.", fichier: null},
  {n: 21, debut: 3516, texte: "Tu compares des adresses.", fichier: null},
  {n: 22, debut: 3660, texte: "Colle ta première annonce, et vois où elle est vraiment.", fichier: null},
];

/**
 * La voix off, une réplique par entrée.
 *
 * Le conducteur est celui du commanditaire : douze répliques, vouvoiement, avec
 * leurs timecodes. `debut` est ce timecode converti en images à 60 fps.
 *
 * `fichier` vaut `null` tant que la réplique n'est pas enregistrée. Une réplique
 * par fichier plutôt qu'une bande unique : on refait une phrase sans toucher aux
 * autres, et chacune se recale à l'image près.
 *
 * Les fichiers sont dans `public/son/voix/`, numérotés dans l'ordre du
 * conducteur. Les sept premiers viennent des prises ElevenLabs livrées, remises
 * dans l'ordre par l'heure inscrite dans leur nom — la plus ancienne d'abord.
 *
 * ⟦ Les répliques 8 à 12 manquent encore. ⟧
 */
export type Replique = {
  /** Numéro de la réplique au conducteur. */
  readonly n: number;
  /** Image à laquelle la réplique démarre dans le film. */
  readonly debut: number;
  /** Le timecode du conducteur, pour relire le calage sans convertir. */
  readonly timecode: string;
  /** Le texte dit, pour l'enregistrement et la relecture. */
  readonly texte: string;
  /** Nom du fichier dans `public/son/voix/`, ou `null` si pas encore enregistré. */
  readonly fichier: string | null;
  /**
   * Durée de la prise, en images. Relevée sur le fichier.
   *
   * Elle sert à l'esquive de la musique : sans elle, il faudrait baisser jusqu'à
   * la réplique suivante, et comme les répliques durent trois secondes pour des
   * créneaux de six, la musique resterait basse pendant tout le film.
   */
  readonly duree: number | null;
};

export const VOIX_OFF: Replique[] = [
  {n: 1, debut: 0, timecode: '0:00', fichier: 'vo-01.mp3', duree: 190,
   texte: 'Une annonce vous plaît. Mais où se trouve vraiment ce bien ?'},
  {n: 2, debut: 360, timecode: '0:06', fichier: 'vo-02.mp3', duree: 202,
   texte: "Les annonces ne donnent ni l'adresse exacte, ni le contexte."},
  {n: 3, debut: 720, timecode: '0:12', fichier: 'vo-03.mp3', duree: 180,
   texte: 'Difficile, dans ces conditions, de savoir si le prix est juste.'},
  {n: 4, debut: 1080, timecode: '0:18', fichier: 'vo-04.mp3', duree: 166,
   texte: "Avec Immopilier, collez simplement le lien de l'annonce."},
  {n: 5, debut: 1260, timecode: '0:21', fichier: 'vo-05.mp3', duree: 175,
   texte: 'Le bien est localisé : adresse, parcelle, surface.'},
  {n: 6, debut: 1620, timecode: '0:27', fichier: 'vo-06.mp3', duree: 308,
   texte: 'Vous accédez aux informations clés : année de construction, emprise au sol, performance énergétique.'},
  {n: 7, debut: 2160, timecode: '0:36', fichier: 'vo-07.mp3', duree: 222,
   texte: 'Le marché local est analysé à partir des ventes réelles, commune par commune.'},
  {n: 8, debut: 2520, timecode: '0:42', fichier: null, duree: null,
   texte: 'Parmi des dizaines de transactions, Immopilier retient les biens les plus comparables.'},
  {n: 9, debut: 2880, timecode: '0:48', fichier: null, duree: null,
   texte: "Et pour aller plus loin, posez vos questions directement à l'agent IA."},
  {n: 10, debut: 3240, timecode: '0:54', fichier: null, duree: null,
   texte: 'Des données publiques et officielles, partout en France.'},
  // ⟦ Le texte à l'écran du plan 22 a changé — « Immopilier, votre copilote pour
  //   accéder à l'intelligence immobilière française. » La voix, elle, reste
  //   celle du conducteur. À arbitrer avant d'enregistrer cette réplique. ⟧
  {n: 11, debut: 3420, timecode: '0:57', fichier: null, duree: null,
   texte: 'Vous ne comparez plus des annonces. Vous comparez des faits.'},
  {n: 12, debut: 3780, timecode: '1:03', fichier: null, duree: null,
   texte: 'Immopilier. Analysez votre première annonce sur immopilier.com.'},
];

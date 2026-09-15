# Photos d'annonces — plan 6

Ce dossier est **vide**, et les vignettes du plan 6 affichent pour l'instant un
aplat sourd à la place de la photo.

Pour les brancher : déposer les fichiers ici — n'importe quel format, n'importe
quelle taille, le cadrage est en `object-fit: cover` — puis écrire leur nom dans
`src/immopilier/annonces.ts`, colonne `photo` :

```ts
{photo: 'pavillon.jpg', pieces: 6, surface: 165, prix: 749000, secteur: 'proche gare'},
```

Les vingt annonces ont déjà leur prix, leur surface et leur nombre de pièces,
calés sur cinq biens distincts. Les voici, dans l'ordre où ils apparaissent dans
`annonces.ts` :

| Bien | Ce que montre la photo attendue |
|---|---|
| 1 | pavillon à enduit clair, volets gris, toit de tuiles |
| 2 | maison de brique rouge, bow-windows, allée pavée |
| 3 | grande demeure de brique, volets vert foncé, allée de gravier |
| 4 | maison de pierre blonde, volets gris, mur de pierre sèche |
| 5 | intérieur, murs de pierre, poutres, cheminée |

Chaque bien revient quatre fois dans la pile, avec à chaque fois un prix, une
surface et un nombre de pièces différents.

Rappel du dossier : aucune capture d'un site d'annonces réel, aucun logo de
portail, aucun visage identifiable.

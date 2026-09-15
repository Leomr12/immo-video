# Photos d'annonces — plan 6

Treize photos, treize annonces, **jamais deux fois la même**. Chaque fichier est
rattaché à son annonce dans `src/immopilier/annonces.ts`, où le champ `sujet`
rappelle ce que montre l'image.

⟦ Les prix, surfaces et nombres de pièces sont **estimés d'après la photo** —
type de bien, état, standing du quartier qu'on devine. Ils sont cohérents entre
eux et avec leur marché supposé, mais ce ne sont pas des prix relevés. Le dossier
interdit tout chiffre non vérifié à l'écran : à confirmer avant diffusion, ou à
remplacer par de vraies annonces. ⟧

Pour changer une photo : déposer le fichier ici et corriger son nom dans
`annonces.ts`. Le cadrage est en `object-fit: cover`, n'importe quel format
passe. Pour en ajouter une, ajouter une ligne — la mise en page répartit les
vignettes sur trois rangées et s'ajuste toute seule.

Rappel du dossier : aucune capture d'un site d'annonces réel, aucun logo de
portail, aucun visage identifiable.

# Immopilier — « Géolocalise, analyse, décide »

Film de 67,5 s monté avec [Remotion](https://remotion.dev).
**1920 × 1080 · 60 fps · 4050 images · 24 plans · cinq actes.**

Le conducteur, la charte, les polices et les logos sont dans
[`dossier-immopilier/`](dossier-immopilier/), versionnés tels qu'ils ont été
fournis. Le script (`dossier-immopilier/SCRIPT-VIDEO.md`) fait foi : image,
mouvement, texte à l'écran et voix off, plan par plan.

## Lancer

```bash
npm install
npm run dev        # ouvre Remotion Studio
```

Compositions enregistrées :

| Id | Contenu |
|---|---|
| `Immopilier` | le film complet, 4050 images |
| `Acte-I` … `Acte-V` | un acte seul |
| `Acte-I / Plan-01-Radar` … `Acte-V / Plan-24-Bouton` | chacun des 24 plans seul, à sa durée du script |

Un plan vu seul garde le fond qu'il aura au montage : `<PlanSeul>` avance
l'horloge du fond continu jusqu'à l'image où le plan commence.

## Rendre

```bash
npx remotion render Immopilier out/immopilier-67s-1080p.mp4
```

## Avancement

Les cinq actes sont montés, soit les 24 plans du script.

| Acte | Plans | Timecode |
|---|---|---|
| I. L'accroche | 1–4 | 0,0 → 8,5 s |
| II. Le coût du flou | 5–7 | 8,5 → 18,1 s |
| III. Le produit | 8–19 | 18,1 → 50,9 s |
| IV. La preuve | 20–22 | 50,9 → 61,0 s |
| V. L'appel | 23–24 | 61,0 → 67,5 s |

La musique, les bruitages et les photos d'annonces sont en place, et sept des
douze répliques de voix off sont calées — voir [SON.md](SON.md). Restent à
faire : les cinq dernières répliques, puis les trois recadrages livrables.

## Comment le code est organisé

```
src/immopilier/
  minutage.ts          les 24 plans, bornés à l'image près
  bien.ts              le bien de démonstration et son quartier — source unique
  annonces.ts          les vingt annonces du plan 6
  charte.ts            les jetons de la charte + les suites de couleurs
  fonts.ts             Geist et Geist Mono, chargés depuis public/polices/
  composants/          Fond, TypoCinetique, CarteFrance, Boussole, Halo…
  plans/               un fichier par plan
  son/                 voix off, bruitages, musique — voir SON.md
  geo/france.ts        généré par tools/prep-france.mjs
```

**Le fond est une couche unique** qui traverse les 4050 images
(`composants/Fond.tsx`). Les bascules clair ↔ sombre du script sont donc des
changements de couleur en 400 ms, jamais des changements de plan.

**Les raccords sont des mouvements de caméra, pas des coupes.** Chaque plan
déborde de quelques images sur le suivant et sa dernière valeur de caméra est la
première du plan d'après — le plan 1 s'achève sur un zoom de 1,06, le plan 2 le
reprend à 1,06. C'est pour cela qu'on n'utilise pas `<TransitionSeries>`, qui
raccourcirait la frise et décalerait tous les timecodes du script.

**La typographie est cinétique, mot à mot** (`composants/TypoCinetique.tsx`) :
un mot toutes les 60 ms, ressort suramorti — la détente d'un spring, jamais le
dépassement, comme l'impose la charte (« Rien n'entre par le bas en
rebondissant »). L'accent ne change que la couleur, jamais la graisse.

**La carte de France** (plans 1 et 20) est une géométrie figée, pas une carte à
tuiles : Natural Earth 1:50m projetée en conique conforme 44°/49°, précalculée
par `tools/prep-france.mjs` en un tracé SVG et 150 points de vente déterministes.
Le rendu ne dépend donc d'aucune clé d'API ni d'aucun réseau, et deux rendus
donnent exactement la même image. Pour la régénérer :

```bash
node tools/prep-france.mjs
```

## Ce qui reste à trancher avant diffusion

Repris du dossier, à ne pas oublier :

- **Les chiffres marqués ⟦à confirmer⟧** au script — « 34 935 communes couvertes »
  aux plans 14 et 21 — sont à recompter avant le montage. À défaut, on retire le
  chiffre et on garde la phrase.
- **Le bien de démonstration et son quartier** — 18 rue Servan, 75011 Paris —
  sont **fictifs** : adresse, référence de parcelle, prix, médiane et écart sont
  cohérents entre eux mais non vérifiés. Idem pour les prix des huit communes
  limitrophes du plan 15 : les communes sont réelles, les prix sont des valeurs
  d'attente. Le dossier interdit tout chiffre non vérifié à l'écran — remplacer
  par un relevé DVF réel avant diffusion. Tout est dans `src/immopilier/bien.ts`,
  un seul fichier.
- **Les prix des treize annonces du plan 6 sont estimés d'après leur photo**, pas
  relevés. Voir `public/annonces/_photos.md`.
- **Le lien leboncoin du plan 8** nomme un portail réel, ce que le dossier
  proscrivait. C'est un choix assumé du commanditaire ; l'annonce pointée
  n'existe pas et aucune capture du site n'apparaît à l'image.
- Aucune capture d'un site d'annonces réel, aucun logo de portail, aucun visage
  identifiable : les annonces des plans 6 et 8 sont fictives.
- La musique n'est pas fournie. Piste libre de droits, 100–110 BPM, sans voix,
  licence vérifiée même pour une diffusion organique.

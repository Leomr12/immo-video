# Immopilier — charte pour la vidéo

Tout ce qui suit est extrait du site lui-même, pas reconstitué de mémoire :
les couleurs viennent de `assets/css/tokens/colors.css`, les polices de
`assets/css/tokens/fonts.css`, les logos de `assets/img/`.

---

## 1. Couleurs

L'identité est **monochrome avec un seul accent**. Le bleu ne sert qu'à désigner :
un mot qui compte, une donnée, une action. Un plan où tout est bleu est un plan raté.

### Fonds

| Rôle | Clair | Sombre |
|---|---|---|
| Fond principal | `#ffffff` | `#0a0a0c` |
| Fond atténué | `#f6f6f8` | `#0f0f12` |
| Surface (cartes, fenêtres) | `#ffffff` | `#121216` |
| Surface surélevée | `#ffffff` | `#17171c` |

### Texte

| Rôle | Clair | Sombre |
|---|---|---|
| Texte principal | `#121216` | `#f6f6f8` |
| Texte secondaire | `#4d4d57` | `#b3b3bc` |
| Texte atténué | `#6a6a75` | `#8b8b96` |

### Accent — le bleu Immopilier

| Jeton | Valeur | Emploi en vidéo |
|---|---|---|
| `--accent-50` | `#eef1ff` | halos, arcs de fond sur blanc |
| `--accent-200` | `#b9c6ff` | dégradés, entonnoir, mailles basses |
| `--accent-400` | `#6e88f7` | **mots accentués sur fond sombre** |
| `--accent-500` | `#4a6bf2` | points de carte, radar |
| `--accent-600` | `#2e4fe6` | **mots accentués sur fond clair, boutons** |
| `--accent-700` | `#2340bd` | bouton enfoncé, ombre du bouton |

### Échelle des prix (carte de chaleur, plan 11)

Du moins cher au plus cher — l'ordre est imposé, il correspond à la légende du produit :

`#e0e7ff` · `#c7d2fe` · `#a5b4fc` · `#818cf8` · `#fbbf24` · `#f59e0b` · `#ef4444` · `#b91c1c`

### Étiquette DPE (plan 13)

Les sept couleurs officielles, **lettres toujours blanches** comme sur le site :

`A #319a68` · `B #5fb15a` · `C #a9c94f` · `D #f3dc2a` · `E #efa33d` · `F #e5652c` · `G #d22f27`

### Sémantique

`succès #128a5c` · `alerte #a8620a` · `danger #b3261e`
En vidéo, le `✗` du plan 17 utilise le danger, le `✓` utilise l'accent — jamais le vert :
le vert n'appartient pas à l'identité, il n'existe que pour les états de formulaire.

---

## 2. Typographie

Trois familles, toutes libres, toutes fournies dans `polices/` en `.ttf` :

| Rôle | Police | Emploi en vidéo |
|---|---|---|
| Interface et titres cinétiques | **Geist** 300 / 400 / 500 / 600 / 700 | toute la typographie animée, les chiffres, les fiches |
| Éditorial | **Instrument Serif** régulier et italique | à réserver ; aucun plan ne l'utilise dans ce script |
| Données brutes | **Geist Mono** 400 / 500 | références de parcelle, identifiants, URL |

### Réglages repris du site

- **Titres cinétiques** : Geist 600, interlettrage `-0,02 em`, interligne 1,05.
- **Mot accentué** : même graisse, seule la couleur change. Jamais de gras supplémentaire.
- **Chiffres** : Geist 600 avec chiffres tabulaires (`font-variant-numeric: tabular-nums`),
  indispensable pour que les compteurs ne tressautent pas pendant l'incrémentation.
- **Espace insécable avant `€`, `%`, `?` et `!`** — règle française, à respecter dans
  chaque calque de texte : `249 000 €`, `−6 %`, `Simple, non ?`.
- **Séparateur de milliers** : espace fine insécable, pas de virgule.
  On écrit `34 935`, jamais `34,935` — c'est l'une des rares choses que le modèle
  fait à l'anglaise et qu'il ne faut pas copier.

---

## 3. Logos

`logos/` contient les SVG (nettoyés de leurs métadonnées) et `logos/png/` les exports
transparents rendus avec la vraie police.

| Fichier | Usage |
|---|---|
| `logo-light.svg` / `logo-light-2048.png` | sur fond clair — c'est le logo du plan 24 |
| `logo-dark.svg` / `logo-dark-2048.png` | sur fond sombre |
| `logo-accent.svg` / `logo-accent-2048.png` | usage décoratif, un seul plan maximum |
| `logo-symbol-*.svg` | l'épingle seule, pour le plan 8 et les formats carrés |
| `favicon.svg` | interface uniquement, pas pour la vidéo |

**Règles** — Zone de protection : la hauteur de l'épingle sur les quatre côtés.
Taille minimale à l'écran : 180 px de large en 1080p. Ne jamais l'étirer, le recolorer
hors des trois variantes fournies, l'inscrire dans une pastille, ni séparer l'épingle
du mot dans un même plan.

Le mot « Immopilier » s'écrit avec **un seul p et un seul l majuscule initiale** :
`Immopilier`. Pas `ImmoPilier`, pas `IMMOPILIER`.

---

## 4. Mouvement

Repris des jetons de mouvement du site (`tokens/motion.css`) :

| Usage | Durée | Courbe |
|---|---|---|
| Apparition d'un mot | 180 ms | `cubic-bezier(.2,.8,.2,1)` |
| Entrée d'une carte / fiche | 240 ms | `cubic-bezier(.2,.8,.2,1)` |
| Bascule de fond clair ↔ sombre | 400 ms | `cubic-bezier(.4,0,.2,1)` |
| Zoom de carte | 2 600 ms | `ease-in-out` |
| Inclinaison 2D → 3D | 600 ms | `ease-out` |

**Principe** — Rien n'entre par le bas en rebondissant. Tout monte de 12 px en se
défloutant. C'est la signature du modèle et elle convient : sobre, rapide, nette.

---

## 5. Musique et sons

Le modèle tient sur une nappe électronique continue, un *build* de 8 s avant la marque,
et trois bruitages : le *tick* du radar, le *ding* de validation, le *clic* final.
Chercher une piste **libre de droits, tempo 100–110, sans voix**, et couper exactement
sur 67,5 s avec un fondu de 400 ms.

⟦ Prévoir la licence de la piste avant diffusion, y compris pour une diffusion organique. ⟧

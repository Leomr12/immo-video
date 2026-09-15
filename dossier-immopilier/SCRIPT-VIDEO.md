# Immopilier — script vidéo « Géolocalise, analyse, décide »

**Format** 1920 × 1080, 60 fps · **Durée** 67,5 s (2 h 10 de montage estimées)
**Ton** tutoiement, phrases courtes, une idée par plan
**Structure** identique au modèle fourni : accroche blanche → problème sombre → produit → preuve → appel à l'action sur fond blanc

---

## Comment lire ce document

Chaque plan donne : le **timecode**, l'**image**, le **mouvement**, le **texte à l'écran**
(typographie cinétique, mot par mot) et la **voix off**. Le texte à l'écran n'est jamais
une redite molle de la voix : il n'en porte que les mots qui frappent, exactement comme
dans le modèle, où un mot sur cinq passe en bleu.

Les repères `⟦…⟧` signalent ce qui doit être vérifié ou fourni avant le tournage.

---

## Plan de la vidéo

| Acte | Plans | Durée | Fond | Ce qui se joue |
|---|---|---|---|---|
| I. L'accroche | 1–4 | 0,0 → 8,5 s | blanc puis sombre | Une annonce ne dit jamais où elle est |
| II. Le coût du flou | 5–7 | 8,5 → 18,1 s | sombre | Cinq étapes à la main, vingt fois par semaine |
| III. Le produit | 8–19 | 18,1 → 50,9 s | blanc ↔ sombre | Le lien collé, l'adresse, la carte, la fiche, l'agent |
| IV. La preuve | 20–22 | 50,9 → 61,0 s | sombre | D'où viennent les chiffres |
| V. L'appel | 23–24 | 61,0 → 67,5 s | blanc | Colle ta première annonce |

---

## Acte I — L'accroche

### Plan 1 · 00,00 → 02,40 (2,4 s) · fond blanc

**Image** — Une carte de France très épurée, en aplat `--n-50`, vue de dessus. Un balayage
radar bleu `--accent-500` tourne depuis le centre ; à chaque passage, des points bleus
s'allument puis s'estompent : ce sont des ventes publiées.
**Mouvement** — Le radar fait un tour complet en 2,4 s. Les points apparaissent en `scale`
de 0 → 1 sur 200 ms, courbe `cubic-bezier(.2,.8,.2,1)`.
**Texte à l'écran** — aucun.
**Voix off** — « Une annonce qui te plaît. »
**Son** — nappe grave qui monte, un *tick* discret à chaque point allumé.

### Plan 2 · 02,40 → 04,60 (2,2 s) · fond blanc

**Image** — Le radar se resserre et devient une **boussole de carte** ; l'aiguille tourne
sans se fixer. Typographie cinétique en haut de cadre.
**Mouvement** — Chaque mot arrive à 60 ms d'intervalle, `translateY(12px)` + `blur(6px)` → net.
**Texte à l'écran** — `tu cherchais l'adresse` **`à la main`** ` ?`
→ « à la main » en `--accent-600`, le reste en `--n-950`.
**Voix off** — « Et toi, tu cherchais l'adresse à la main ? »

### Plan 3 · 04,60 → 06,20 (1,6 s) · fond blanc → sombre

**Image** — Tout le plan 2 se réduit dans une fenêtre de navigateur (barre à trois pastilles),
qui recule et se fige comme une vidéo en pause.
**Mouvement** — `scale` 1 → 0,42 en 700 ms, puis bascule du fond vers `--color-bg` sombre.
**Texte à l'écran** — la phrase du plan 2, figée dans la fenêtre.
**Voix off** — aucune. Respiration.
**Son** — un *clac* de pause, puis silence.

### Plan 4 · 06,20 → 08,50 (2,3 s) · fond sombre

**Image** — Noir `#0a0a0c`, halo bleu diffus au ras du bord bas, comme dans le modèle.
Deux lignes qui se succèdent au centre.
**Texte à l'écran** —
1. `Parce qu'une annonce ne dit jamais` (0,0 → 1,1 s)
2. `où elle` **`est`** (1,1 → 2,3 s) — « est » en `--accent-400`
**Voix off** — « Parce qu'une annonce ne dit jamais où elle est. »

---

## Acte II — Le coût du flou

### Plan 5 · 08,50 → 12,50 (4,0 s) · fond sombre

**Image** — Le chemin sinueux du modèle, tracé en blanc, qui relie cinq jalons numérotés.
Chaque jalon : un carré arrondi bleu en relief, halo doux, icône blanche.

| № | Icône | Libellé |
|---|---|---|
| 1 | `link` | Trouver l'adresse |
| 2 | `scan-line` | Situer la parcelle |
| 3 | `trending-up` | Comparer les ventes |
| 4 | `map-pin` | Lire le quartier |
| 5 | `check-circle` | Décider |

**Mouvement** — Le tracé se dessine de gauche à droite (`stroke-dashoffset`), la caméra
suit en travelling latéral ; chaque jalon éclot 80 ms avant que le trait ne l'atteigne.
Les grands chiffres 1 à 5 défilent en fond, en `--n-800`, très gros.
**Voix off** — « Trouver l'adresse. Situer la parcelle. Comparer les ventes réelles.
Lire le quartier. Décider. »

### Plan 6 · 12,50 → 15,82 (3,3 s) · fond sombre

**Image** — Des vignettes d'annonces s'empilent et remplissent le cadre, en perspective,
exactement comme le nuage de cartes de visite du modèle. Chaque vignette porte :
photo floutée, `3 pièces · 92 m²`, `249 000 €`, `secteur recherché`.
⟦ Vignettes **génériques** : aucun logo de portail, aucune capture d'un site tiers. ⟧
**Mouvement** — Arrivées en cascade, 6 vignettes/seconde, légère rotation aléatoire ±8°.
La caméra recule pour les contenir toutes.
**Voix off** — « Multiplie ça par vingt annonces dans la semaine. »

### Plan 7 · 15,82 → 18,12 (2,3 s) · fond sombre

**Image** — Un grand dossier bleu se pose au premier plan et s'ouvre : il est vide.
Deux ou trois mouches en sortent — le clin d'œil du modèle, gardé tel quel.
**Texte à l'écran** — `et tu n'as toujours` **`aucun repère`** (« aucun repère » en `--accent-400`)
**Voix off** — « Et tu n'as toujours aucun repère de prix. »

---

## Acte III — Le produit

### Plan 8 · 18,12 → 22,40 (4,3 s) · fond blanc

**Image** — Bascule franche vers le blanc. Le **symbole Immopilier** (l'épingle-maison)
apparaît au centre dans un halo bleu concentrique qui pulse deux fois, puis le mot
« Immopilier » se déplie à sa droite.
Puis, sous le logo, un champ de recherche : une URL d'annonce s'y colle caractère par
caractère, un `✓` bleu s'allume au bout.
⟦ URL fictive : `https://annonces.exemple.fr/vente/maison-92m2-33220` ⟧
**Mouvement** — Halo : deux ondes de `scale` 0,8 → 1,6 avec `opacity` 0,35 → 0.
Frappe de l'URL : 28 caractères/seconde.
**Voix off** — « Immopilier. Tu colles le lien de l'annonce. »
**Son** — un souffle montant, puis un *ding* propre sur le `✓`.

### Plan 9 · 22,40 → 26,80 (4,4 s) · fond blanc

**Image** — La carte prend tout le cadre et zoome d'un plan large de la commune jusqu'à la
parcelle. Le point se pose, la parcelle s'allume en bleu translucide, un encart apparaît :

> **7 Lotissement du Haut Terrier**
> 33220 Saint-Avit-Saint-Nazaire
> Parcelle `333780000D1121` · 1 042 m²

Puis, plein cadre : `Simple,` `✓` `non ?` avec un curseur qui vient cliquer sur le `✓`.
**Mouvement** — Zoom carte du z 11 au z 18 en 2,6 s, `ease-in-out`. L'encart glisse
depuis le bas en 240 ms.
**Voix off** — « Il te rend l'adresse exacte. Sur la carte, à la parcelle. Simple, non ? »

### Plan 10 · 26,80 → 28,18 (1,4 s) · fond sombre

**Image** — Trois tuiles de statistiques flottent sur fond sombre, comme le tableau de bord
du modèle : `Prix médian 1 854 €/m²` · `Ventes retenues 162` · `Écart au quartier −6 %`
**Mouvement** — Les chiffres montent en compteur sur 900 ms.
**Voix off** — aucune. Le son porte.

### Plan 11 · 28,18 → 31,18 (3,0 s) · fond sombre

**Image** — La carte des prix : des mailles de 200 m colorées du bleu pâle au rouge,
qui se soulèvent en 3D quand la caméra s'incline.
**Mouvement** — Inclinaison 0° → 55°, rotation −18°, les mailles s'extrudent en cascade
depuis le centre de l'écran.
**Texte à l'écran** — en bas à gauche, la légende réelle du produit : `Prix au m² — médiane
par maille de 200 m · 2020–2024`
**Voix off** — « Le prix au m², rue par rue, sur les ventes réellement signées. »

### Plan 12 · 31,18 → 32,78 (1,6 s) · fond sombre

**Image** — La fiche adresse se déroule verticalement, très vite, comme un long document
qu'on fait défiler.
**Mouvement** — Défilement rapide puis arrêt net, avec un léger rebond.
**Voix off** — « Et l'adresse, elle, raconte tout le reste. »

### Plan 13 · 32,78 → 35,28 (2,5 s) · fond sombre

**Image** — Quatre blocs de la fiche viennent au premier plan l'un après l'autre :
la **parcelle** et sa contenance, le **bâtiment** (année, emprise au sol, niveaux),
l'**étiquette DPE** (barres A→G, lettres blanches), les **risques** et le **PLU**.
**Mouvement** — Chaque bloc entre en `translateZ`, reste 500 ms, sort par le haut.
**Voix off** — « La parcelle, le bâtiment, le DPE, les risques, le règlement d'urbanisme. »

### Plan 14 · 35,28 → 38,37 (3,1 s) · fond sombre

**Image** — Trois compteurs qui s'incrémentent sur fond sombre, superposés à une fiche
en arrière-plan flouté :
`Ventes publiques analysées 1 284` · `Communes couvertes 34 935` ⟦à confirmer⟧ ·
`Millésimes 2020 → 2024`
**Voix off** — « Tout vient des bases publiques de l'État. Rien n'est estimé. »

### Plan 15 · 38,37 → 41,00 (2,6 s) · fond blanc

**Image** — Bascule au blanc. Une couronne de communes tourne autour du point central,
chacune avec son prix au m² : `Sainte-Foy-la-Grande 1 490 €` · `Port-Sainte-Foy 1 720 €` …
**Mouvement** — Rotation lente de la couronne, 30°/seconde.
**Voix off** — « Les communes autour, comparées au même mètre carré. »

### Plan 16 · 41,00 → 43,50 (2,5 s) · fond blanc

**Image** — L'entonnoir du modèle, en bleu dégradé : quarante vignettes d'annonces entrent
par la gauche, trois ressortent à droite.
**Mouvement** — Les vignettes accélèrent dans le goulot, les recalées se dissolvent.
**Texte à l'écran** — `40` → `3` en gros chiffres, de part et d'autre de l'entonnoir.
**Voix off** — « De quarante annonces, il t'en reste trois. »

### Plan 17 · 43,50 → 46,53 (3,0 s) · fond blanc

**Image** — Une fenêtre de navigateur, deux biens côte à côte. Un `✗` rouge sur l'un,
un `✓` bleu sur l'autre.
**Texte à l'écran** — sous chaque bien : `2 707 €/m² · −6 % sous le quartier` ·
`3 210 €/m² · +12 % au-dessus`
**Voix off** — « Celle qui est sous le prix du quartier. Et celle qui ne l'est pas. »

### Plan 18 · 46,53 → 48,00 (1,5 s) · fond sombre

**Image** — Une fiche récapitulative, seule au centre, façon carte de visite du modèle :

| | |
|---|---|
| Surface | 92 m² |
| Prix affiché | 249 000 € |
| Prix au m² | 2 707 € |
| Médiane du quartier | 2 880 € |
| Écart | −6 % |

**Voix off** — aucune.

### Plan 19 · 48,00 → 50,93 (2,9 s) · fond sombre

**Image** — Deux bulles de conversation, comme le modèle : la question de l'utilisateur en
bleu, la réponse de l'agent en blanc.
> — « Ce bien est-il au bon prix ? »
> — « 6 % sous la médiane du quartier, sur 162 ventes retenues depuis 2020. »

**Mouvement** — La réponse s'écrit mot à mot, curseur clignotant.
**Voix off** — « Demande-lui ce que tu veux : il répond avec les chiffres de la commune. »

---

## Acte IV — La preuve

### Plan 20 · 50,93 → 53,00 (2,1 s) · fond sombre

**Image** — La carte se remplit de points, vue de haut, la France entière s'allume comme
une constellation.
**Mouvement** — Dézoom continu, les points s'agglomèrent.
**Voix off** — aucune. Montée musicale.

### Plan 21 · 53,00 → 56,50 (3,5 s) · fond sombre

**Image** — Trois chiffres qui s'enchaînent en très gros, avec le halo bleu du modèle :
`6` bases publiques → `5` millésimes de ventes → `34 935` communes ⟦à confirmer⟧.
En dessous, en petit, la ligne des sources : `DVF · Cadastre · BAN · IGN · INSEE · ADEME`.
**Voix off** — « Six bases publiques. Cinq millésimes de ventes. Toute la France. »

### Plan 22 · 56,50 → 61,00 (4,5 s) · fond sombre

**Image** — Typographie seule, sur le halo bleu.
**Texte à l'écran** —
1. `des décisions prises sur` **`des faits`** (56,5 → 58,6 s)
2. `pas sur` (58,6 → 59,6 s)
3. `pas sur une` **`impression`** `.` (59,6 → 61,0 s)
**Voix off** — « Des décisions prises sur des faits. Pas sur une impression. »

---

## Acte V — L'appel à l'action

### Plan 23 · 61,00 → 64,00 (3,0 s) · fond blanc

**Image** — Retour au blanc, arcs bleu pâle en haut et en bas de cadre comme dans le modèle.
**Texte à l'écran** —
1. **`Colle`** ` ta première annonce` (61,0 → 62,0 s)
2. `et vois où elle est` (62,0 → 63,0 s)
3. `et vois où elle est` **`vraiment`** `.` (63,0 → 64,0 s)
**Voix off** — « Colle ta première annonce, et vois où elle est vraiment. »

### Plan 24 · 64,00 → 67,50 (3,5 s) · fond blanc

**Image** — Le logo **Immopilier** au centre (`logos/png/logo-light-2048.png`).
Sous lui, le bouton bleu `--accent-600`, coins arrondis 999 px, ombre douce :
**`Géolocaliser une annonce`** précédé de l'icône `map-pin`.
Un curseur entre par la droite, se pose sur le bouton, le bouton s'enfonce de 1 px.
En bas, en `--n-600`, très discret : `immobilier.topbusiness.fr`
**Mouvement** — Logo : `scale` 0,96 → 1 + `opacity` 0 → 1 en 400 ms. Bouton : 200 ms plus tard.
Curseur : arrivée en 600 ms, clic à 66,4 s. Fondu au blanc sur les 3 dernières images.
**Voix off** — aucune.
**Son** — un dernier accord, puis un *clic* de souris net.

---

## Voix off, d'un seul tenant

> Une annonce qui te plaît. Et toi, tu cherchais l'adresse à la main ?
> Parce qu'une annonce ne dit jamais où elle est.
> Trouver l'adresse. Situer la parcelle. Comparer les ventes réelles. Lire le quartier. Décider.
> Multiplie ça par vingt annonces dans la semaine. Et tu n'as toujours aucun repère de prix.
> Immopilier. Tu colles le lien de l'annonce. Il te rend l'adresse exacte, sur la carte, à la parcelle. Simple, non ?
> Le prix au m², rue par rue, sur les ventes réellement signées. Et l'adresse, elle, raconte tout le reste :
> la parcelle, le bâtiment, le DPE, les risques, le règlement d'urbanisme.
> Tout vient des bases publiques de l'État. Rien n'est estimé.
> Les communes autour, comparées au même mètre carré. De quarante annonces, il t'en reste trois :
> celle qui est sous le prix du quartier, et celle qui ne l'est pas.
> Demande-lui ce que tu veux : il répond avec les chiffres de la commune.
> Six bases publiques. Cinq millésimes de ventes. Toute la France.
> Des décisions prises sur des faits. Pas sur une impression.
> Colle ta première annonce, et vois où elle est vraiment.

**188 mots pour 67,5 s** — environ 165 mots/minute de parole effective, silences compris.
C'est le rythme du modèle : posé, jamais pressé, avec de vraies respirations aux plans 3, 10, 18 et 20.

**Direction de voix** — masculine ou féminine, 25–40 ans, sans emphase commerciale.
Les questions (« à la main ? », « Simple, non ? ») se posent presque à voix basse.
Les listes du plan 5 se détachent : un point après chaque étape, pas de virgule.

---

## Ce qu'il ne faut pas faire

- **Aucune capture d'un site d'annonces réel**, ni logo, ni nom, ni maquette reconnaissable.
  Le plan 6 et le plan 8 utilisent des annonces fictives. La géolocalisation d'annonce se
  montre par son résultat — l'adresse sur la carte — jamais par le site source.
- **Aucune photo de personne identifiable** : le modèle est plein d'avatars, nous n'en avons
  pas besoin. Là où il montre des visages, nous montrons des parcelles et des cartes.
- **Aucun chiffre non vérifié à l'écran.** Les trois repères marqués ⟦à confirmer⟧ doivent être
  recomptés le jour du montage ; à défaut, retirer le chiffre et garder la phrase.
- **Pas de promesse de rendement.** On ne dit jamais « fais une plus-value », on dit
  « décide sur des faits ».

## Livrables attendus du monteur

| Fichier | Format |
|---|---|
| `immopilier-67s-1080p.mp4` | 1920×1080, H.264, 60 fps, ~12 Mb/s |
| `immopilier-67s-carre.mp4` | 1080×1080, recadré, textes recentrés |
| `immopilier-67s-vertical.mp4` | 1080×1920, pour les formats courts |
| `immopilier-67s-muet.mp4` | sans voix ni musique, pour les diffusions en sourdine |
| `sous-titres.srt` | fourni dans ce dossier, à incruster sur la version verticale |

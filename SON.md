# Immopilier — voix off, bruitages, musique

**La musique est en place et les bruitages sont posés.** Sept des douze répliques
de voix off sont calées ; les cinq dernières manquent.

Mesuré sur le rendu : **crête −3,3 dBFS, RMS −21,4 dBFS, aucun échantillon
écrêté**. De la marge sous le plafond, et la voix reste devant.

Où ça se passe :

```
public/son/voix/          vo-01.mp3 … vo-07.mp3 — les prises livrées
public/son/bruitages/     les neuf sons, fabriqués par tools/prep-sons.mjs
public/son/musique/       nappe.mp3 la source, nappe-mix.mp3 celle qui est montée
src/immopilier/son/
  voix-off.ts             les 12 répliques du conducteur et leur image de départ
  bruitages.ts            les 42 repères de bruitage, à l'image
  BandeSon.tsx            le montage son, monté dans la composition
```

---

## 1. La voix off

### Ce qui est calé

Le conducteur du commanditaire compte douze répliques. Les sept premières sont
en place, aux timecodes donnés — vérifié sur le rendu, elles démarrent bien à
0,00 s · 6,00 · 12,00 · 18,00 · 21,00 · 27,00 · 36,00, et aucune ne déborde sur
la suivante :

| № | Timecode | Durée | Marge avant la suivante | Fichier |
|---|---|---|---|---|
| 1 | 0:00 | 3,16 s | 2,8 s | `vo-01.mp3` |
| 2 | 0:06 | 3,37 s | 2,6 s | `vo-02.mp3` |
| 3 | 0:12 | 3,00 s | 3,0 s | `vo-03.mp3` |
| 4 | 0:18 | 2,77 s | 0,2 s | `vo-04.mp3` |
| 5 | 0:21 | 2,93 s | 3,1 s | `vo-05.mp3` |
| 6 | 0:27 | 5,15 s | 3,8 s | `vo-06.mp3` |
| 7 | 0:36 | 3,71 s | 2,3 s | `vo-07.mp3` |
| 8 à 12 | 0:42 → 1:03 | — | — | ⟦ manquants ⟧ |

La réplique 4 n'a que **0,2 s** de marge avant la 5 : c'est la seule à surveiller
si elle est réenregistrée un peu plus lente.

### Comment l'ordre a été établi

Les fichiers livrés portaient l'heure de génération dans leur nom
(`ElevenLabs_2026-09-15T16_13_19_…`). Ils ont été renommés `vo-01` à `vo-07` de
la plus ancienne à la plus récente, c'est-à-dire dans l'ordre du conducteur.

⟦ Je ne peux pas écouter les fichiers : la correspondance repose sur l'ordre des
horodatages, recoupé avec la durée et le nombre de pauses de chaque prise —
`vo-06` est à la fois la plus longue (5,15 s) et la seule à trois pauses
internes, ce qui correspond exactement à la réplique 6 et à ses trois signes de
ponctuation. Le recoupement est net, mais **une écoute de contrôle s'impose** :
ouvrir le Studio, la timeline les montre à leur place, nommées. ⟧

### Ajouter les répliques 8 à 12

Déposer les fichiers dans `public/son/voix/` et écrire leur nom :

```ts
// src/immopilier/son/voix-off.ts
{n: 8, debut: 2520, timecode: '0:42', fichier: 'vo-08.mp3',
 texte: 'Parmi des dizaines de transactions, …'},
```

C'est tout. La réplique se monte à son image, la musique baissera dessous quand
il y en aura une.

### Si une réplique déborde

Refaire la prise un peu plus serrée, ou décaler `debut` de quelques images. **Ne
pas** allonger le plan : les 67,5 s et le minutage des 24 plans sont le contrat
du script.

---

## 2. Les bruitages

Deux familles, et la distinction fait tout le mixage.

### Les cinq sons qui comptent

Ceux de la charte et du script : les moments où le produit *répond*. Ils
s'entendent.

| Temps | Ce qu'on entend | Niveau |
|---|---|---|
| 0,1 → 2,2 s | les huit *ticks* du radar, plan 1 | 0,18 |
| 5,30 s | le *clac* de pause, quand la fenêtre se fige | 0,50 |
| 18,12 s | le souffle montant sur l'arrivée de la marque | 0,16 |
| 20,88 s | le *ding* propre sur le ✓ de l'URL | 0,45 |
| 24,60 s | le point qui se pose sur la parcelle | 0,50 |
| 26,52 s | le *clic* du curseur sur le ✓ | 0,50 |
| 66,40 s | le *clic* de souris final | 0,60 |

Le *ding* a demandé un recalage. À sa place d'origine — 21,82 s — il tombait en
plein milieu de la réplique 5 et s'y noyait : +1,2 dB au-dessus du niveau
ambiant, autant dire rien. La frappe de l'URL démarre donc plus tôt et court un
peu plus vite, et le ✓ arrive à **20,88 s**, dans le trou qui suit « collez
simplement le lien de l'annonce ». Il ressort maintenant à **+21,9 dB**. C'est la
règle : un bruitage se règle *contre* la voix, pas dans le vide.

### Les sons d'interface

Ce qui apparaît, ce qui glisse : les jalons du plan 5, les vignettes du plan 6,
les quatre blocs du plan 13, la couronne, les bulles, les grands chiffres.

Ils sont calés **au niveau de la musique** : 0,08 pour une apparition, 0,10 pour
un glissement, 0,07 pour les vignettes du plan 6 qui arrivent en rafale. Mesuré
sur le rendu, leur émergence au-dessus du fond est nulle ou négative — on les
sent, on ne les remarque pas. C'est le but : quarante bruits qui percent
transformeraient la démonstration en jeu vidéo.

Le plan 6 ne sonne qu'une vignette sur deux. Treize sons d'affilée en 3,3
secondes feraient une bouillie.

**Le défilement de la fiche, au plan 12, a été retiré.** Le mouvement se suffit à
lui-même et le son tombait sur une réplique.

Deux plans restent **nus** — le 22 et les arcs du 23 : la musique doit respirer
avant la chute, et le dernier clic n'a de poids que sur du silence.

### D'où ils viennent

Ils sont **synthétisés**, pas téléchargés : `tools/prep-sons.mjs` les fabrique de
bout en bout — une cloche à deux partiels pour le *ding*, deux impulsions de
bruit filtré pour le *clic*, un passe-bas qui s'ouvre et se referme pour
l'apparition, un tremblement rapide sous un filtre qui monte pour le défilement.
Aucune banque de sons, donc aucune licence à vérifier.

Chaque fichier est normalisé avant écriture, sans quoi les volumes du tableau ne
voudraient rien dire.

Régénérer : `node tools/prep-sons.mjs`

## 3. La musique

`public/son/musique/nappe.mp3` — la piste livrée, **conservée telle quelle**.
Analysée : 67,57 s, 116 BPM, crête −1,0 dBFS, RMS −21,0 dBFS, avec son propre
fondu de sortie à partir de 64 s. Sa durée est celle du montage à sept centièmes
près : elle est taillée pour ce film, donc elle démarre à l'image 0, sans boucle
ni raccourci.

### Pourquoi une version mixée

La vidéo ne monte pas ce fichier mais `nappe-mix.mp3`, produit par
`tools/prep-musique.mjs`.

La piste livrée est normalisée à −1,0 dBFS de crête. À ce niveau on ne peut pas
la monter d'un seul décibel sans l'écrêter — or le film en a besoin plus fort
après 41 s. Un passage de `loudnorm` en deux temps lui rend **4 dB de marge à
sensation de niveau égale** : crête −5,0 dBFS, RMS inchangé à −20,9. Le fichier
livré n'est pas touché, il reste la source.

Régénérer : `node tools/prep-musique.mjs`

### La montée au tunnel

La voix off s'arrête à 39,7 s et la musique porte seule tout le dernier tiers.
Sans rien faire, le film s'éteindrait doucement là où il doit conclure. Le niveau
monte donc de **0,82 à 1,30 à l'image 2460**, le tunnel du plan 16 — celui où
« 40 » devient « 3 » —, atteint en 0,4 s : assez pour qu'on le sente, assez lent
pour qu'on ne l'entende pas comme un défaut.

Mesuré sur le rendu :

| Fenêtre | Niveau |
|---|---|
| 36 → 41 s, avant le tunnel | −23,3 dBFS |
| 41 → 46 s, après le tunnel | −18,7 dBFS |
| 46 → 64 s, la fin | −18,1 dBFS |

Soit **+4,6 dB**, sans un seul échantillon écrêté.

```ts
export const MUSIQUE = {
  fichier: 'nappe-mix.mp3',
  volume: 0.82,             // nominal
  volumeApresTunnel: 1.3,   // à partir de l'image 2460
  facteurSousVoix: 0.32,    // ce que la voix retire, en fraction du niveau en cours
};
```

L'esquive est une **fraction** du niveau en cours, pas une valeur absolue : la
musique s'efface donc autant avant qu'après la montée. Elle ne compte que les
répliques réellement enregistrées — tant que les cinq dernières manquent, la
musique reste pleine après 39,5 s, ce qui est le bon comportement.

⟦ Le dossier demandait une piste entre 100 et 110 BPM ; celle-ci est à 116.
  Écart assumé — c'est la piste fournie. ⟧

---

## 4. Rendre

```bash
npx remotion render Immopilier out/immopilier-67s-1080p.mp4
```

Le son part avec l'image, sans rien de plus.

Pour le livrable **muet** demandé par le dossier :

```bash
npx remotion render Immopilier out/immopilier-67s-muet.mp4 --muted
```

Le mixage sort à −21,4 dBFS RMS, avec 3,3 dB de marge. C'est un master prudent,
sans limiteur. Pour viser les −16 LUFS attendus sur le web, passer le fichier
rendu par une normalisation de loudness :

```bash
npx remotion ffmpeg -i out/immopilier-67s-1080p.mp4 \
  -af loudnorm=I=-16:TP=-1.5:LRA=11 -c:v copy out/immopilier-67s-web.mp4
```

Pour vérifier le calage sans attendre un rendu complet, ouvrir le Studio
(`npm run dev`) : la timeline montre chaque réplique et chaque bruitage à sa
place, nommés, et on peut les déplacer à l'œil avant de figer les valeurs.

---

## 5. L'ordre dans lequel s'y prendre

1. **Finir la voix** — les répliques 8 à 12. C'est elle qui porte le film et qui
   décide du reste ; une fois les douze en place, on sait où sont les vrais
   silences.
2. **Les bruitages ensuite**, aux six images du tableau. Les régler *contre* la
   voix, pas dans le vide : le *ding* doit tomber dans un trou, pas sur un mot.
3. **La musique en dernier**, à un niveau qui laisse la voix devant. Si on doit
   monter la voix pour l'entendre, c'est que la musique est trop forte.

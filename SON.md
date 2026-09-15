# Immopilier — voix off, bruitages, musique

**Sept des douze répliques sont montées et calées.** Les bruitages et la musique
sont attendus du commanditaire ; leurs emplacements sont prêts et vides.

Tout est câblé de la même façon : chaque réplique, chaque bruitage et la musique
ne se montent que si leur `fichier` est renseigné. Le film se rend donc avec les
sept voix disponibles, sans musique et sans erreur.

Où ça se passe :

```
public/son/voix/          vo-01.mp3 … vo-07.mp3 — les prises livrées
public/son/bruitages/     vide, en attente
public/son/musique/       vide, en attente
src/immopilier/son/
  voix-off.ts             les 12 répliques du conducteur et leur image de départ
  bruitages.ts            les bruitages et leur image
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

La charte n'en retient que trois — le *tick* du radar, le *ding* de validation,
le *clic* final. Le script en ajoute deux : le *clac* de pause du plan 3 et le
souffle montant du plan 8. `bruitages.ts` les attend à l'image :

| Image | Temps | Ce qu'on entend |
|---|---|---|
| 318 | 5,30 s | le *clac* de pause, quand la fenêtre se fige |
| 1087 | 18,12 s | le souffle montant sur l'arrivée de la marque |
| 1309 | 21,82 s | le *ding* propre sur le ✓ de l'URL |
| 1476 | 24,60 s | le point qui se pose sur la parcelle |
| 1591 | 26,52 s | le *clic* du curseur sur le ✓ |
| 3984 | 66,40 s | le *clic* de souris final |

Plus les **ticks du radar** au plan 1. Un par point allumé ferait 150 sons ; on
n'en garde que huit, régulièrement répartis sur le tour de 2,4 s. L'oreille
entend un balayage, pas une mitraille.

S'en tenir là. Un film sobre ne bruite pas tout, il bruite ce qui compte : les
trois moments où le produit *répond* — le lien validé, l'adresse trouvée, le
bouton cliqué.

Pour les brancher : déposer les fichiers dans `public/son/bruitages/` et écrire
leur nom dans `bruitages.ts`. Penser à normaliser les prises entre elles, sinon
les volumes du tableau ne veulent plus rien dire : un souffle qui sature pendant
qu'un tick s'entend à peine ne se règle pas au volume.

`tools/prep-sons.mjs` sait fabriquer un jeu d'attente synthétisé, si on veut
juger du rythme avant d'avoir les vrais sons.

---

## 3. La musique

⟦ Attendue du commanditaire. ⟧ Ce que le dossier demande : **libre de droits,
tempo 100–110, sans voix**, coupée exactement sur 67,5 s. Le modèle tient sur une
nappe électronique continue avec un *build* de 8 s avant l'arrivée de la marque —
soit un build qui culmine vers 18 s, au plan 8.

⟦ Vérifier la licence avant diffusion, y compris organique : beaucoup de pistes
« gratuites » excluent la publicité. ⟧

Déposer le fichier dans `public/son/musique/` et écrire son nom :

```ts
export const MUSIQUE = {
  fichier: 'nappe.mp3',
  volume: 0.62,         // niveau nominal
  volumeSousVoix: 0.2,  // sous la voix off — elle s'efface, elle ne disparaît pas
};
```

Le fondu d'ouverture, les 400 ms de fermeture exigées par le dossier et l'esquive
sous la voix s'appliquent alors d'eux-mêmes.

L'esquive ne compte **que les répliques réellement enregistrées** : tant que la
voix n'est pas complète, la musique reste pleine là où personne ne parle. Les
respirations du script — plans 3, 10, 18 et 20 — retrouvent donc leur niveau,
ce qui est exactement leur rôle.

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

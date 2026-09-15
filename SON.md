# Immopilier — voix off, bruitages, musique

**La musique et les six bruitages sont faits et branchés.** Il ne manque que la
voix off, qui demande soit un comédien, soit une clé d'API de synthèse vocale.

Tout est câblé de la même façon : chaque réplique, chaque bruitage et la musique
ne se montent que si leur `fichier` est renseigné. Les répliques valent encore
`null`, le film se rend donc avec sa musique et ses bruitages, sans voix et sans
erreur.

Où ça se passe :

```
public/son/voix/          les répliques enregistrées
public/son/bruitages/     les cinq bruitages
public/son/musique/       la piste
src/immopilier/son/
  voix-off.ts             les 22 répliques et leur image de départ
  bruitages.ts            les bruitages et leur image
  BandeSon.tsx            le montage son, monté dans la composition
```

---

## 1. La voix off

### Pourquoi un fichier par réplique

`voix-off.ts` porte **22 répliques**, une par entrée, avec son texte et son image
de départ. Ces images sont celles de `dossier-immopilier/sous-titres.srt`,
relevées une fois et non ressaisies : la voix et le sous-titrage partent donc
exactement ensemble, ce qui compte pour la version verticale, celle qui se
regarde sans le son.

Une bande unique de 67,5 s obligerait à tout réenregistrer pour corriger un mot,
et à recaler à l'oreille. Avec un fichier par réplique, on refait la phrase 12 et
on ne touche à rien d'autre.

### Enregistrer

**Avec un comédien** — direction du script : voix masculine ou féminine, 25–40
ans, sans emphase commerciale. Les questions (« à la main ? », « Simple, non ? »)
se posent presque à voix basse. Les cinq étapes du plan 5 se détachent : un point
après chaque étape, pas de virgule. Faire lire réplique par réplique, dans
l'ordre de `voix-off.ts`, et livrer un fichier par numéro.

**En synthèse vocale** — ElevenLabs en `eleven_multilingual_v2`, une requête par
réplique, écriture directe dans `public/son/voix/`. Il faut une clé
`ELEVENLABS_API_KEY`. Réglages de départ : `stability` 0,5 · `similarity_boost`
0,75 · `style` 0,3 — au-delà, la voix « joue » et perd le ton posé du script.
Prendre une voix française native, pas une voix anglaise en mode multilingue :
l'accent s'entend sur « parcelle », « quartier », « millésimes ».

### Brancher

Déposer les fichiers, puis renseigner leur nom :

```ts
// src/immopilier/son/voix-off.ts
{n: 1, debut: 0, texte: "Une annonce qui te plaît.", fichier: 'vo-01.mp3'},
```

C'est tout. La réplique se monte à son image, la musique baisse dessous.

### Si une réplique déborde

Les durées du script laissent de la marge, mais une voix lente peut mordre sur la
réplique suivante. Deux réponses, dans cet ordre : refaire la prise un peu plus
serrée, ou décaler `debut` de quelques images. **Ne pas** allonger le plan : les
67,5 s et le minutage des 24 plans sont le contrat du script.

---

## 2. Les bruitages

La charte n'en retient que trois — le *tick* du radar, le *ding* de validation,
le *clic* final. Le script en ajoute deux : le *clac* de pause du plan 3 et le
souffle montant du plan 8. `bruitages.ts` les place à l'image :

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

### D'où ils viennent

Ils sont **synthétisés**, pas téléchargés : `tools/prep-sons.mjs` les fabrique de
bout en bout — une cloche à deux partiels pour le *ding*, deux impulsions de
bruit filtré pour le *clic*, un corps grave sous une attaque sèche pour le
*clac*, un passe-bas qui s'ouvre pour le souffle, une hauteur qui tombe vite pour
le point qui se pose. Aucune banque de sons, donc aucune licence à vérifier.

Chaque fichier est normalisé à −1 dBFS avant écriture. C'est ce qui permet aux
volumes de `bruitages.ts` de vouloir dire quelque chose : sans cela le souffle
saturait pendant que le tick s'entendait à peine.

Pour les remplacer par des prises du commerce, il suffit de déposer les fichiers
et de changer les noms. Remotion sert aussi des bruitages libres sur
`https://remotion.media/` (`ding.wav`, `mouse-click.wav`, `whoosh.wav`…),
utilisables par URL directe.

Régénérer : `node tools/prep-sons.mjs`

---

## 3. La musique

Elle est faite : `public/son/musique/nappe.mp3`, **67,5 s à 104 BPM, en la
mineur, sans voix**, synthétisée par `tools/prep-sons.mjs`. Le dossier demandait
une piste libre de droits entre 100 et 110 BPM et rappelait de prévoir la licence
avant diffusion, y compris organique — il n'y a plus de licence à prévoir.

Elle suit le film au lieu de tourner en boucle :

| Moment | Ce qu'on entend |
|---|---|
| 0 → 8,5 s | une nappe seule, très basse — l'accroche |
| 8,5 s | la basse entre |
| 12,5 s | le pouls entre |
| 18,1 s | tout s'ouvre, l'arpège arrive : c'est la marque |
| 50,9 → 53 s | la montée que le script demande au plan 20 |
| 56,5 s | pouls et arpège se retirent, il ne reste que la nappe et la basse |
| 67,1 → 67,5 s | les 400 ms de fondu exigées par le dossier |

Les réglages sont dans `BandeSon.tsx` :

```ts
export const MUSIQUE = {
  fichier: 'nappe.mp3',
  volume: 0.62,         // niveau nominal
  volumeSousVoix: 0.2,  // sous la voix off — elle s'efface, elle ne disparaît pas
};
```

Pour une vraie piste composée, déposer le fichier dans `public/son/musique/` et
changer le nom : le fondu et l'esquive continuent de s'appliquer.

L'esquive est automatique : la musique baisse 12 images avant chaque réplique et
remonte quand plus personne ne parle. Les respirations du script — plans 3, 10,
18 et 20 — retrouvent donc le niveau plein, ce qui est exactement leur rôle.

Elle ne compte **que les répliques réellement enregistrées**. Tant que la voix
n'est pas là, la musique reste à son niveau plein : esquiver sous une voix absente
laisserait le film à peine audible.

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

## 5. Où en est le mixage

Mesuré sur le rendu : **crête −2,1 dBFS, RMS moyen −19,4 dBFS**. De la marge sous
le plafond, un niveau moyen confortable, et la courbe suit bien les actes — très
bas sur l'accroche, plein à partir de la marque, en retrait sur la chute.

Quand la voix arrivera, la refaire passer devant : si on doit monter la voix pour
l'entendre, c'est que la musique est trop forte. Les bruitages se règlent
*contre* la voix, pas dans le vide — le *ding* doit tomber dans un trou, pas sur
un mot.

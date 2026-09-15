# Immopilier — voix off, bruitages, musique

Tout le son est câblé et **muet tant qu'aucun fichier n'est déposé** : chaque
réplique, chaque bruitage et la musique ne se montent que si leur `fichier` est
renseigné. On peut donc livrer l'image d'abord et brancher les pistes une par
une, sans jamais casser le rendu.

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

### Où les prendre

Des bruitages libres sont servis par Remotion sur `https://remotion.media/`
(`ding.wav`, `mouse-click.wav`, `switch.wav`, `whoosh.wav`…) et s'utilisent par
URL directe, sans rien télécharger. **Attention** : cet hôte est bloqué par la
politique réseau de l'environnement où je travaille, donc je ne peux pas les
tester ici — sur votre machine ils fonctionnent. Sinon, une banque libre de
droits classique fait l'affaire ; vérifier la licence comme pour la musique.

---

## 3. La musique

Le dossier ne la fournit pas. Ce qu'il demande : **libre de droits, tempo
100–110, sans voix**, coupée exactement sur 67,5 s avec un fondu de 400 ms. Le
modèle tient sur une nappe électronique continue avec un *build* de 8 s avant
l'arrivée de la marque — soit un build qui culmine vers 18 s, au plan 8.

⟦ Vérifier la licence avant diffusion, y compris pour une diffusion organique :
beaucoup de pistes « gratuites » excluent la publicité. ⟧

Le fondu de sortie et l'esquive sous la voix sont déjà écrits dans `BandeSon.tsx` :

```ts
export const MUSIQUE = {
  fichier: 'nappe-100bpm.mp3',
  volume: 0.42,          // niveau nominal
  volumeSousVoix: 0.14,  // sous la voix off — elle s'efface, elle ne disparaît pas
};
```

L'esquive est automatique : la musique baisse 12 images avant chaque réplique et
remonte quand plus personne ne parle. Les respirations du script — plans 3, 10,
18 et 20 — retrouvent donc le niveau plein, ce qui est exactement leur rôle.

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

1. **La voix d'abord.** C'est elle qui porte le film et qui décide du reste. Une
   fois les 22 répliques en place, on sait où sont les vrais silences.
2. **Les bruitages ensuite**, aux six images du tableau. Les régler *contre* la
   voix, pas dans le vide : le *ding* doit tomber dans un trou, pas sur un mot.
3. **La musique en dernier**, à un niveau qui laisse la voix devant. Si on doit
   monter la voix pour l'entendre, c'est que la musique est trop forte.

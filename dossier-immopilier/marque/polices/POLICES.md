# Polices Immopilier

Les trois familles du site, fournies ici en `.ttf` — le format qu'attendent
After Effects, Premiere, DaVinci et Final Cut. Toutes sont sous licence
**SIL Open Font License 1.1** : usage commercial, diffusion et incorporation
dans une vidéo autorisés, sans redevance.

| Fichier | Famille | Graisse | Où on l'utilise |
|---|---|---|---|
| `Geist-300.ttf` | Geist | Light | mentions discrètes, ligne des sources (plan 21) |
| `Geist-400.ttf` | Geist | Regular | corps des fiches, libellés de tableau |
| `Geist-500.ttf` | Geist | Medium | libellés d'interface, boutons secondaires |
| `Geist-600.ttf` | Geist | SemiBold | **toute la typographie cinétique, les compteurs, le wordmark** |
| `Geist-700.ttf` | Geist | Bold | à éviter ; réservé aux très grands chiffres du plan 21 |
| `GeistMono-400.ttf` | Geist Mono | Regular | références de parcelle, URL, identifiants |
| `GeistMono-500.ttf` | Geist Mono | Medium | même usage, sur fond sombre |
| `InstrumentSerif-400.ttf` | Instrument Serif | Regular | éditorial ; aucun plan de ce script |
| `InstrumentSerif-400Italic.ttf` | Instrument Serif | Italic | idem |

## Installation

**macOS** — sélectionner les neuf fichiers, double-clic, « Installer la police ».
**Windows** — clic droit sur la sélection, « Installer pour tous les utilisateurs ».
Redémarrer le logiciel de montage après l'installation, sinon la famille n'apparaît pas.

## Si vous repartez du site

Le site les charge depuis Google Fonts, sans clé ni compte :

```
https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap
```

Les fichiers de ce dossier viennent exactement de là, renommés lisiblement.

## Réglages à reproduire

- Titres cinétiques : Geist SemiBold, interlettrage **−2 %**, interligne **1,05**.
- Compteurs : activer les **chiffres tabulaires** (`tnum`), sans quoi les nombres
  tressautent pendant l'incrémentation.
- Ne jamais simuler une graisse absente en appliquant un faux gras : les cinq graisses
  de Geist sont là, elles suffisent.

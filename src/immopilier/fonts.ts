// Polices Immopilier — les .ttf du dossier marque, copiés dans public/polices/.
// Licence SIL OFL 1.1 : usage commercial et incorporation dans une vidéo autorisés.
import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

/** Interface, titres cinétiques, compteurs. */
export const GEIST = 'Geist';
/** Données brutes : références de parcelle, URL, identifiants. */
export const GEIST_MONO = 'Geist Mono';

await Promise.all([
  loadFont({family: 'Geist', url: staticFile('polices/Geist-300.ttf'), weight: '300'}),
  loadFont({family: 'Geist', url: staticFile('polices/Geist-400.ttf'), weight: '400'}),
  loadFont({family: 'Geist', url: staticFile('polices/Geist-500.ttf'), weight: '500'}),
  loadFont({family: 'Geist', url: staticFile('polices/Geist-600.ttf'), weight: '600'}),
  loadFont({family: 'Geist', url: staticFile('polices/Geist-700.ttf'), weight: '700'}),
  loadFont({family: 'Geist Mono', url: staticFile('polices/GeistMono-400.ttf'), weight: '400'}),
  loadFont({family: 'Geist Mono', url: staticFile('polices/GeistMono-500.ttf'), weight: '500'}),
]);

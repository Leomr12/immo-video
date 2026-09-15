/**
 * Génère la géométrie de la carte de France utilisée aux plans 1 et 20.
 *
 * Source : Natural Earth 1:50m (domaine public), via le paquet `world-atlas`.
 * Projection : conique conforme de Lambert, parallèles 44° / 49° — la projection
 * officielle française (même famille que Lambert-93), c'est elle qui donne à
 * l'Hexagone sa silhouette attendue.
 *
 * Sortie : src/immopilier/geo/france.ts — un tracé SVG et des points de vente
 * déterministes, pour que le rendu soit reproductible et hors-ligne.
 *
 * Relancer :  node tools/prep-france.mjs
 */
import {writeFileSync, mkdirSync} from 'node:fs';
import {dirname} from 'node:path';
import {geoConicConformal, geoPath, geoContains} from 'd3-geo';
import {feature} from 'topojson-client';
import atlas from 'world-atlas/countries-50m.json' with {type: 'json'};

const BOX = 1000; // le tracé est normalisé dans un carré de 1000 × 1000
const DOTS = 150; // ventes publiées allumées par le balayage radar
const SEED = 20240612; // graine fixe : la carte est identique à chaque exécution

// France métropolitaine + Corse, sans les territoires d'outre-mer.
const METROPOLE = {minLon: -5.3, maxLon: 9.7, minLat: 41.2, maxLat: 51.2};

const inMetropole = ([lon, lat]) =>
  lon >= METROPOLE.minLon && lon <= METROPOLE.maxLon && lat >= METROPOLE.minLat && lat <= METROPOLE.maxLat;

const countries = feature(atlas, atlas.objects.countries);
const france = countries.features.find((f) => f.properties.name === 'France');
if (!france) throw new Error('France introuvable dans world-atlas');

// On ne garde que les anneaux dont la majorité des sommets tombe en métropole :
// cela écarte la Guyane, les Antilles, La Réunion et Mayotte sans découper un
// anneau en plein milieu.
const rings = france.geometry.coordinates.filter((poly) => {
  const outer = poly[0];
  const inside = outer.filter(inMetropole).length;
  return inside / outer.length > 0.5;
});
if (rings.length === 0) throw new Error('aucun anneau métropolitain retenu');

const metropole = {type: 'MultiPolygon', coordinates: rings};

const projection = geoConicConformal()
  .parallels([44, 49])
  .rotate([-3, 0])
  .fitSize([BOX, BOX], metropole);

const outline = geoPath(projection)(metropole);

// Points de vente : échantillonnage par rejet, PRNG à graine fixe pour que deux
// exécutions donnent exactement la même carte.
const mulberry32 = (a) => () => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const rand = mulberry32(SEED);

const dots = [];
let guard = 0;
while (dots.length < DOTS && guard++ < DOTS * 400) {
  const lon = METROPOLE.minLon + rand() * (METROPOLE.maxLon - METROPOLE.minLon);
  const lat = METROPOLE.minLat + rand() * (METROPOLE.maxLat - METROPOLE.minLat);
  if (!geoContains(metropole, [lon, lat])) continue;
  const [x, y] = projection([lon, lat]);
  dots.push({x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10});
}
if (dots.length < DOTS) throw new Error(`seulement ${dots.length} points générés`);

const out = `// Généré par tools/prep-france.mjs — ne pas modifier à la main.
// Natural Earth 1:50m (domaine public) · projection conique conforme 44°/49°.

export const FRANCE_BOX = ${BOX};

/** Silhouette de la France métropolitaine, tracé SVG dans un carré de ${BOX} × ${BOX}. */
export const FRANCE_OUTLINE =
  '${outline}';

/** Ventes publiées allumées par le balayage radar (plan 1) et la constellation (plan 20). */
export const FRANCE_DOTS: {x: number; y: number}[] = ${JSON.stringify(dots)};
`;

const target = new URL('../src/immopilier/geo/france.ts', import.meta.url).pathname;
mkdirSync(dirname(target), {recursive: true});
writeFileSync(target, out);
console.log(`✓ ${target}\n  tracé ${outline.length} caractères · ${dots.length} points`);

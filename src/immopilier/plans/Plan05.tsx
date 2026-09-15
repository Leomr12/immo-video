import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Icone} from '../composants/Icones';

/**
 * Plan 5 · 08,50 → 12,50 · fond sombre
 *
 * Le chemin sinueux relie cinq jalons numérotés. Le tracé se dessine de gauche à
 * droite, la caméra suit en travelling latéral, et chaque jalon éclot 80 ms avant
 * que le trait ne l'atteigne. Les grands chiffres 1 à 5 défilent en fond, en
 * `--n-800`, à une vitesse moindre : c'est le parallaxe qui donne la profondeur.
 *
 * Voix off — « Trouver l'adresse. Situer la parcelle. Comparer les ventes
 * réelles. Lire le quartier. Décider. » Un point après chaque étape.
 *
 * Le tracé porte `pathLength={1000}` : sa longueur est donc normalisée et le
 * `strokeDashoffset` se pilote sans jamais mesurer le DOM.
 */

/** Les cinq jalons, à leur position sur la scène large de 3600 et à leur fraction du tracé. */
const JALONS = [
  {x: 360, y: 620, fraction: 0.075, icone: 'link', libelle: "Trouver l'adresse"},
  {x: 1080, y: 400, fraction: 0.275, icone: 'scan-line', libelle: 'Situer la parcelle'},
  {x: 1800, y: 640, fraction: 0.475, icone: 'trending-up', libelle: 'Comparer les ventes'},
  {x: 2520, y: 400, fraction: 0.675, icone: 'map-pin', libelle: 'Lire le quartier'},
  {x: 3240, y: 600, fraction: 0.875, icone: 'check-circle', libelle: 'Décider'},
] as const;

export const Plan05: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      name="Plan 5 — Les cinq étapes à la main"
      style={{
        overflow: 'hidden',
        // Images 240 à 250 : sortie du plan, jouée dans l'assemblage de l'acte.
        opacity: interpolate(frame, [240, 250], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        }),
        scale: interpolate(frame, [240, 250], [1, 1.06], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          output: 'perceptual-scale',
        }),
      }}
    >
      <AbsoluteFill
        name="Chiffres de fond"
        style={{
          // Parallaxe : le fond défile moins vite que le chemin.
          translate: interpolate(frame, [0, 240], ['0px 0px', '-1010px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.33, 0, 0.67, 1),
          }),
        }}
      >
        {JALONS.map((jalon, i) => (
          <div
            key={jalon.libelle}
            style={{
              position: 'absolute',
              left: jalon.x - 190,
              top: jalon.y - 460,
              fontFamily: 'Geist',
              fontWeight: 700,
              fontSize: 520,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: '#33333a',
            }}
          >
            {i + 1}
          </div>
        ))}
      </AbsoluteFill>

      <AbsoluteFill
        name="Travelling"
        style={{
          translate: interpolate(frame, [0, 240], ['0px 0px', '-1680px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.33, 0, 0.67, 1),
          }),
        }}
      >
        <svg width={3600} height={1080} viewBox="0 0 3600 1080" style={{position: 'absolute', inset: 0}}>
          <path
            d="M60,680 C200,680 220,620 360,620 C640,620 800,400 1080,400 C1360,400 1520,640 1800,640 C2080,640 2240,400 2520,400 C2800,400 3100,600 3240,600 L3540,600"
            fill="none"
            stroke="#f6f6f8"
            strokeWidth={5}
            strokeLinecap="round"
            pathLength={1000}
            strokeDasharray={1000}
            style={{
              strokeDashoffset: interpolate(frame, [0, 240], [1000, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.33, 0, 0.67, 1),
              }),
            }}
          />
        </svg>

        {JALONS.map((jalon) => (
          <div
            key={jalon.libelle}
            style={{
              position: 'absolute',
              left: jalon.x - 90,
              top: jalon.y - 90,
              width: 180,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 22,
              // Chaque jalon éclot 80 ms (5 images) avant que le trait ne l'atteigne.
              opacity: interpolate(frame, [jalon.fraction * 240 - 5, jalon.fraction * 240 + 12], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
              }),
              scale: interpolate(frame, [jalon.fraction * 240 - 5, jalon.fraction * 240 + 12], [0.72, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
                output: 'perceptual-scale',
              }),
            }}
          >
            <div
              style={{
                width: 132,
                height: 132,
                borderRadius: 34,
                backgroundColor: '#2e4fe6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 22px 60px rgba(74,107,242,0.45), inset 0 2px 0 rgba(255,255,255,0.28)',
              }}
            >
              <Icone nom={jalon.icone} taille={62} />
            </div>
            <div
              style={{
                fontFamily: 'Geist',
                fontWeight: 500,
                fontSize: 34,
                letterSpacing: '-0.01em',
                color: '#f6f6f8',
                whiteSpace: 'nowrap',
              }}
            >
              {jalon.libelle}
            </div>
          </div>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {CarteCadastre, PARCELLE} from '../composants/CarteCadastre';
import {Curseur} from '../composants/Curseur';
import {TypoCinetique} from '../composants/TypoCinetique';

/**
 * Plan 9 · 22,40 → 26,80 · fond blanc
 *
 * La carte prend tout le cadre et zoome du plan large de la commune jusqu'à la
 * parcelle. Le point se pose, la parcelle s'allume en bleu translucide, l'encart
 * d'adresse glisse depuis le bas. Puis, plein cadre : « Simple, ✓ non ? » avec un
 * curseur qui vient cliquer sur le ✓.
 *
 * Voix off — « Il te rend l'adresse exacte. Sur la carte, à la parcelle.
 * Simple, non ? »
 *
 * Zoom : 2 600 ms en `ease-in-out`, la durée de la charte pour un zoom de carte,
 * soit du z 11 au z 18 du produit. L'encart glisse en 240 ms.
 */
export const Plan09: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 9 — L'adresse à la parcelle" style={{overflow: 'hidden'}}>
      <AbsoluteFill
        name="Zoom carte"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          // Le plan se retire sur la fin pour laisser venir « Simple, non ? ».
          opacity: interpolate(frame, [186, 206], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
        }}
      >
        <div
          style={{
            width: 2160,
            height: 2160,
            // z 11 → z 18 : le zoom de carte de la charte, 2 600 ms, ease-in-out.
            scale: interpolate(frame, [0, 156], [1, 3.1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.42, 0, 0.58, 1),
              output: 'perceptual-scale',
            }),
          }}
        >
          {/* Décalage constant qui amène la parcelle au centre : le zoom entre
              donc dans le bien et non dans le milieu arbitraire de la carte.
              Le SVG fait 2160 px pour 2000 unités de `viewBox`, d'où le 1,08. */}
          <div
            style={{
              width: 2160,
              height: 2160,
              translate: `${1080 - PARCELLE.x * 1.08}px ${1080 - PARCELLE.y * 1.08}px`,
            }}
          >
            <CarteCadastre
              parcelle={interpolate(frame, [128, 156], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
              })}
            />
          </div>
        </div>

        {/* Le point se pose sur la parcelle une fois le zoom arrivé. */}
        <div
          style={{
            position: 'absolute',
            width: 46,
            height: 46,
            borderRadius: 999,
            backgroundColor: '#2e4fe6',
            border: '7px solid #ffffff',
            boxShadow: '0 12px 34px rgba(18,18,22,0.28)',
            opacity: interpolate(frame, [120, 136], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            translate: interpolate(frame, [120, 140], ['0px -70px', '0px 0px'], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 150,
            bottom: 130,
            padding: '38px 46px',
            borderRadius: 26,
            backgroundColor: '#ffffff',
            border: '1px solid #e5e5e9',
            boxShadow: '0 30px 80px rgba(18,18,22,0.16)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            // 240 ms : l'entrée d'une fiche, selon la charte.
            opacity: interpolate(frame, [140, 154], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
            translate: interpolate(frame, [140, 154], ['0px 40px', '0px 0px'], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
          }}
        >
          <div style={{fontFamily: 'Geist', fontWeight: 600, fontSize: 52, letterSpacing: '-0.02em', color: '#121216'}}>
            7 Lotissement du Haut Terrier
          </div>
          <div style={{fontFamily: 'Geist', fontWeight: 400, fontSize: 36, color: '#4d4d57'}}>
            33220 Saint-Avit-Saint-Nazaire
          </div>
          <div style={{fontFamily: 'Geist Mono', fontWeight: 400, fontSize: 28, color: '#6a6a75', marginTop: 8}}>
            Parcelle 333780000D1121 · 1 042 m²
          </div>
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        name="Simple, non ?"
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          gap: 46,
          flexDirection: 'row',
          opacity: interpolate(frame, [192, 210], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
        }}
      >
        <TypoCinetique
          mots={[{texte: 'Simple,'}]}
          depart={196}
          couleur="#121216"
          couleurAccent="#2e4fe6"
          taille={112}
        />

        <div
          style={{
            width: 118,
            height: 118,
            borderRadius: 999,
            backgroundColor: '#2e4fe6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // Le bouton s'enfonce quand le curseur clique.
            scale: interpolate(frame, [238, 244, 252], [1, 0.93, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
              output: 'perceptual-scale',
            }),
          }}
        >
          <svg viewBox="0 0 24 24" width={64} height={64} fill="none" stroke="#ffffff" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </div>

        <TypoCinetique
          mots={[{texte: 'non', suffixe: ' ?'}]}
          depart={204}
          couleur="#121216"
          couleurAccent="#2e4fe6"
          taille={112}
        />

        <div
          style={{
            position: 'absolute',
            left: 960,
            top: 540,
            translate: interpolate(frame, [206, 240], ['420px 210px', '30px 34px'], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
            opacity: interpolate(frame, [206, 216], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <Curseur taille={50} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

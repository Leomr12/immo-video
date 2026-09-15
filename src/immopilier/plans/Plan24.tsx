import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Curseur} from '../composants/Curseur';
import {Icone} from '../composants/Icones';
import {Logo} from '../composants/Logo';

/**
 * Plan 24 · 64,00 → 67,50 · fond blanc
 *
 * Le logo au centre, le bouton bleu en dessous, un curseur qui entre par la
 * droite et vient cliquer. Fondu au blanc sur les trois dernières images.
 *
 * Logo : scale 0,96 → 1 et opacité 0 → 1 en 400 ms. Bouton : 200 ms plus tard.
 * Curseur : arrivée en 600 ms, clic à 66,4 s — soit l'image 144 du plan.
 * Pas de voix off : un dernier accord, puis un *clic* de souris net.
 */
export const Plan24: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 24 — Logo, bouton, curseur" style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 78}}>
        <div
          style={{
            opacity: interpolate(frame, [0, 24], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
            scale: interpolate(frame, [0, 24], [0.96, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
              output: 'perceptual-scale',
            }),
          }}
        >
          <Logo variante="light" largeur={820} />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            padding: '34px 58px',
            borderRadius: 999,
            backgroundColor: '#2e4fe6',
            boxShadow: '0 22px 54px rgba(46,79,230,0.34)',
            fontFamily: 'Geist',
            fontWeight: 600,
            fontSize: 46,
            letterSpacing: '-0.01em',
            color: '#ffffff',
            opacity: interpolate(frame, [12, 36], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
            // Le bouton s'enfonce de 1 px au clic, à 66,4 s.
            translate: interpolate(frame, [142, 146, 154], ['0px 0px', '0px 1px', '0px 0px'], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          <Icone nom="map-pin" taille={46} />
          Géolocaliser une annonce
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 84,
          fontFamily: 'Geist',
          fontWeight: 400,
          fontSize: 28,
          color: '#6a6a75',
          opacity: interpolate(frame, [46, 72], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
        }}
      >
        immobilier.topbusiness.fr
      </div>

      <div
        style={{
          position: 'absolute',
          left: 960,
          top: 540,
          translate: interpolate(frame, [108, 144], ['760px 330px', '58px 150px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
          opacity: interpolate(frame, [108, 120], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      >
        <Curseur taille={54} />
      </div>

      {/* Fondu au blanc sur les trois dernières images. */}
      <AbsoluteFill
        style={{
          backgroundColor: '#ffffff',
          opacity: interpolate(frame, [207, 210], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}
      />
    </AbsoluteFill>
  );
};

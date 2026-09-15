import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {TypoCinetique} from '../composants/TypoCinetique';

/**
 * Plan 7 · 15,82 → 18,12 · fond sombre
 *
 * Un grand dossier bleu se pose au premier plan et s'ouvre : il est vide. Deux ou
 * trois mouches en sortent — le clin d'œil du modèle, gardé tel quel.
 *
 * Texte — « et tu n'as toujours **aucun repère** », accent `--accent-400`.
 * Voix off — « Et tu n'as toujours aucun repère de prix. »
 *
 * Le rabat bascule vraiment vers l'avant : il lui faut une `perspective` sur le
 * conteneur, sans quoi la rotation en X n'est qu'un écrasement vertical.
 */

/** Les trois mouches : chacune sort du dossier sur sa propre trajectoire. */
const MOUCHES = [
  {depart: 44, x: -110, montee: -330, vitesse: 0.22, amplitude: 40},
  {depart: 56, x: 60, montee: -420, vitesse: 0.17, amplitude: 54},
  {depart: 68, x: 160, montee: -280, vitesse: 0.27, amplitude: 30},
] as const;

export const Plan07: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 7 — Le dossier vide" style={{alignItems: 'center', justifyContent: 'center'}}>
      <AbsoluteFill name="Constat" style={{alignItems: 'center', justifyContent: 'flex-start', paddingTop: 140}}>
        <div style={{width: 1560}}>
          <TypoCinetique
            mots={[
              {texte: 'et'},
              {texte: 'tu'},
              {texte: "n'as"},
              {texte: 'toujours'},
              {texte: 'aucun', accent: true},
              {texte: 'repère', accent: true},
            ]}
            depart={16}
            couleur="#f6f6f8"
            couleurAccent="#6e88f7"
            taille={92}
          />
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: 'relative',
          width: 700,
          height: 470,
          marginTop: 210,
          perspective: 1400,
          // Le dossier se pose au premier plan : il descend et s'arrête net.
          translate: interpolate(frame, [0, 26], ['0px -300px', '0px 0px'], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
          scale: interpolate(frame, [0, 26], [1.3, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            output: 'perceptual-scale',
          }),
        }}
      >
        {/* L'onglet, puis le fond du dossier : une cavité sombre, vide. */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 280,
            height: 62,
            borderRadius: '18px 26px 0 0',
            background: 'linear-gradient(180deg, #4a6bf2, #2e4fe6)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '52px 0 0 0',
            borderRadius: '10px 22px 26px 26px',
            background: 'linear-gradient(180deg, #1b3296 0%, #16255f 42%, #101a44 100%)',
            boxShadow: 'inset 0 34px 60px rgba(0,0,0,0.55), 0 40px 90px rgba(0,0,0,0.6)',
          }}
        />

        {/* Le rabat avant, qui bascule vers le spectateur et découvre le vide. */}
        <div
          style={{
            position: 'absolute',
            inset: '150px 0 0 0',
            borderRadius: '18px 18px 26px 26px',
            background: 'linear-gradient(180deg, #4a6bf2, #2e4fe6 62%, #2340bd)',
            boxShadow: '0 22px 50px rgba(0,0,0,0.5)',
            transformOrigin: 'bottom center',
            rotate: `x ${interpolate(frame, [22, 62], [0, 76], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            })}deg`,
          }}
        />
      </div>

      {MOUCHES.map((mouche, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 13,
            height: 13,
            borderRadius: 999,
            backgroundColor: '#8b8b96',
            boxShadow: '0 0 12px rgba(0,0,0,0.9)',
            translate: `${mouche.x + Math.sin(frame * mouche.vitesse) * mouche.amplitude}px ${
              180 +
              mouche.montee *
                interpolate(frame, [mouche.depart, mouche.depart + 70], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: Easing.bezier(0.33, 0, 0.67, 1),
                }) +
              Math.cos(frame * mouche.vitesse * 1.7) * 16
            }px`,
            opacity: interpolate(frame, [mouche.depart, mouche.depart + 8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

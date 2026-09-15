import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {FenetreNavigateur} from '../composants/FenetreNavigateur';
import {PlateauCarte} from '../composants/PlateauCarte';
import {TypoCinetique} from '../composants/TypoCinetique';

/**
 * Plan 3 · 04,60 → 06,20 · fond blanc → sombre
 *
 * Tout le plan 2 se réduit dans une fenêtre de navigateur, qui recule et se fige
 * comme une vidéo en pause. Puis le fond bascule au sombre — la bascule est
 * portée par `<Fond>`, qui la joue en 400 ms à l'image 318.
 *
 * Aucune coupe : à l'image 0 la fenêtre n'existe pas encore (`chrome` = 0) et le
 * cadre est identique à la dernière image du plan 2 ; elle naît autour de lui.
 * La carte et la boussole sont gelées sur l'image 275, d'où le *clac* de pause.
 */
export const Plan03: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 3 — La fenêtre recule" style={{alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          width: 1920,
          height: 1080,
          // 700 ms pour se réduire à 0,42, puis un recul continu dans le noir.
          scale: interpolate(frame, [0, 42, 96], [1, 0.42, 0.3], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: [Easing.bezier(0.2, 0.8, 0.2, 1), Easing.bezier(0.4, 0, 0.2, 1)],
          }),
          opacity: interpolate(frame, [70, 96], [1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
          willChange: 'scale, opacity',
        }}
      >
        <FenetreNavigateur
          largeur={1920}
          hauteur={1080}
          chrome={interpolate(frame, [0, 24], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          })}
        >
          <AbsoluteFill style={{backgroundColor: '#ffffff'}}>
            <PlateauCarte image={275} zoom={1.9} boussole={1} />

            <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start', paddingTop: 148}}>
              <div style={{width: 1560}}>
                <TypoCinetique
                  mots={[
                    {texte: 'tu'},
                    {texte: 'cherchais'},
                    {texte: "l'adresse"},
                    {texte: 'à', accent: true},
                    {texte: 'la', accent: true},
                    {texte: 'main', accent: true, suffixe: ' ?'},
                  ]}
                  depart={-240}
                  couleur="#121216"
                  couleurAccent="#2e4fe6"
                  taille={92}
                />
              </div>
            </AbsoluteFill>
          </AbsoluteFill>
        </FenetreNavigateur>
      </div>
    </AbsoluteFill>
  );
};

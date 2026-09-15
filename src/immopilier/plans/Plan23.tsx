import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {TypoCinetique} from '../composants/TypoCinetique';

/**
 * Plan 23 · 61,00 → 64,00 · fond blanc
 *
 * Retour au blanc, arcs bleu pâle en haut et en bas de cadre.
 *   1. « **Colle** ta première annonce »          61,0 → 62,0 s
 *   2. « et vois où elle est »                    62,0 → 63,0 s
 *   3. « et vois où elle est **vraiment**. »      63,0 → 64,0 s
 *
 * Voix off — « Colle ta première annonce, et vois où elle est vraiment. »
 *
 * Comme au plan 22, la troisième ligne prolonge la deuxième : « vraiment. »
 * s'ajoute à une phrase déjà là, une seconde plus tard.
 */
export const Plan23: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 23 — Colle ta première annonce" style={{alignItems: 'center', justifyContent: 'center'}}>
      {/* Les arcs `--accent-50` en haut et en bas du cadre. */}
      <div
        style={{
          position: 'absolute',
          top: -720,
          width: 2600,
          height: 1100,
          borderRadius: '50%',
          backgroundColor: '#eef1ff',
          opacity: interpolate(frame, [0, 34], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -720,
          width: 2600,
          height: 1100,
          borderRadius: '50%',
          backgroundColor: '#eef1ff',
          opacity: interpolate(frame, [0, 34], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
        }}
      />

      <div style={{width: 1620, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
        <TypoCinetique
          mots={[{texte: 'Colle', accent: true}, {texte: 'ta'}, {texte: 'première'}, {texte: 'annonce'}]}
          depart={4}
          couleur="#121216"
          couleurAccent="#2e4fe6"
          taille={100}
        />

        <div style={{display: 'flex', alignItems: 'baseline', gap: 26}}>
          <TypoCinetique
            mots={[{texte: 'et'}, {texte: 'vois'}, {texte: 'où'}, {texte: 'elle'}, {texte: 'est'}]}
            depart={60}
            couleur="#121216"
            couleurAccent="#2e4fe6"
            taille={100}
          />
          <TypoCinetique
            mots={[{texte: 'vraiment', accent: true, suffixe: '.'}]}
            depart={120}
            couleur="#121216"
            couleurAccent="#2e4fe6"
            taille={100}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

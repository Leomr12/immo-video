import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {TypoCinetique} from '../composants/TypoCinetique';

/**
 * Plan 7 · 15,82 → 18,12 · fond sombre
 *
 * Une grande croix se trace au centre : le repère de prix qui manque. Le script
 * demandait un dossier vide d'où sortent des mouches ; la croix dit la même
 * chose plus vite et sans gag, ce qui convient mieux à une phrase aussi sèche
 * que « tu n'as toujours aucun repère ».
 *
 * Texte — « et tu n'as toujours **aucun repère** », accent `--accent-400`.
 * Voix off — « Et tu n'as toujours aucun repère de prix. »
 *
 * La croix est bleue, pas rouge : le rouge `danger` de la charte dit une erreur,
 * or il n'y a pas d'erreur ici — il manque une information. L'accent reste donc
 * la seule couleur du film, et le rouge est gardé pour le ✗ du plan 17, où il
 * sanctionne vraiment un bien.
 */
export const Plan07: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 7 — Aucun repère" style={{alignItems: 'center', justifyContent: 'center'}}>
      <AbsoluteFill name="Constat" style={{alignItems: 'center', justifyContent: 'flex-start', paddingTop: 196}}>
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
          position: 'absolute',
          top: 468,
          width: 392,
          height: 392,
          // La croix arrive en reculant légèrement, comme frappée sur le cadre.
          scale: interpolate(frame, [22, 44], [1.22, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            output: 'perceptual-scale',
          }),
          opacity: interpolate(frame, [22, 36], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
        }}
      >
        <svg viewBox="0 0 300 300" style={{width: '100%', height: '100%', overflow: 'visible'}}>
          <circle cx="150" cy="150" r="128" fill="#4a6bf2" fillOpacity={0.14} />

          {/* Les deux branches se tracent l'une après l'autre. */}
          <line
            x1="82"
            y1="82"
            x2="218"
            y2="218"
            stroke="#4a6bf2"
            strokeWidth={22}
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray={100}
            style={{
              strokeDashoffset: interpolate(frame, [26, 48], [100, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          />
          <line
            x1="218"
            y1="82"
            x2="82"
            y2="218"
            stroke="#4a6bf2"
            strokeWidth={22}
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray={100}
            style={{
              strokeDashoffset: interpolate(frame, [40, 62], [100, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            }}
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};

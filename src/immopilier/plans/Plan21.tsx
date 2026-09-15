import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {COMMUNES_COUVERTES} from '../bien';
import {Compteur} from '../composants/Compteur';
import {Halo} from '../composants/Halo';

/**
 * Plan 21 · 53,00 → 56,50 · fond sombre
 *
 * Trois chiffres qui s'enchaînent en très gros, avec le halo bleu du modèle, et
 * en dessous la ligne des sources.
 *
 * Voix off — « Six bases publiques. Cinq millésimes de ventes. Toute la France. »
 *
 * Geist 700 n'est employé que pour ces très grands chiffres — c'est la seule
 * exception que POLICES.md accorde à la graisse Bold. La ligne des sources est
 * en Geist 300, comme prévu pour les mentions discrètes.
 *
 * ⟦ Le nombre de communes vient du commanditaire — voir `COMMUNES_COUVERTES`
 *   dans `bien.ts`. À recompter avant diffusion. ⟧
 */

const CHIFFRES = [
  {valeur: 6, libelle: 'bases publiques', depart: 0},
  {valeur: 5, libelle: 'millésimes de ventes', depart: 66},
  {valeur: COMMUNES_COUVERTES, libelle: 'communes', depart: 132},
] as const;

export const Plan21: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 21 — Six bases, cinq millésimes" style={{alignItems: 'center', justifyContent: 'center'}}>
      <Halo intensite={0.85} />

      {CHIFFRES.map((chiffre) => (
        <div
          key={chiffre.libelle}
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            opacity: interpolate(
              frame,
              [chiffre.depart, chiffre.depart + 14, chiffre.depart + 52, chiffre.depart + 64],
              [0, 1, 1, 0],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: [Easing.bezier(0.2, 0.8, 0.2, 1), Easing.linear, Easing.bezier(0.4, 0, 0.2, 1)],
              },
            ),
            scale: interpolate(frame, [chiffre.depart, chiffre.depart + 64], [0.92, 1.06], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.33, 0, 0.67, 1),
              output: 'perceptual-scale',
            }),
          }}
        >
          <div
            style={{
              fontFamily: 'Geist',
              fontWeight: 700,
              fontSize: 300,
              lineHeight: 1,
              letterSpacing: '-0.05em',
              color: '#f6f6f8',
            }}
          >
            <Compteur vers={chiffre.valeur} depart={chiffre.depart + 4} duree={38} />
          </div>
          <div style={{fontFamily: 'Geist', fontWeight: 500, fontSize: 46, color: '#b3b3bc'}}>{chiffre.libelle}</div>
        </div>
      ))}

      <div
        style={{
          position: 'absolute',
          bottom: 116,
          fontFamily: 'Geist',
          fontWeight: 300,
          fontSize: 30,
          letterSpacing: '0.06em',
          color: '#8b8b96',
          opacity: interpolate(frame, [18, 44], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.2, 0.8, 0.2, 1),
          }),
        }}
      >
        DVF · Cadastre · BAN · IGN · INSEE · ADEME
      </div>
    </AbsoluteFill>
  );
};

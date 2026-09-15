import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Compteur} from '../composants/Compteur';
import {FicheAdresse} from '../composants/FicheAdresse';

/**
 * Plan 14 · 35,28 → 38,37 · fond sombre
 *
 * Trois compteurs qui s'incrémentent, superposés à une fiche en arrière-plan
 * flouté.
 *
 * Voix off — « Tout vient des bases publiques de l'État. Rien n'est estimé. »
 *
 * ⟦ « Communes couvertes 34 935 » est l'un des trois chiffres marqués « à
 *   confirmer » au script : il doit être recompté avant le montage. Si le compte
 *   n'est pas sûr, on retire le chiffre et on garde la phrase. ⟧
 */
export const Plan14: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 14 — Les bases publiques" style={{alignItems: 'center', justifyContent: 'center'}}>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: 0.3, filter: 'blur(14px)'}}>
        <div style={{translate: '0px -160px'}}>
          <FicheAdresse largeur={1180} />
        </div>
      </AbsoluteFill>

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 62}}>
        {[
          {libelle: 'Ventes publiques analysées', depart: 8},
          {libelle: 'Communes couvertes', depart: 54},
          {libelle: 'Millésimes', depart: 100},
        ].map((compteur, i) => (
          <div
            key={compteur.libelle}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              opacity: interpolate(frame, [compteur.depart, compteur.depart + 14], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
              }),
              translate: interpolate(frame, [compteur.depart, compteur.depart + 14], ['0px 18px', '0px 0px'], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
              }),
            }}
          >
            <div style={{fontFamily: 'Geist', fontWeight: 400, fontSize: 34, color: '#8b8b96'}}>
              {compteur.libelle}
            </div>
            <div
              style={{
                fontFamily: 'Geist',
                fontWeight: 600,
                fontSize: 104,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: '#f6f6f8',
              }}
            >
              {i === 0 ? <Compteur vers={1284} depart={compteur.depart + 4} duree={54} /> : null}
              {i === 1 ? <Compteur vers={34935} depart={compteur.depart + 4} duree={54} /> : null}
              {i === 2 ? '2020 → 2024' : null}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Halo} from '../composants/Halo';
import {TypoCinetique} from '../composants/TypoCinetique';

/**
 * Plan 22 · 56,50 → 61,00 · fond sombre
 *
 * Typographie seule, sur le halo bleu.
 *   1. « tu ne compares plus des **annonces** »   56,5 → 58,6 s
 *   2. « tu compares des »                         58,6 → 59,6 s
 *   3. « tu compares des **faits**. »              59,6 → 61,0 s
 *
 * Voix off — « Vous ne comparez plus des annonces. Vous comparez des faits. »
 *
 * La chute est celle du conducteur du commanditaire. Elle nomme le basculement
 * que le produit provoque, et reprend le tri du plan 16 où quarante annonces
 * deviennent trois.
 *
 * La troisième ligne n'en est pas une : c'est la deuxième qui se prolonge. « tu
 * compares des » reste en place et « faits. » vient s'y ajouter — le texte se
 * complète sous nos yeux au lieu d'être remplacé.
 */
export const Plan22: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 22 — Tu compares des faits" style={{alignItems: 'center', justifyContent: 'center'}}>
      <Halo intensite={0.9} />

      <div style={{width: 1620, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
        <div
          style={{
            opacity: interpolate(frame, [110, 126], [1, 0.28], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
          }}
        >
          <TypoCinetique
            mots={[
              {texte: 'tu'},
              {texte: 'ne'},
              {texte: 'compares'},
              {texte: 'plus'},
              {texte: 'des'},
              {texte: 'annonces', accent: true},
            ]}
            depart={4}
            couleur="#f6f6f8"
            couleurAccent="#6e88f7"
            taille={100}
          />
        </div>

        {/* « tu compares des » à 58,6 s ; « faits. » ne s'ajoute qu'à 59,6 s,
            soit 60 images plus tard — d'où les deux blocs plutôt qu'un seul
            décalage de mot à mot. */}
        <div style={{display: 'flex', alignItems: 'baseline', gap: 26}}>
          <TypoCinetique
            mots={[{texte: 'tu'}, {texte: 'compares'}, {texte: 'des'}]}
            depart={126}
            couleur="#f6f6f8"
            couleurAccent="#6e88f7"
            taille={100}
          />
          <TypoCinetique
            mots={[{texte: 'faits', accent: true, suffixe: '.'}]}
            depart={186}
            couleur="#f6f6f8"
            couleurAccent="#6e88f7"
            taille={100}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

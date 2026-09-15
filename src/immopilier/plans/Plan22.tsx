import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Halo} from '../composants/Halo';
import {TypoCinetique} from '../composants/TypoCinetique';

/**
 * Plan 22 · 56,50 → 61,00 · fond sombre
 *
 * Typographie seule, sur le halo bleu.
 *   1. « Immopilier, votre **copilote** »        56,5 → 58,6 s
 *   2. « pour accéder à l'intelligence »          58,6 → 59,6 s
 *   3. « **immobilière** française. »             59,6 → 61,0 s
 *
 * La structure en trois temps du script est conservée : la troisième ligne
 * complète la deuxième au lieu de la remplacer, le texte se finit sous nos yeux.
 * La première recule et s'estompe quand la suivante arrive — elle reste lisible,
 * elle cède seulement le premier plan.
 *
 * Deux mots accentués seulement, « copilote » et « immobilière » : ce sont les
 * deux qui portent la promesse, et la charte veut environ un mot sur cinq en
 * couleur, pas une phrase bleue.
 */
export const Plan22: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill name="Plan 22 — Votre copilote" style={{alignItems: 'center', justifyContent: 'center'}}>
      <Halo intensite={0.9} />

      <div style={{width: 1620, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
        <div
          style={{
            opacity: interpolate(frame, [110, 126], [1, 0.3], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.4, 0, 0.2, 1),
            }),
          }}
        >
          <TypoCinetique
            mots={[{texte: 'Immopilier,'}, {texte: 'votre'}, {texte: 'copilote', accent: true}]}
            depart={4}
            couleur="#f6f6f8"
            couleurAccent="#6e88f7"
            taille={92}
          />
        </div>

        {/* « pour accéder à l'intelligence » à 58,6 s ; « immobilière française. »
            ne s'ajoute qu'à 59,6 s, soit 60 images plus tard — d'où les deux
            blocs plutôt qu'un seul décalage de mot à mot. */}
        <TypoCinetique
          mots={[{texte: 'pour'}, {texte: 'accéder'}, {texte: 'à'}, {texte: "l'intelligence"}]}
          depart={126}
          couleur="#f6f6f8"
          couleurAccent="#6e88f7"
          taille={92}
        />
        <TypoCinetique
          mots={[{texte: 'immobilière', accent: true}, {texte: 'française', suffixe: '.'}]}
          depart={186}
          couleur="#f6f6f8"
          couleurAccent="#6e88f7"
          taille={92}
        />
      </div>
    </AbsoluteFill>
  );
};

import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

/**
 * Typographie cinétique mot à mot — la signature du film.
 *
 * Chaque mot arrive 60 ms après le précédent (4 images à 60 fps) et monte de
 * 12 px en se défloutant, comme l'exige la charte : « Rien n'entre par le bas en
 * rebondissant. » Le ressort est donc suramorti (damping 200) : il a la détente
 * d'un spring, jamais le dépassement.
 *
 * L'accent ne change que la couleur, jamais la graisse — charte § 2.
 */

export type Mot = {
  readonly texte: string;
  /** Le mot passe en couleur d'accent. Environ un mot sur cinq. */
  readonly accent?: boolean;
  /** Collé au mot précédent, sans espace : la ponctuation, les guillemets. */
  readonly colle?: boolean;
  /**
   * Ponctuation rendue dans la couleur de base, dans le même bloc que le mot.
   * Elle ne peut donc pas partir seule à la ligne : c'est l'espace insécable
   * qu'impose la charte devant « ? », « ! », « % » et « € ».
   */
  readonly suffixe?: string;
};

/** Découpe une phrase en mots, `*comme ceci*` marquant le mot accentué. */
export const mots = (phrase: string): Mot[] =>
  phrase
    .split(' ')
    .filter((m) => m.length > 0)
    .map((m) =>
      m.startsWith('*') && m.endsWith('*')
        ? {texte: m.slice(1, -1), accent: true}
        : {texte: m, accent: false},
    );

export const TypoCinetique: React.FC<{
  readonly mots: readonly Mot[];
  /** Image, relative au début de la séquence, où le premier mot démarre. */
  readonly depart?: number;
  readonly couleur: string;
  readonly couleurAccent: string;
  readonly taille: number;
  readonly poids?: number;
  readonly aligner?: 'center' | 'flex-start';
}> = ({mots, depart = 0, couleur, couleurAccent, taille, poids = 600, aligner = 'center'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: aligner,
        alignItems: 'baseline',
        gap: `0 ${Math.round(taille * 0.26)}px`,
        fontFamily: 'Geist',
        fontWeight: poids,
        fontSize: taille,
        // Réglages repris du site : interlettrage −2 %, interligne 1,05.
        letterSpacing: '-0.02em',
        lineHeight: 1.05,
      }}
    >
      {mots.map((mot, i) => {
        const avance = spring({
          frame: frame - depart - i * 4,
          fps,
          config: {damping: 200, mass: 0.5, stiffness: 120},
          durationInFrames: 11,
        });

        return (
          <span
            key={`${mot.texte}-${i}`}
            style={{
              display: 'inline-block',
              color: mot.accent ? couleurAccent : couleur,
              opacity: avance,
              translate: `0px ${(1 - avance) * 12}px`,
              filter: `blur(${(1 - avance) * 6}px)`,
              marginLeft: mot.colle ? -Math.round(taille * 0.26) : undefined,
              willChange: 'opacity, translate, filter',
            }}
          >
            {mot.texte}
            {mot.suffixe ? <span style={{color: couleur}}>{mot.suffixe}</span> : null}
          </span>
        );
      })}
    </div>
  );
};

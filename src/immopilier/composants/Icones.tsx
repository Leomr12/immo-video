import React from 'react';

/**
 * Les cinq icônes des jalons du plan 5, redessinées au trait sur une grille de
 * 24 — mêmes glyphes que ceux nommés au script (`link`, `scan-line`,
 * `trending-up`, `map-pin`, `check-circle`), sans dépendance à une bibliothèque.
 */

const Trait: React.FC<{readonly children: React.ReactNode; readonly taille: number}> = ({children, taille}) => (
  <svg
    viewBox="0 0 24 24"
    width={taille}
    height={taille}
    fill="none"
    stroke="#ffffff"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export type NomIcone = 'link' | 'scan-line' | 'trending-up' | 'map-pin' | 'check-circle';

export const Icone: React.FC<{readonly nom: NomIcone; readonly taille: number}> = ({nom, taille}) => {
  if (nom === 'link') {
    return (
      <Trait taille={taille}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </Trait>
    );
  }
  if (nom === 'scan-line') {
    return (
      <Trait taille={taille}>
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <path d="M7 12h10" />
      </Trait>
    );
  }
  if (nom === 'trending-up') {
    return (
      <Trait taille={taille}>
        <path d="M16 7h6v6" />
        <path d="m22 7-8.5 8.5-5-5L2 17" />
      </Trait>
    );
  }
  if (nom === 'map-pin') {
    return (
      <Trait taille={taille}>
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </Trait>
    );
  }
  return (
    <Trait taille={taille}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </Trait>
  );
};

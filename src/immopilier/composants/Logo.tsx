import React from 'react';

/**
 * Le logo Immopilier, repris tel quel du SVG de marque — même tracé d'épingle,
 * même réglage de wordmark (Geist 600, corps 20, interlettrage −0,7).
 *
 * Le SVG est inséré en ligne plutôt que chargé en `<img>` : ainsi le mot est
 * composé avec le Geist que la vidéo charge elle-même. La charte réserve le PNG
 * aux montages où la police n'est pas installée sur la machine ; ici elle l'est
 * toujours, et le tracé vectoriel reste net à n'importe quelle échelle.
 *
 * Le `viewBox` est resserré à 139 unités : le fichier d'origine en réserve 214,
 * bien au-delà de la fin du mot, et le logo se retrouverait décentré dans son
 * cadre. Les trois variantes de couleur sont celles des fichiers fournis — la
 * charte interdit d'en inventer une quatrième.
 *
 * Taille minimale à l'écran : 180 px de large en 1080p.
 */

const ENCRE = {light: '#121216', dark: '#ffffff', accent: '#2e4fe6'} as const;

export const Logo: React.FC<{
  readonly variante: keyof typeof ENCRE;
  readonly largeur: number;
}> = ({variante, largeur}) => (
  <svg viewBox="0 0 139 32" width={largeur} height={(largeur * 32) / 139} role="img" aria-label="Immopilier">
    <path
      d="M16 2.4a11.2 11.2 0 0 1 11.2 11.2c0 6.9-7.6 13.9-10.4 16.3a1.2 1.2 0 0 1-1.6 0C12.4 27.5 4.8 20.5 4.8 13.6A11.2 11.2 0 0 1 16 2.4ZM16 7.8 22.6 13.2v6.2H9.4v-6.2Z"
      fill={ENCRE[variante]}
      fillRule="evenodd"
      clipRule="evenodd"
    />
    <text x="40" y="22.6" fontFamily="Geist" fontSize="20" fontWeight="600" letterSpacing="-0.7" fill={ENCRE[variante]}>
      Immopilier
    </text>
  </svg>
);

/** L'épingle seule — pour le plan 8 et les formats carrés. */
export const LogoSymbole: React.FC<{
  readonly variante: keyof typeof ENCRE;
  readonly taille: number;
}> = ({variante, taille}) => (
  <svg viewBox="0 0 32 32" width={taille} height={taille} role="img" aria-label="Immopilier">
    <path
      d="M16 2.4a11.2 11.2 0 0 1 11.2 11.2c0 6.9-7.6 13.9-10.4 16.3a1.2 1.2 0 0 1-1.6 0C12.4 27.5 4.8 20.5 4.8 13.6A11.2 11.2 0 0 1 16 2.4ZM16 7.8 22.6 13.2v6.2H9.4v-6.2Z"
      fill={ENCRE[variante]}
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

import React from 'react';

/** Le curseur de souris des plans 9 et 24 — flèche pleine, contour clair. */
export const Curseur: React.FC<{readonly taille?: number}> = ({taille = 46}) => (
  <svg viewBox="0 0 24 24" width={taille} height={taille * 1.12}>
    <path
      d="M5 2.5 19.2 12.3l-6.05.55 3.2 6.6-2.5 1.2-3.2-6.6L5 18.4Z"
      fill="#121216"
      stroke="#ffffff"
      strokeWidth={1.4}
      strokeLinejoin="round"
    />
  </svg>
);

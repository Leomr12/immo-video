import React from 'react';

/**
 * Plan 2 — le radar s'est resserré en boussole de carte. L'aiguille tourne et ne
 * se fixe pas : c'est tout le propos du plan, on cherche sans trouver.
 *
 * Le mouvement volontairement irrégulier (deux harmoniques qui ne bouclent pas
 * ensemble) évite qu'on lise une rotation mécanique.
 */
export const Boussole: React.FC<{readonly image: number; readonly trait: string}> = ({image, trait}) => {
  const frame = image;
  const angle = frame * 4.2 + Math.sin(frame / 11) * 46 + Math.sin(frame / 29) * 22;

  return (
    <svg viewBox="0 0 400 400" style={{width: '100%', height: '100%', overflow: 'visible'}}>
      <circle cx="200" cy="200" r="150" fill="none" stroke={trait} strokeWidth={2} />
      <circle cx="200" cy="200" r="128" fill="none" stroke={trait} strokeWidth={1} strokeOpacity={0.45} />

      {Array.from({length: 72}).map((_, i) => (
        <line
          key={i}
          x1="200"
          y1={i % 9 === 0 ? 56 : 62}
          x2="200"
          y2="70"
          stroke={trait}
          strokeWidth={i % 9 === 0 ? 2.4 : 1}
          strokeOpacity={i % 9 === 0 ? 0.9 : 0.35}
          transform={`rotate(${i * 5} 200 200)`}
        />
      ))}

      <g style={{rotate: `${angle}deg`, transformOrigin: '200px 200px'}}>
        <path d="M200,74 L216,200 L200,186 L184,200 Z" fill="#2e4fe6" />
        <path d="M200,326 L184,200 L200,214 L216,200 Z" fill={trait} fillOpacity={0.35} />
      </g>
      <circle cx="200" cy="200" r="7" fill="#2e4fe6" />
    </svg>
  );
};

import React from 'react';

/**
 * La fenêtre de navigateur du plan 3 : barre à trois pastilles, coins arrondis,
 * ombre douce.
 *
 * Le chrome est une surcouche, pas un bandeau qui pousse le contenu : il naît
 * *autour* du plan déjà à l'écran, à `chrome` = 0 la fenêtre est rigoureusement
 * invisible et l'image est celle du plan précédent, au pixel près.
 */
export const FenetreNavigateur: React.FC<{
  readonly largeur: number;
  readonly hauteur: number;
  /** Apparition du cadre, 0 → 1. */
  readonly chrome: number;
  readonly children: React.ReactNode;
}> = ({largeur, hauteur, chrome, children}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: largeur,
        height: hauteur,
        borderRadius: chrome * 22,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        boxShadow: `0 ${chrome * 60}px ${chrome * 160}px rgba(18,18,22,${chrome * 0.22})`,
        willChange: 'border-radius, box-shadow',
      }}
    >
      {children}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: chrome * 22,
          border: '1px solid #e5e5e9',
          opacity: chrome,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          backgroundColor: '#f6f6f8',
          borderBottom: '1px solid #e5e5e9',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          paddingLeft: 26,
          opacity: chrome,
          translate: `0px ${(chrome - 1) * 64}px`,
          willChange: 'opacity, translate',
        }}
      >
        <div style={{width: 16, height: 16, borderRadius: 999, backgroundColor: '#d5d5db'}} />
        <div style={{width: 16, height: 16, borderRadius: 999, backgroundColor: '#d5d5db'}} />
        <div style={{width: 16, height: 16, borderRadius: 999, backgroundColor: '#d5d5db'}} />
      </div>
    </div>
  );
};

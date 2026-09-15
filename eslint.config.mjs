import {config} from '@remotion/eslint-config-flat';

export default [
  ...config,
  {
    rules: {
      // La charte impose l'espace fine insécable comme séparateur de milliers
      // (`34 935`) et l'espace insécable avant « € », « % », « ? » et « ! ».
      // Ces caractères sont voulus dans le texte à l'écran, pas accidentels.
      'no-irregular-whitespace': ['error', {skipJSXText: true, skipStrings: true}],
    },
  },
];

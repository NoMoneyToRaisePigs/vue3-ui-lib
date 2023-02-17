//TODO: GF - solve the tailwind @apply stylelint warnings.

module.exports = {
   extends: [
      'stylelint-config-recommended-scss',
      'stylelint-config-recommended-vue',
      'stylelint-config-recommended-vue/scss',
   ],
   ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
   rules: {
      'indentation': [2, { baseIndentLevel: 0 }],
      'no-descending-specificity': null,
      'at-rule-no-unknown': null,
      'scss/at-rule-no-unknown': [
        true,
        {
          ignoreAtRules: ['tailwind']
        }
      ],
   }
}


// "devDependencies": {
//    "postcss-html": "^1.5.0",
//    "stylelint": "^14.16.1",
//    "stylelint-config-recommended-scss": "^8.0.0",
//    "stylelint-config-recommended-vue": "^1.4.0",
//  }
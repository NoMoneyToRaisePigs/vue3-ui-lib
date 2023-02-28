module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',  //https://github.com/eslint/eslint/blob/main/conf/eslint-recommended.js
    'plugin:vue/recommended',//https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/configs/vue3-recommended.js
    '@vue/typescript/recommended',  //https://github.com/vuejs/eslint-config-typescript/blob/main/index.js
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  rules: {
    // 'object-property-newline': 'error',
    // 'object-curly-newline': ['error', 'always'],
    semi: [2, 'never'],
    indent: ['error', 2],
    'no-trailing-spaces': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single'],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        'allowSingleExtends': true,
      },
    ],
    'vue/max-attributes-per-line': ['error', {
      'singleline': {
        'max': 4,
      },
      'multiline': {
        'max': 1,
      },
    }],
    'vue/first-attribute-linebreak': ['error', {
      'singleline': 'ignore',
      'multiline': 'below',
    }],
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/define-macros-order': ['error', {
      'order': ['defineProps', 'defineEmits'],
    }],
    'vue/component-tags-order': ['error', {
      'order': [ 'template', 'script', 'style' ],
    }],
  },
  ignorePatterns: [
    '**/prism.js',
  ],
}


// "devDependencies": {
//   "eslint": "^8.32.0",

//   "eslint-plugin-vue": "^9.9.0",
//   "@typescript-eslint/eslint-plugin": "^5.49.0",

//   "vue-eslint-parser": "^9.1.0",
//   "@typescript-eslint/parser": "^5.49.0",

//   "@vue/eslint-config-typescript": "^11.0.2",
// }
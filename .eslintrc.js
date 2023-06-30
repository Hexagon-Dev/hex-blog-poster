module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-recommended',
  ],
  overrides: [
    {
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'linebreak-style': 'off',
    'no-alert': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 3 },
    }],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src/']],
        extensions: ['.js', '.vue'],
      },
    },
  },
};

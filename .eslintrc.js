module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};

/* this file extends the ESLint settings of airbnb (some of the best JavaScript code guidelines)
   so we're using it to lint our JS code.
*/
module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    // making working with the JS library bearable
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'consistent-return': 'off',
    // Disabling no-console rule to be able to debug the work
    'no-console': 'warn',
    // Not using semicolons results in an error
    semi: 'error',
    // Exceeding 80 characters per line results in an error
    'max-len': [
      'error',
      {
        code: 80,
        ignoreComments: true,
      },
    ],
  },
  env: {
    browser: true,
    node: true,
  },
};

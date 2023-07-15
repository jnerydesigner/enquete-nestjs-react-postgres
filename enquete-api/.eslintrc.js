
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
    },
    plugins: ['sonarjs', '@typescript-eslint', 'etc', 'prettier', 'eslint-plugin-import-helpers'],
    extends: [
      'airbnb-base',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'plugin:sonarjs/recommended',
      'prettier'
    ],
    root: true,
    env: {
      node: true,
      jest: true,
      browser: true,
      es2021: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
      'prettier/prettier': ['warn', { endOfLine: 'auto' }],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'error',
      'no-alert': 'off',
      'no-use-before-define': 'off',
      'etc/no-commented-out-code': 'error',
      '@typescript-eslint/no-unused-vars': ['error'],
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-useless-constructor': 'off',
      'import/no-unresolved': 'off',
      'no-shadow': 'off',
      'class-methods-use-this': 'off',
      '@typescript-eslint/no-parameter-properties': 'off',
      'lines-between-class-members': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      'sonarjs/no-ignored-return': 'off',
      'no-restricted-syntax': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-empty-function': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'import-helpers/order-imports': [
        'warn',
        { // example configuration
            newlinesBetween: 'always',
            groups: [
                'module',
                '/^@shared/',
                ['parent', 'sibling', 'index'],
            ],
            alphabetize: { order: 'asc', ignoreCase: true },
        },
    ],
    },
  };
  
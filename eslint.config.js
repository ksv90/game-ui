import eslintRules from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import { config as tsConfig, configs as tsRules, parser } from 'typescript-eslint';

export default tsConfig(
  {
    languageOptions: {
      parserOptions: {
        parser,
        project: './tsconfig.lint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  { ignores: ['dist/*'] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
      'import/extensions': ['.js', '.ts', '.jsx', '.tsx'],
    },
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
  },
  {
    extends: [
      eslintRules.configs.recommended,
      ...tsRules.strictTypeChecked,
      ...tsRules.stylisticTypeChecked,
      importPlugin.flatConfigs.recommended,
      prettierPlugin,
    ],
    files: ['**/*.{js,ts, jsx,tsx}'],
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-console': 'warn',
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': 'warn',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'require-await': 'error',
      'no-return-await': 'error',
      complexity: 'error',
      eqeqeq: ['warn', 'smart'],
      'grouped-accessor-pairs': ['error', 'getBeforeSet'],
      'max-depth': 'error',
      'max-lines': 'warn',
      'no-magic-numbers': ['warn', { ignore: [0, 1, 2] }],
      'no-multi-assign': 'warn',
      'no-nested-ternary': 'warn',
      'no-plusplus': 'warn',
      'no-shadow': 'warn',
      'no-undefined': 'warn',
      'no-unneeded-ternary': 'warn',
      'no-else-return': ['warn', { allowElseIf: false }],
      'no-extra-bind': 'error',
      'no-useless-call': 'error',
      'no-param-reassign': ['warn', { props: true }],
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'warn',
      'no-useless-rename': 'warn',
      'no-useless-return': 'warn',
      'object-shorthand': 'warn',
      'one-var': ['warn', 'never'],
      'prefer-arrow-callback': 'warn',
      'prefer-destructuring': 'warn',
      'prefer-template': 'warn',
      'symbol-description': 'warn',
      yoda: 'warn',
      '@typescript-eslint/array-type': ['error', { default: 'array-simple', readonly: 'array-simple' }],
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],
      '@typescript-eslint/no-extraneous-class': ['error', { allowWithDecorator: true }],
      '@typescript-eslint/no-invalid-void-type': 'warn',
      '@typescript-eslint/no-unsafe-declaration-merging': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          allowTypedFunctionExpressions: true,
          allowIIFEs: true,
        },
      ],
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    ...tsRules.disableTypeChecked,
  },
);

import eslintPluginSvelte from 'eslint-plugin-svelte';
import eslintPluginStorybook from 'eslint-plugin-storybook';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import svelteConfig from './svelte.config.js';
import js from '@eslint/js';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Base JS/TS configuration
  js.configs.recommended,
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      // TypeScript-specific rules
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      // General code style rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'max-len': ['warn', { code: 100, ignoreStrings: true, ignoreTemplateLiterals: true }],
      'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }]
    }
  },

  // Svelte configuration
  ...eslintPluginSvelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        svelteConfig,
        project: './tsconfig.json'
      }
    },
    plugins: {
      svelte: eslintPluginSvelte
    },
    rules: {
      // Svelte-specific rules
      'svelte/no-at-html-tags': 'error',
      'svelte/require-store-callbacks-use-set-param': 'error',
      'svelte/button-has-type': 'error',
      'svelte/no-inline-styles': 'warn',
      'svelte/prefer-style-directive': 'warn',
      // Accessibility rules
      'svelte/a11y-click-events-have-key-events': 'error',
      'svelte/a11y-aria-attributes': 'error',
      'svelte/a11y-label-has-associated-control': 'error'
    }
  },

  // Storybook configuration
  {
    files: ['**/*.stories.{js,ts,svelte}'],
    plugins: {
      storybook: eslintPluginStorybook
    },
    rules: {
      ...eslintPluginStorybook.configs.recommended.rules,
      'storybook/prefer-pascal-case': 'error',
      'storybook/no-title-property-in-meta': 'error'
    }
  },

  // Override rules for specific file patterns
  {
    files: ['vite.config.ts', 'svelte.config.js', 'tailwind.config.js', 'postcss.config.js'],
    rules: {
      'max-lines-per-function': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off'
    }
  }
];

import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import {defineConfig, globalIgnores} from 'eslint/config'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import tsParser from '@typescript-eslint/parser'
import boundaries from 'eslint-plugin-boundaries'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import {createTypeScriptImportResolver} from 'eslint-import-resolver-typescript'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintPluginPrettierRecommended
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {jsx: true}
      }
    },
    settings: {
      react: {
        version: 'detect' // автоматически определяет версию React
      },
      'boundaries/elements': [
        {type: 'shared', pattern: 'src/shared/*'},
        {type: 'entities', pattern: 'src/entities/*'},
        {type: 'features', pattern: 'src/features/*'},
        {type: 'widgets', pattern: 'src/widgets/*'},
        {type: 'pages', pattern: 'src/pages/*'},
        {type: 'app', pattern: 'src/app/*'}
      ],
      'import/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: ['./tsconfig.json']
        })
      ],
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        },
        node: {
          paths: ['src'],
          extensions: ['.ts', '.tsx', '.css', '.module.css']
        },
        alias: {
          map: [
            ['shared', 'src/shared'],
            ['entities', 'src/entities'],
            ['features', 'src/features'],
            ['widgets', 'src/widgets'],
            ['pages', 'src/pages'],
            ['app', 'src/app']
          ]
        }
      }
    },
    plugins: {
      react,
      boundaries,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      'react-hooks': reactHooks
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      'boundaries/element-types': [
        2,
        {
          default: 'disallow',
          rules: [
            {from: 'features', allow: ['shared', 'entities']},
            {from: 'entities', allow: ['shared']},
            {from: 'widgets', allow: ['shared', 'features', 'entities']},
            {from: 'pages', allow: ['widgets', 'features', 'entities', 'shared']}
          ]
        }
      ],
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
          trailingComma: 'es5',
          printWidth: 100,
          tabWidth: 2
        }
      ],
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      'react/jsx-indent': ['error', 2],
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
          VariableDeclarator: 1,
          outerIIFEBody: 1,
          MemberExpression: 1,
          FunctionDeclaration: {parameters: 1, body: 1},
          FunctionExpression: {parameters: 1, body: 1},
          CallExpression: {arguments: 1},
          ArrayExpression: 1,
          ObjectExpression: 1,
          ImportDeclaration: 1,
          flatTernaryExpressions: false,
          ignoreComments: false
        }
      ],
      'array-bracket-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'never'],
      'computed-property-spacing': ['error', 'never'],
      'space-in-parens': ['error', 'never'],
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always'
        }
      ],
      'react/jsx-indent-props': ['error', 2],
      'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/display-name': 'off',
      'react/prop-types': 'off'
    }
  },
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
          trailingComma: 'none',
          printWidth: 100,
          bracketSpacing: false
        }
      ]
    }
  },
  {
    files: ['**/*.css', '**/*.module.css'],
    plugins: {
      import: importPlugin
    },
    rules: {
      // Отключаем ненужные правила для CSS
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/default': 'off'
    }
  }
])

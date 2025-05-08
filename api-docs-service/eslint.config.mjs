import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';

export default [
    {
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
        languageOptions: {
            sourceType: 'module',
            globals: globals.node,
            parser: typescriptEslintParser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        plugins: {
            prettier,
            '@typescript-eslint': typescriptEslintPlugin,
        },
        rules: {
            ...pluginJs.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                },
            ],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
        },
        ignores: [
            'node_modules/**',
            'dist/**',
            '**/*.min.js',
            'prettier.config.js',
        ],
    },
];

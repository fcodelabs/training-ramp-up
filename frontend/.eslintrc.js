module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'prettier'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [
       './tsconfig.json',
      './tsconfig.eslint.json',
    ],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/strict-boolean-expressions": "warn",
    "@typescript-eslint/restrict-plus-operands": "warn",
    "@typescript-eslint/strict-boolean-expressions": "warn",
    'camelcase': 'warn',
    'spaced-comment': 'warn',
    //  'quotes': ['error', 'single'],
    'no-duplicate-imports': 'error',
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/strict-boolean-expressions": "warn",
  },
  settings: {
    'import/resolver': {
      'typescript': {}
    }
  },
}

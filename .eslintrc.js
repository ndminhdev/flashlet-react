module.exports = {
  plugins: ['react'],
  env: {
    browser: true,
    es6: true
  },
  rules: {
    'prettier/prettier': 'error'
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
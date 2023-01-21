module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@App', './src/app'],
          ['@Assets', './src/assets'],
          ['@Containers', './src/containers'],
          ['@Components', './src/components']
        ],
        'extensions': ['.ts', '.js', '.jsx', '.json']
      }
    }
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': [
      // 'prettier/prettier' rule from 'eslint-plugin-prettier'
      'error', // violation of the rule will cause an error
      {
        singleQuote: true // option that sets single quotes as the valid quotes
      }
    ],
    'react/jsx-filename-extension': [ 
      'warn', // violation of the rule will cause a warning
      {
        extensions: ['.js', '.jsx'] // option to allow using JSX syntax within both '.js' and '.jsx' file extensions
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': [
      2,
      {
        caseSensitive : false
      }
    ]
  }
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals' : true
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
          ['@Components', './src/components'],
          ['@Hooks', './src/hooks'],
          ['@Utils', './src/utils']
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
  plugins: ['react', 'prettier', 'testing-library', 'jest', 'jest-dom'],
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
    ],
    'global-require': 0,
    'jsx-a11y/label-has-associated-control':  0,
    'no-unused-vars': 1,
    'react/jsx-props-no-spreading': 0,
    'no-console': 0,
    'no-restricted-syntax': 0,
    'import/prefer-default-export' : 0,
    'react/button-has-type': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/no-redundant-roles': 1,
    'no-plusplus': 0,
    'no-promise-executor-return': 0,
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": false, "peerDependencies": false}]
  }
}

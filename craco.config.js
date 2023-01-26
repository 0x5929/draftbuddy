const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@App': path.resolve(__dirname, 'src/app'),
      '@Assets': path.resolve(__dirname, 'src/assets'),
      '@Containers': path.resolve(__dirname, 'src/containers'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Utils': path.resolve(__dirname, 'src/utils')
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src$1",
        "^@App(.*)$": "<rootDir>/src/app$1",
        "^@Assets(.*)$": "<rootDir>/src/assets$1",
        "^@Containers(.*)$": "<rootDir>/src/containers$1",
        "^@Components(.*)$": "<rootDir>/src/components$1",
        "^@Hooks(.*)$": "<rootDir>/src/hooks$1",
        "^@Utils(.*)$": "<rootDir>/src/utils$1"
      }
    }
  }
};
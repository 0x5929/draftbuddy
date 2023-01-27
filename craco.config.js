const path = require(`path`);
const jestConfigs = require('./jest-config')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@App': path.resolve(__dirname, 'src/app'),
      '@Assets': path.resolve(__dirname, 'src/assets'),
      '@Containers': path.resolve(__dirname, 'src/containers'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Hooks': path.resolve(__dirname, 'src/hooks'),
      '@Utils': path.resolve(__dirname, 'src/utils')
    }
  },
  jest: {
    configure: {
      ...jestConfigs
    }
  }
};
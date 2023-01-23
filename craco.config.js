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
};
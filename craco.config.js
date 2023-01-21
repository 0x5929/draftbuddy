const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@App': path.resolve(__dirname, 'src/app'),
      '@Containers': path.resolve(__dirname, 'src/containers'),
      '@Components': path.resolve(__dirname, 'src/components'),
    }
  },
};
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: [
            '.ts',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            '@assets': './assets',
            '@components': './components',
            '@global': './global',
            '@hooks' : './hooks',
            '@pages': './pages',
            "@routes": "routes",
            '@services': './services',
            '@utils': './utils',
            '@validation': './validation',
          },
        },
      ],
      'react-native-reanimated/plugin',
      require.resolve("expo-router/babel"),
    ]
  };
};

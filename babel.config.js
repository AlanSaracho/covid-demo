module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            store: './src/store',
            screens: './src/screens',
            utils: './src/utils',
            api: './src/api.ts',
            types: './src/types.ts',
          },
        },
      ],
    ],
  };
};

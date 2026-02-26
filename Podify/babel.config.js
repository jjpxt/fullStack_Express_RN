module.exports = {
  presets: ['module:@react-native/babel-preset'],

  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.js',
          '.jsx',
          '.json'
        ],
        alias: {
          '@components': './src/components',
          '@utils': './src/utils',
          '@ui': './src/ui',
          '@views': './src/views',
          'src': './src'
        }
      }
    ],
    ['react-native-reanimated/plugin']
  ]
};
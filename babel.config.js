const { all } = require("axios");
const { black, white } = require("react-native-paper/lib/typescript/styles/themes/v2/colors");

module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    'react-native-reanimated/plugin', 
    '@babel/plugin-transform-runtime',
    'module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: true
    }
  ], 

};

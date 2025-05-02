const {getDefaultConfig} = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// 예: .env 확장자 추가하고 싶을 경우
config.resolver.sourceExts.push('env');

module.exports = config;

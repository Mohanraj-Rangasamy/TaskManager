const { getDefaultConfig } = require('expo/metro-config');
const { withStorybook } = require('@storybook/react-native/metro/withStorybook');

const config = getDefaultConfig(__dirname);

config.transformer.unstable_allowRequireContext = true;

module.exports = withStorybook(config);
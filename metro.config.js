
/*
    This file configures metro.
    It was recommend by the docuementation for using expo filesystem in connection to sqlite.
 */
  
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('db');

module.exports = defaultConfig;
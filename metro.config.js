const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)
<<<<<<< HEAD
 
=======
>>>>>>> fa3c8b21f13e5188a2354562dae8765a42e3ecb8
module.exports = withNativeWind(config, { input: './global.css' })
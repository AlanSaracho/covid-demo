import { createIconSetFromFontello } from '@expo/vector-icons';
import fontConfig from './assets/bateria-font/config.json';
import Animated, {  } from 'react-native-reanimated';

const BacteriaIcon = createIconSetFromFontello(fontConfig, 'bacterias', 'bacterias.ttf');
const AnimatedBacteria = Animated.createAnimatedComponent(BacteriaIcon);

export { BacteriaIcon, AnimatedBacteria };
import { FlatList, StyleProp, ViewStyle } from "react-native";
import Animated, { divide, multiply, sin, sub } from "react-native-reanimated";

const getWaveTranslation = (
  translationY: Animated.Node<number>,
  index: number,
  itemHeight: number
): Animated.AnimatedStyleProp<ViewStyle> => ({
  justifyContent: 'center',
  alignItems: 'center',
  height: itemHeight,
  transform: [{
    translateX: multiply(
      sin(divide(sub(index * itemHeight, translationY),itemHeight)),
      8
    )
  }]
});

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export { AnimatedFlatList, getWaveTranslation };

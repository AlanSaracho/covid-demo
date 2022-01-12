import { noop } from 'lodash';
import React from 'react';
import { Pressable, ViewStyle } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  children: React.ReactElement;
  scale?: number;
  onPress?: () => void;
  style?: Animated.AnimatedStyleProp<ViewStyle>;
};

const ScalePressable = ({ children, scale = 1.1, onPress = noop, style }: Props) => {
  const pressed = useSharedValue(0);

  const styles = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolate(pressed.value, [0, 1], [1, scale]) }
      ]
    };
  }, [pressed]);

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => pressed.value = withSpring(1)}
      onPressOut={() => pressed.value = withSpring(0)}
      style={[styles, style]}
    >
      {children}
    </AnimatedPressable>
  );
}

export { ScalePressable };

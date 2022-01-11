import React from 'react';
import { Pressable } from 'react-native';
import { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSpring } from 'react-native-redash';
import { BacteriaIcon } from '..';
import { BigG, Container } from './GoogleButton.styled';

type GoogleButtonProps = {
  style?: any;
  visible: boolean;
  onPress: () => void;
}

const GoogleButton = ({ visible, onPress, style }: GoogleButtonProps) => {
  const pressed = useSharedValue(0);
  const sharedVisible = useSpring(visible);
  
  const styles = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateZ: `${interpolate(sharedVisible.value, [0, 1], [-45, 0])}deg`},
        { scale: sharedVisible.value + pressed.value }
      ]
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => pressed.value = withSpring(0.2)}
      onPressOut={() => pressed.value = withSpring(0)}
    >
      <Container style={[styles, style]}>
        <BacteriaIcon
          name="b5"
          color="red"
          size={90}
        />
        <BigG> G+ </BigG>
      </Container>
    </Pressable>
  );
}

export { GoogleButton };

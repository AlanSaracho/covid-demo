import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { random } from 'lodash';
import { Vector } from 'react-native-redash';
import { AnimatedBacteria } from '..';

type BacteriaProps = {
  duration: number;
  size: number;
  type: 'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 'b6';
  origin: Vector<number>;
  movement: Vector<number>;
  opacity: number;
  rotateZ: number;
};

const createBacteria = (): BacteriaProps => ({
  duration: random(2500, 30000),
  size: random(8, 40),
  type: `b${random(1, 5)}`,
  rotateZ: random(0, 360),
  opacity: random(0.3, 0.9, true),
  origin: {
    x: random(0, Dimensions.get('window').width) ,
    y: random(0, Dimensions.get('window').height),
  },
  movement: {
    x: random(-120, 120),
    y: random(-120, 120),
  },
});

const noopBacteria = {
  ...createBacteria(),
  duration: 10,
};

const Bacteria = () => {
  const [bacteriaData, setBacteriaData] = useState<BacteriaProps>(noopBacteria);
  const { opacity, rotateZ, duration, size, type, origin, movement } = bacteriaData;
  const time = useSharedValue(0);
  
  const updateBacteria = () => {
    const newBacteria = createBacteria();
    setBacteriaData(newBacteria);
  };

  useEffect(() => {
    time.value = 
      withTiming(time.value ? 0 : 1, { duration }, () => runOnJS(updateBacteria)())
  }, [duration]);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    opacity: interpolate(time.value, [0, 0.1, 0.9, 1], [0, opacity, opacity, 0]),
    transform: [
      { translateX: interpolate(time.value, [0, 1], [origin.x, origin.x + movement.x]) },
      { translateY: interpolate(time.value, [0, 1], [origin.y, origin.y + movement.y]) },
      { rotateZ: `${interpolate(time.value, [0, 1], [rotateZ, rotateZ + (duration /  360)] )}deg` }
    ]
  }), [origin, movement, rotateZ, opacity]);

  return (
    <AnimatedBacteria
      style={style}
      name={type}
      size={size}
    />
  );
};

export { Bacteria, createBacteria };

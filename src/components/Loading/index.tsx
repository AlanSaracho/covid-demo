import { random } from 'lodash';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';
import { AnimatedBacteria } from '..';

const Flash = ({ delay }: { delay: number }) => {
  const [icon, setIcon] = useState(1);
  const [size, setSize] = useState(22);

  const time = useSharedValue(0);
  const left = useSharedValue(0);
  const right = useSharedValue(0);

  const update = () => {
    left.value = random(0, 64);
    right.value = random(0, 64);
    setIcon(random(1, 5));
    setSize(random(8, 32))
  }

  useEffect(() => {
    time.value = withRepeat(withDelay(delay, withTiming(2, { duration: 1000 }, () => runOnJS(update)())), -1, false)
  }, []);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    left: left.value - size / 2,
    top: right.value - size / 2,
    opacity: interpolate(time.value, [0, 1, 2], [0, 1, 0]),
    transform: [
      { scale: interpolate(time.value, [0, 1, 2], [0.4, 1, 0.4]) }
    ]
  }), [])

  return (
    <AnimatedBacteria
      style={style}
      name={`b${icon}`}
      size={size}
    />
  )
}

const Loading = () => {
  return (
    <View style={{ width: 64, height: 64 }}>
      <Flash delay={0} />
      <Flash delay={300} />
      <Flash delay={600} />
    </View>
  );
}

export { Loading };

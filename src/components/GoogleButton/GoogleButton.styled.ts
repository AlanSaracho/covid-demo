import styled from 'styled-components';
import { Text } from 'react-native'
import Animated from 'react-native-reanimated';

export const Container = styled(Animated.View)`
  justify-content: center;
  align-items: center;
`;

export const BigG = styled(Text)`
  position: absolute;
  font-size: 28px;
  color: white;
  font-family: KosugiMaru-Regular;
`;

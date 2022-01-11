import React from 'react';
import { ViewStyle } from 'react-native';
import { Container } from './Fab.styled';

type OrderIndicatorProps = {
  size?: number;
  onPress?: () => void;
  style?: ViewStyle;
  children: React.Element;
}

const Fab = ({ onPress, children, style }: OrderIndicatorProps) => (
  <Container
    onPress={onPress}
    style={style}
    children={children}
  />
);

export { Fab };

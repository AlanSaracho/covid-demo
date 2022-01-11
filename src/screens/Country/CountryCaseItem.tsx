import moment from 'moment';
import React from 'react';
import { View, ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';
import shortNumbers from 'short-numbers';
import { CountryCase } from '../../types';
import { Container, CasesContainer, CasesAmount, CasesText, DateText } from './CountryCaseItem.styled';


type CountryCaseProps = CountryCase & {
  style: Animated.AnimatedStyleProp<ViewProps>;
}

const CountryCaseItem = ({ Cases, Date, style }: CountryCaseProps) => {
  return (
    <Container style={style}>
      <CasesContainer>
        <CasesAmount>{shortNumbers(Cases)}</CasesAmount>
        <CasesText>Cases</CasesText>
      </CasesContainer>
      <DateText>{moment(Date).format('MMM Do YY')}</DateText>
    </Container>
  );
}

export { CountryCaseItem };

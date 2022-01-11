import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { sessionState } from 'store/session';
import { Loading } from 'components';
import { Container } from './Splash.styled';

const Splash = () => (
  <Container>
    <Loading />
  </Container>
);

export default Splash;

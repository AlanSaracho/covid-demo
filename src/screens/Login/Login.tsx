import React, { useEffect, useState } from 'react';
import { Container, CenteredBacterias } from './Login.styled';

import { GoogleButton } from 'components';
import { useSession } from 'store/session';

const Login = () => {
  const { signIn, signOut } = useSession();
  const [showGoogle, setShowGoogle] = useState(false);

  const login = () => {
    // signOut({ scopes: [], });
    signIn();
  };

  useEffect(() => {
    setTimeout(() => { setShowGoogle(true) }, 3000);
  }, []);

  return (
    <Container>
      <CenteredBacterias amount={22} />
      <GoogleButton
        visible={showGoogle}
        onPress={login}
      />
    </Container>
  );
}

export default Login;

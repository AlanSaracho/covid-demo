import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { buildPersistEffect } from "./persist";

export type SessionState = {
  user: User | null;
}

const defaultValue: SessionState = {
  user: null,
};

export const sessionState = atom({
  key: 'session',
  default: defaultValue,
  effects_UNSTABLE: [buildPersistEffect(defaultValue)],
});

export const useSession = () => {
  const [session, setSession] = useRecoilState<SessionState>(sessionState);
  const [loading, setLoading] = useState(false);

  const syncUser = async () => {
    const user = await GoogleSignin.signInSilently();
    setSession({ ...session, user });
  }

  const signIn = async () => {
    setLoading(true);
    try {
      // check play services
      const user = await GoogleSignin.signIn();
      setSession({ ...session, user });
    }catch(e) {
      // manage error
      console.log(e);
    }

    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    await GoogleSignin.signOut();
    setSession({ ...session, user: null });
    setLoading(false);
  };

  const initSession = async () => {
    await GoogleSignin.configure();
    syncUser();
  }

  useEffect(() => {
    initSession();
  }, [])

  return { session, signIn, signOut, loading };
}

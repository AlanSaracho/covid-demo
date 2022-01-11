import { atom, useRecoilState } from "recoil";
import * as GoogleSignIn from 'expo-google-sign-in';
import { useEffect, useState } from "react";
import { buildPersistEffect } from "./persist";

export type SessionState = {
  user: GoogleSignIn.GoogleUser | null;
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
    const user = await GoogleSignIn.signInSilentlyAsync();
    setSession({ ...session, user });
  }

  const signIn = async () => {
    setLoading(true);
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type } = await GoogleSignIn.signInAsync();
      if(type === 'success') {
        await syncUser()
      }
    }catch(e) {
      console.log(e);
    }

    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    await GoogleSignIn.signOutAsync();
    setSession({ ...session, user: null });
    setLoading(false);
  };

  const initSession = async () => {
    await GoogleSignIn.initAsync();
    syncUser();
  }

  useEffect(() => {
    initSession();
  }, [])

  return { session, signIn, signOut, loading };
}

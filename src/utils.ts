import { useEffect, useState } from "react";

export const useDelayedLoading = (loading: boolean) => {
  const [fakeLoading, setFakeLoading] = useState(false);

  useEffect(() => {
    if(!loading) {
      setTimeout(() => setFakeLoading(false), 1600);
    } else {
      setFakeLoading(true)
    }
  }, [loading]);

  return fakeLoading;
}
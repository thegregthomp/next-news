import { auth, firestore } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserData } from '@/types';
// Custom hook to read  auth record and user profile doc

type UserDataResponse = {
  userData: UserData | null;
  loading: boolean;
  error: Error | undefined;
};

export const useUserData = (): UserDataResponse => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = firestore.collection('users').doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        let userData = doc.data();
        setUserData({ ...userData, ...user });
      });
    } else {
      setUserData({});
    }

    return unsubscribe;
  }, [user]);

  return { userData, loading, error };
};

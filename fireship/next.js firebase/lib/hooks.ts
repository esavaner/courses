import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { User } from "firebase/auth";

export type ExtendedUser = User & {
  username?: string;
};

export const useUserData = () => {
  const [userAuth] = useAuthState(auth);
  const user = userAuth as ExtendedUser;
  const [username, setUsername] = useState();

  useEffect(() => {
    console.log(user);
    let unsubscribe;

    if (user) {
      const ref = doc(collection(firestore, "users"), user.uid);
      unsubscribe = onSnapshot(ref, (snap) => {
        setUsername(snap.data()?.username);
      });
    } else {
      setUsername(undefined);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
};

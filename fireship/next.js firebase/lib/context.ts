import { createContext } from "react";
import { User } from "firebase/auth";

type C = {
  user?: User;
  username?: string;
};

export const UserContext = createContext<C>({ user: undefined, username: "" });

import { UserContext } from "@/lib/context";
import Custom404 from "@/pages/404";
import { useContext } from "react";

type Props = {
  children?: React.ReactNode;
};

const AuthCheck = ({ children }: Props) => {
  const { username } = useContext(UserContext);
  return username ? <>{children}</> : <Custom404 />;
};

export default AuthCheck;

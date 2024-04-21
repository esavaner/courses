import { ExtendedUser } from "@/lib/hooks";
import Image from "next/image";

type Props = {
  user?: ExtendedUser;
};

export const UserProfile = ({ user }: Props) => {
  return (
    <div className="box-center">
      {user?.photoURL && (
        <Image
          className="card-img-center"
          src={user?.photoURL}
          alt="profile"
          width={150}
          height={150}
        />
      )}
      <p>
        <i>@{user?.username}</i>
      </p>
      <h1>{user?.displayName}</h1>
    </div>
  );
};

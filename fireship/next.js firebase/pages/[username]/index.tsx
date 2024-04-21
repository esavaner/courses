import Metatags from "@/components/Metatags";
import { PostFeed } from "@/components/PostFeed";
import { UserProfile } from "@/components/UserProfile";
import { getUserWithUsername, postToJson } from "@/lib/firebase";
import { User } from "firebase/auth";
import {
  collection,
  query as queryFS,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { GetServerSideProps, NextPage } from "next";

type Props = {
  user: User;
  posts: any;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { username } = query;
  const userDoc = await getUserWithUsername(username as string);
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsRef = collection(userDoc.ref, "posts");
    const q = queryFS(
      postsRef,
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    posts = (await getDocs(q)).docs.map(postToJson);
  }

  return {
    props: {
      user,
      posts,
    },
  };
};

const UserPage: NextPage<Props> = ({ user, posts }) => {
  return (
    <main>
      <Metatags title="User page" />
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  );
};

export default UserPage;

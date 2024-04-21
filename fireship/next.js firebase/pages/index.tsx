import Loader from "@/components/Loader";
import { PostFeed } from "@/components/PostFeed";
import { firestore, postToJson } from "@/lib/firebase";
import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useState } from "react";

const LIMIT = 1;

type Props = {
  posts: any[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (_) => {
  const postsCol = collectionGroup(firestore, "posts");
  const q = query(
    postsCol,
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );
  const posts = (await getDocs(q)).docs.map(postToJson);
  return {
    props: {
      posts,
    },
  };
};

export default function Home({ posts: p }: Props) {
  const [posts, setPosts] = useState(p);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    if (posts.length <= 0) {
      return;
    }
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? Timestamp.fromMillis(last.createdAt)
        : last.createdAt;

    const postsCol = collectionGroup(firestore, "posts");
    const q = query(
      postsCol,
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(LIMIT)
    );

    const newPosts = (await getDocs(q)).docs.map((doc) => doc.data());
    setPosts(posts.concat(newPosts));

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <PostFeed posts={posts} />
      {posts.length > 0 && !loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}
      <Loader show={loading} />

      {postsEnd && <>You have reached the end</>}
    </main>
  );
}

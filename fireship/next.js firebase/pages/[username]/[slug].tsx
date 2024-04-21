import PostContent from "@/components/PostContent";
import styles from "@/styles/Post.module.css";
import { firestore, getUserWithUsername, postToJson } from "@/lib/firebase";
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { GetStaticPaths, GetStaticProps } from "next";
import { useDocumentData } from "react-firebase-hooks/firestore";
import AuthCheck from "@/components/AuthCheck";
import { HeartButton } from "@/components/HeartButton";
import { useContext } from "react";
import { UserContext } from "@/lib/context";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // @ts-ignore
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);
  let post = null;
  let path = null;

  if (userDoc) {
    const postRef = doc(collection(userDoc.ref, "posts"), slug);
    post = postToJson(await getDoc(postRef));
    path = postRef.path;
  }
  return {
    props: {
      post,
      path,
    },
    revalidate: 60000,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const snapshot = await getDocs(collectionGroup(firestore, "posts"));
  const paths = snapshot.docs.map((d) => {
    const { username, slug } = d.data();
    return {
      params: {
        username,
        slug,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

type Props = {
  post: any;
  path: string;
};

const PostPage = ({ path, post }: Props) => {
  const postRef = doc(firestore, path);
  const [realtimePost] = useDocumentData(postRef);

  const _post = realtimePost || post;

  const { user: currentUser } = useContext(UserContext);

  return (
    <>
      <main className={styles.container}>
        <section>
          <PostContent post={_post} />
        </section>

        <aside className="card">
          <p>
            <strong>{_post.heartCount || 0} ❤️</strong>
          </p>
          <AuthCheck>
            <HeartButton postRef={postRef} />
          </AuthCheck>

          {currentUser?.uid === post.uid && (
            <Link href={`/admin/${post.slug}`}>
              <button className="btn-blue">Edit Post</button>
            </Link>
          )}
        </aside>
      </main>
    </>
  );
};

export default PostPage;

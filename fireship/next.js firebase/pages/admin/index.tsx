import AuthCheck from "@/components/AuthCheck";
import { PostFeed } from "@/components/PostFeed";
import { UserContext } from "@/lib/context";
import { auth, firestore } from "@/lib/firebase";
import {
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import kebabCase from "lodash.kebabcase";
import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { toast } from "react-hot-toast";
import styles from "../../styles/Admin.module.css";

const AdminPage = () => {
  return (
    <AuthCheck>
      <main>
        <PostList />
        <CreateNewPost />
      </main>
    </AuthCheck>
  );
};

export default AdminPage;

const PostList = () => {
  const usersRef = collection(firestore, "users");
  const userRef = doc(usersRef, auth.currentUser?.uid);
  const postsRef = collection(userRef, "posts");
  const q = query(postsRef, orderBy("createdAt"));
  const [querySnapshot] = useCollection(q);

  const posts = querySnapshot?.docs.map((d) => d.data());

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
};

const CreateNewPost = () => {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  const slug = encodeURI(kebabCase(title));
  const createPost = async (e: FormEvent) => {
    e.preventDefault();
    const uid = auth.currentUser?.uid;
    const usersRef = collection(firestore, "users");
    const userRef = doc(usersRef, uid);
    const postsRef = collection(userRef, "posts");
    const postRef = doc(postsRef, slug);
    const data = {
      title,
      slug,
      uid,
      username,
      publshed: false,
      content: "Hello world!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await setDoc(postRef, data);

    toast.success("Post created!");

    router.push(`/admin/${slug}`);
  };

  const isValid = title.length > 3 && title.length < 100;
  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Awesome Article!"
        className={styles.input}
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Post
      </button>
    </form>
  );
};

import AuthCheck from "@/components/AuthCheck";
import { FormValues, PostForm } from "@/components/PostForm";
import { auth, firestore } from "@/lib/firebase";
import { collection, doc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import styles from "../../styles/Admin.module.css";

const AdminPostEdit = () => {
  const router = useRouter();
  const { slug } = router.query;

  return slug && auth.currentUser?.uid ? (
    <EditSlug slug={slug as string} />
  ) : (
    <></>
  );
};

const EditSlug = ({ slug }: { slug: string }) => {
  const [preview, setPreview] = useState(false);
  const usersRef = collection(firestore, "users");
  const userRef = doc(usersRef, auth.currentUser?.uid);
  const postsRef = collection(userRef, "posts");
  const postRef = doc(postsRef, slug as string);
  const [post] = useDocumentData(postRef);

  return (
    <AuthCheck>
      <main className={styles.container}>
        {post && (
          <>
            <section>
              <h1>{post.title}</h1>
              <p>ID: {post.slug}</p>

              <PostForm
                postRef={postRef}
                defaultValues={post as FormValues}
                preview={preview}
              />
            </section>
            <aside>
              <h3>Tools</h3>
              <button onClick={() => setPreview(!preview)}>
                {preview ? "Edit" : "Preview"}
              </button>
              <Link href={`/${post.username}/${post.slug}`}>
                <button className="btn-blue">Live view</button>
              </Link>
            </aside>
          </>
        )}
      </main>
    </AuthCheck>
  );
};

export default AdminPostEdit;

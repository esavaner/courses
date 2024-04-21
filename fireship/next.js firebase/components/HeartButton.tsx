import { auth, firestore } from "@/lib/firebase";
import { collection, doc, increment, writeBatch } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

type Props = {
  postRef: any;
};

export const HeartButton = ({ postRef }: Props) => {
  console.log(postRef);
  const uid = auth.currentUser?.uid;
  const hearts = collection(postRef, "hearts");
  const heartRef = doc(hearts, uid);
  const [heartDoc] = useDocument(heartRef);

  const addHeart = async () => {
    const batch = writeBatch(firestore);
    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });
    await batch.commit();
  };

  const removeHeart = async () => {
    const batch = writeBatch(firestore);
    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);
    await batch.commit();
  };

  return heartDoc?.exists() ? (
    <button onClick={removeHeart}>💔 Unheart</button>
  ) : (
    <button onClick={addHeart}>❤️ Heart</button>
  );
};

import { auth, storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ChangeEvent, useState } from "react";
import Loader from "./Loader";

export const ImageUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("0");
  const [downloadURL, setDownloadURL] = useState("");

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = Array.from(e.target.files!)[0];
    const extension = file.type.split("/")[1];
    const r = ref(
      storage,
      `uploads/${auth.currentUser?.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);
    const task = uploadBytesResumable(r, file);
    task.on(
      "state_changed",
      (snap) => {
        const pct = ((snap.bytesTransferred / snap.totalBytes) * 100).toFixed(
          0
        );
        setProgress(pct);
      },
      null,
      async () => {
        const url = await getDownloadURL(r);
        setDownloadURL(url);
        setUploading(false);
      }
    );
  };

  return (
    <div className="box">
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}
      {!uploading && (
        <>
          <label className="btn">
            📸 Upload IMG
            <input
              type="file"
              onChange={uploadFile}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </label>
        </>
      )}
      {downloadURL && (
        <code className="upload-snippet">{`![alt](${downloadURL})`}</code>
      )}
    </div>
  );
};

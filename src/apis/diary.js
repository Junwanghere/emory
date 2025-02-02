import {
  setDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { storage, db } from "@/firebase/firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

//在做這些操作之前都應該檢查一下使用者目前是否有登入

export const diaryPostNewDiaryAPI = async (
  uid,
  date,
  imgUrl,
  postContent,
  emotion,
  indexDate,
) => {
  const diaryRef = doc(db, "users", `${uid}`, "diary", `${indexDate}`);
  await setDoc(
    diaryRef,
    {
      indexDate,
      date,
      imgUrl,
      postContent,
      emotion,
    },
    { merge: true },
  );
};

export const diaryUploadImgAPI = async (file, uid, date) => {
  // 取出file 實例
  const fileData = file.file;
  // 設定要儲存的地方以及名稱
  const storageReference = storageRef(storage, `${uid}/images/${date}`);
  // 圖片上傳到firebase  storage
  const snapshot = await uploadBytes(storageReference, fileData);

  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

export const diaryDelImgAPI = async (uid, date) => {
  const diaryImgRef = storageRef(storage, `${uid}/images/${date}`);
  await deleteObject(diaryImgRef);
};

export const diaryGetDiaryAPI = async (uid, indexDate) => {
  const diaryRef = collection(db, `users/${uid}/diary`);
  const q = query(diaryRef, where("indexDate", "==", `${indexDate}`));
  const querySnapshot = await getDocs(q);
  // 原本無資料會得到空陣列，透過傳null讓前端好做邏輯判斷
  if (querySnapshot.empty) {
    return null;
  } else {
    // 一天只會有一筆日記，這裡面會是一個陣列
    return querySnapshot.docs[0].data();
  }
};

export const diaryDelDiaryAPI = async (uid, indexDate) => {
  const diaryRef = doc(db, `users/${uid}/diary/${indexDate}`);
  await deleteDoc(diaryRef);
};

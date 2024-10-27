import { addDoc, collection } from 'firebase/firestore';
import { storage, db } from '@/firebase';
import {  ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

export const postNewPostAPI = async (date, imgUrl, postContent) => {
  try {
    const docRef = await addDoc(collection(db, "diaries"), {
      date,
      imgUrl,
      postContent,
      createdAt: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export const postUploadImgAPI = async (file) => {
  try{
    // 取出file 實例
    const fileData = file.file
    // 設定要儲存的地方以及名稱
    const storageReference = storageRef(storage, `images/${fileData.name}`)
    // 圖片上傳到firebase  storage
    const snapshot = await uploadBytes(storageReference, fileData);

    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL
  } catch (e) {
    console.error("圖片上傳失敗：", error);
  }
}


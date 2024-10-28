import { setDoc , collection, query, where, getDocs, doc } from 'firebase/firestore';
import { storage, db, } from '@/firebase';
import {  ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

export const postNewPostAPI = async (date, imgUrl, postContent) => {
  try {
    const diaryRef = doc(db, 'diaries', `${date}`)
    await setDoc(diaryRef, {  
      date,
      imgUrl,
      postContent
    }, { merge: true})
    console.log('success!');
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

export const postGetDiaryAPI = async (date) => {
  try{
    const diaryRef = collection(db, 'diaries')
    const q = query(diaryRef, where('date', '==', `${date}`))
    const querySnapshot = await getDocs(q);
    if(querySnapshot.empty){
      return null
    }else {
      // 一天只會有一筆日記，這裡面會是一個陣列
      return querySnapshot.docs[0].data()
    }
  } catch(e) {
    // 尚未處理提示獲取資料出錯的情況
    console.log('有地方出錯了',e)
  }
}
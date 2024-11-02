import { setDoc , collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { storage, db, } from '@/firebase';
import {  ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

//在做這些操作之前都應該檢查一下使用者目前是否有登入

export const postNewPostAPI = async (date, imgUrl, postContent) => {
  try {
    const diaryRef = doc(db, 'diaries', `${date}`)
    await setDoc(diaryRef, 
    {  
      date,
      imgUrl,
      postContent
    }, 
    { merge: true})
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export const postUploadImgAPI = async (file, date) => {
  try{
    // 取出file 實例
    const fileData = file.file
    // 設定要儲存的地方以及名稱
    const storageReference = storageRef(storage, `images/${date}`)
    // 圖片上傳到firebase  storage
    const snapshot = await uploadBytes(storageReference, fileData);

    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL
  } catch (e) {
    console.error("圖片上傳失敗：", error);
  }
}

export const postDelImgAPI = async (date) => {
  const diaryImgRef = storageRef(storage, `images/${date}`)
  try{
    await deleteObject(diaryImgRef)
  }catch(e){
    console.log(e)
  }
}

export const postGetDiaryAPI = async (date) => {
  try{
    const diaryRef = collection(db, 'diaries')
    const q = query(diaryRef, where('date', '==', `${date}`))
    const querySnapshot = await getDocs(q);
    // 原本無資料會得到空陣列，透過傳null讓前端好做邏輯判斷
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

export const postDelDiaryAPI = async (date) => {
  const diaryRef = doc(db, 'diaries', `${date}`)
  try{
    await deleteDoc(diaryRef)
  }catch(e){
    // not yet deal with error
    console.log(e)
  }
}
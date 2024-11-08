import { setDoc , collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { storage, db, } from '@/firebase';
import {  ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

//在做這些操作之前都應該檢查一下使用者目前是否有登入

export const diaryPostNewDiaryAPI = async (uid, date, imgUrl, postContent, emotion, period) => {
  try {
    const diaryRef = doc(db,`${uid}`,'diary', `${period}`,`${date}`)
    await setDoc(diaryRef, 
    {  
      date,
      imgUrl,
      postContent,
      emotion
    }, 
    { merge: true})
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export const diaryUploadImgAPI = async (file, uid, date) => {
  try{
    // 取出file 實例
    const fileData = file.file
    // 設定要儲存的地方以及名稱
    const storageReference = storageRef(storage, `${uid}/images/${date}`)
    // 圖片上傳到firebase  storage
    const snapshot = await uploadBytes(storageReference, fileData);

    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL
  } catch (e) {
    console.error("圖片上傳失敗：", e);
  }
}

export const diaryDelImgAPI = async (uid, date) => {
  const diaryImgRef = storageRef(storage, `${uid}/images/${date}`)
  try{
    await deleteObject(diaryImgRef)
  }catch(e){
    console.log(e)
  }
}

export const diaryGetDiaryAPI = async (uid, date, period) => {
  try{
    const diaryRef = collection(db, `${uid}/diary/${period}`)
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

export const diaryDelDiaryAPI = async (uid, date, period) => {
  const diaryRef = doc(db, `${uid}/diary/${period}/${date}`)
  try{
    await deleteDoc(diaryRef)
  }catch(e){
    // not yet deal with error
    console.log(e)
  }
}


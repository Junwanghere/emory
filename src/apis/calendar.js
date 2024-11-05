import { setDoc , collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { storage, db, } from '@/firebase';
import {  ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export const calendarGetEmotionsAPI = async (uid, year, month) => {
  try{
    const period = `${year}年${month}月`
    const diaryRef = collection(db, `${uid}`, 'diary', `${period}`)
    const querySnapshot = await getDocs(diaryRef);
    // 原本無資料會得到空陣列，透過傳null讓前端好做邏輯判斷
    if(querySnapshot.empty){
      return null
    }else {
      // 一天只會有一筆日記，這裡面會是一個陣列
      querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data())
      })
      return querySnapshot.docs
    }
  } catch(e) {
    // 尚未處理提示獲取資料出錯的情況
    console.log('有地方出錯了',e)
  }
}
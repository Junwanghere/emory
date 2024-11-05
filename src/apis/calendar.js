import { setDoc , collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { storage, db, } from '@/firebase';
import {  ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export const calendarGetEmotionsAPI = async (uid, year, month) => {
  try{
    const diaryRef = collection(db, `${uid}`)
    const start = `${year}年${month}月`
    const end = `${year}年${month + 1}月`
    const q = query(diaryRef, where('date', '>=', '2024年11月'), where('date', '<', '2024年12月'))
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    // 原本無資料會得到空陣列，透過傳null讓前端好做邏輯判斷
    if(querySnapshot.empty){
      return null
    }else {
      // 一天只會有一筆日記，這裡面會是一個陣列
      return querySnapshot.docs
    }
  } catch(e) {
    // 尚未處理提示獲取資料出錯的情況
    console.log('有地方出錯了',e)
  }
}
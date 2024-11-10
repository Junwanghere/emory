import {  collection, getDocs, query, where } from 'firebase/firestore';
import { db, } from '@/firebase/firebase';

export const calendarGetEmotionsAPI = async (uid, startDate, endDate) => {
  try{
    const diaryRef = collection(db,'users' ,`${uid}`, 'diary')
    const q = query(diaryRef, where('indexDate', '>=', `${startDate}`), where('indexDate', '<=', `${endDate}`))
    const querySnapshot = await getDocs(q);
    // 原本無資料會得到空陣列，透過傳null讓前端好做邏輯判斷
    if(querySnapshot.empty){
      return null
    }else {
      // 一天只會有一筆日記，這裡面會是一個陣列
      const data = []
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
      })
      return data
    }
  } catch(e) {
    // 尚未處理提示獲取資料出錯的情況
    console.log('有地方出錯了',e)
  }
}
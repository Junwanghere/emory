import {  collection, getDocs } from 'firebase/firestore';
import { db, } from '@/firebase';

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
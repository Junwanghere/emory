import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'




export const authRegisterAPI = async (email, password) => {
  try{
    const auth = getAuth();
    // 註冊用戶
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user  
    return user
  }catch(error){
    const errorCode = error.code;
    switch (errorCode) {
      case 'auth/email-already-in-use':
        console.log('已註冊過')
        // 應該直接跳轉到登入頁面
        break;
      case 'auth/invalid-email':
        console.log('不是有效的email')   
        break;   
      default:
        console.log(errorMessage)  
    }
    // console.log(errorCode, errorMessage)
  }
}

export const authLoginAPI = async (email, password) => {
  try{
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user  
    return user
  }catch(error){
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  }
}
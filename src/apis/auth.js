import { getAuth,signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider,signInWithPopup } from 'firebase/auth'
import { auth } from '@/firebase';



export const authRegisterAPI = async (email, password) => {
  try{
    // 註冊用戶
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user  
    return '註冊成功'
  }catch(error){
    const errorCode = error.code;
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return '已註冊過'
      case 'auth/invalid-email':
        return '不是有效的email'
      default:
        return errorMessage  
    }
    // console.log(errorCode, errorMessage)
  }
}

export const authLoginAPI = async (email, password) => {
  try{
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user  
    return user
  }catch(error){
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  }
}

//目前試不成功
export const signInWithGoogleAPI = () => {
  const provider = new GoogleAuthProvider()
  signInWithRedirect(auth, provider);
}

export const signInWithPopupAPI = () => {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      return user
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

}

export const logOutAPI = async () => {
  try{
    await signOut(auth)
  }catch(e){
    console.log('登出失敗')
  }
}
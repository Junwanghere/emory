import { getAuth,signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider,signInWithPopup } from 'firebase/auth'




export const authRegisterAPI = async (email, password) => {
  try{
    // 註冊用戶
    const auth = getAuth();
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

//目前試不成功
export const signInWithGoogleAPI = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider()
  signInWithRedirect(auth, provider);
}

export const signInWithPopupAPI = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
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
    const auth = getAuth();
    await signOut(auth)
    console.log('登出成功')
  }catch(e){
    console.log('登出失敗')
  }
}
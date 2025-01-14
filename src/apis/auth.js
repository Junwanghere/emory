import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";

export const authRegisterAPI = async (email, password) => {
  try {
    // 註冊用戶
    await createUserWithEmailAndPassword(auth, email, password);
    return "註冊成功";
  } catch (error) {
    const errorCode = error.code;
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "已註冊過";
      case "auth/invalid-email":
        return "不是有效的email";
      default:
        return error.message;
    }
    // console.log(errorCode, errorMessage)
  }
};

export const authLoginAPI = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
};

//目前試不成功
export const signInWithGoogleAPI = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
};

export const signInWithPopupAPI = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      GoogleAuthProvider.credentialFromResult(result);
      // The signed-in user info.
      const user = result.user;
      return user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch(() => {});
};

export const logOutAPI = async () => {
  try {
    await signOut(auth);
  } catch {
    console.log("登出失敗");
  }
};

import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
        return "註冊發生錯誤，請稍後再試";
    }
  }
};

export const authLoginAPI = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;
  return user;
};

export const signInWithPopupAPI = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      return user;
    })
    .catch(() => {});
};

export const logOutAPI = async () => {
  await signOut(auth);
};

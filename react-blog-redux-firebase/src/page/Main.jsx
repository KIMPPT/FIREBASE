import React from "react";
import { auth, db } from "../database/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
export default function Main() {
  // 유저 추가 함수
  //user{uid,email}
  const addUser = async (user) => {
    await setDoc(doc(db, "users", user.uid), user);
  };
  //유저 확인 함수-firestore 작성
  const checkUser = async (user) => {
    const docRef = await getDoc(doc(db, "users", user.uid));
    //exists()함수는 getDoc을 통해 가져온 값이 있으면 true, 없으면 false
    if (!docRef.exists()) {
      addUser(user);
    } else {
      console.log("가입되어 있습니다");
    }
  };
  //구글 로그인 함수
  const onGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // 구글로 로그인 후 정보값을 가져옴
        const user = result.user;
        console.dir(user);
        //로그인했다면, uid를 확인 후 firestore에 저장
        addUser({ uid: user.uid, emial: user.email });
                
        // 유저를 확인하기 위한 함수
        checkUser({uid : user.uid, email : user.email});
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div>
      <h3>Main</h3>
      <button onClick={onGoogleLogin}>구글로 로그인</button>
      <h2>{}님 환영합니다</h2>
    </div>
  );
}

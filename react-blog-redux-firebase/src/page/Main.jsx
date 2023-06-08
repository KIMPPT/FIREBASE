import React, { useState } from "react";
import { auth, db } from "../database/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { checkUser, loginUser } from "../slice/userSlice";
export default function Main() {
  //화면에 보이기 위한 state 사용
  // const [uset,setUser]=useState();
  //화면에 출력하고 공통으로 데이터를 사용하기 위해 Redux 사용
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  /*
  // 유저 추가 함수 - firebase 작성 : 밑에 추가를 해줬기 때문에 주석처리
  //user{uid,email}
  const addUser = async (user) => {
    await setDoc(doc(db, "users", user.uid), user);
  };
   */
  /*
  //유저 확인 함수-firestore 작성
  const checkUser = async (user) => {
    const docRef = await getDoc(doc(db, "users", user.uid));
    //exists()함수는 getDoc을 통해 가져온 값이 있으면 true, 없으면 false
    if (!docRef.exists()) {
      // 유저 추가 함수 - firebase 작성
      //user{uid,email}
      await setDoc(doc(db, "users", user.uid), user);
    } else {
      console.log("가입되어 있습니다");
    }
    //회원가입인지, 로그인인지 확인 후 로그인
    dispatch(loginUser(user))
  };
   */
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
        //addUser({ uid: user.uid, emial: user.email });

        // 유저를 확인하기 위한 함수
        //checkUser({ uid: user.uid, email: user.email });
        dispatch(checkUser({ uid: user.uid, email: user.email }));
        console.log(user)
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
      <h2>{user && user.email}님 환영합니다</h2>
    </div>
  );
}

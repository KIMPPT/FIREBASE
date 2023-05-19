import React, { useState } from "react";
//firebase.js에서 만든 firebase 초기화하면서 들고온 auth
import { auth } from "../database/firebase";
//firebase에서 제공하는 함수(method) 가져옴
import { createUserWithEmailAndPassword } from "firebase/auth";
export default function LoginForm() {
  //input 태그에 있는 값을 가져오는 state
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  //react가 실행되는 동안에 저장될 user데이터
  //accessToken은 세션이나 브라우저에 저장해서 로그인확인
  //{email,uid,displayName}
  const [user, setUser] = useState(null);

  //onEmailLogin 함수(method)
  const onEmailLogin = (e) => {
    e.preventDefault();
    //google에서 제공하는 함수(method)
    createUserWithEmailAndPassword(auth, email, password)
      //회원가입에 성공했을 때
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
        // ...
      })
      //회원가입에 실패했을 때
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };
  return (
    <div>
      <h3>로그인 폼입니다</h3>
      <form onSubmit={onEmailLogin}>
        <label>이메일</label>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <label>비밀번호</label>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <input type="submit" value="회원가입" />
      </form>
      <h3>{user ? user.email : "로그인되지않았습니다"}</h3>
    </div>
  );
}

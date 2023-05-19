import React, { useState } from "react";
//firebase.js에서 만든 firebase 초기화하면서 들고온 auth
import { auth } from "../database/firebase";
//firebase에서 제공하는 함수(method) 가져옴
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
export default function LoginForm() {
  //input 태그에 있는 값을 가져오는 state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //react가 실행되는 동안에 저장될 user데이터
  //accessToken은 세션이나 브라우저에 저장해서 로그인확인
  //{email,uid,displayName}
  const [user, setUser] = useState(null);

  //onEmailLogin 회원가입 함수(method)
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
        if (errorCode == "auth/email-already-in-use") {
          //alert를 이용하여 알려주거나, 태그를 이용해 알려줌
          alert("동일한 이메일 입니다");
        } else if (errorCode == "auth/weak-password") {
          alert("비밀번호가 너무 짧습니다");
        }
        // ..
      });
  };
  //onClickLogin 로그인 함수(method)
  const onClickLogin = () => {
    //async-await 사용해서 firebasemethod 사용-비동기함수로 사용
    //비동기 함수로 만들기
    async function getLogin() {
      //오류가 날 가능성이 있는 모든 코드를 작성
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user);
      } catch (error) {
        //오류가 났을 때 실행할 코드
        /*오류가 나면 화면이 멈추는 것이 아니라 catch를 실행하고 다른 아래쪽의 코드를 실행 */
        console.log("에러입니다");
        if (
          error.code == "auth/user-not-found" ||
          error.code == "auth/wrong-password"
        ) {
          alert("없는 이메일이거나 비밀번호가 잘못되었습니다");
        }
      }
    }
    //위에 만든 함수를 실행해줘야함. 위에 식만으로는 실행이 안됨
    getLogin();
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
      <button type="button" onClick={onClickLogin}>
        로그인
      </button>
      <h3>{user ? user.email : "로그인되지않았습니다"}</h3>
    </div>
  );
}

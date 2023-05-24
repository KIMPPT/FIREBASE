import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../database/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { userLogin } from "../slice/userSlice";
import { userLogout } from "../slice/userSlice";
export default function Home() {
  const dispatch = useDispatch();
  //로그인을 하고 redux에 저장한 값은 새로고침 전까지 유지
  const user = useSelector((state) => state.user);
  const user1 = useSelector((state) => state.user.user);
  //새로고침할 때, auth에 로그인이 되어있는지 확인하고
  //로그인이 되어있다면 값을 가져온다
  /*
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        dispatch(
          userLogin({
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            photo: user.photoURL,
          })
        );
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  */

  //새로고침 했을 때 session 값은 살아있다
  //단, 페이지가 완전히 꺼지면 값은 사라진다
  //각 데이터마다 살아있는 기간을 확인하여 사용
  useEffect(() => {
    const UserData = sessionStorage.getItem("user");
    if (UserData)
      //UseData값이 있을 때 저장 : 한번 로그인 했다
      //문자열에서 객체로 바꿔서 사용
      dispatch(userLogin(JSON.parse(UserData)));
    console.log(user);
  }, []);

  //로그아웃 함수
  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch(userLogout());
        //전체 삭제
        sessionStorage.clear();
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div>
      <h3>Home</h3>
      <Link to="/login">로그인창으로 이동</Link>
      <button onClick={logout}>로그아웃</button>
      <p>{user.user && user.user.name}</p>
      <img src={user1 && user1.photo} alt="" />
    </div>
  );
}

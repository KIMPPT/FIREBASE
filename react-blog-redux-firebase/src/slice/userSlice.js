import { createSlice } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../database/firebase";

export const userSlice = createSlice({
  name: "user", //name은 반드시 문자열로 작성. store.js에서도 쓰이기 때문에 기록해두거나 옆에 띄워야함
  initialState: {
    email: "",
    uid: null,
  },
  reducers: {
    //state의 값을 바꾸는 함수
    //로그인 했을 때 값을 넣는 reducer
    loginUser: (state, action) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      /*
            state=action.payload;
            state자체에 바로 값을 넣을 수 없다. 넣고자 한다면 return으로 전달해야한다
            */
    },
    //로그아웃 했을 대 stsate의 값을 바꾸는 reducer
    logoutUser: (state) => {
      state.email = "";
      state.uid = null;
    },
  },
});

//비동기함수를 사용하기 위한 thunk 함수
//dispatch는 action함수를 사용하기 위한 함수
//비동기함수 action에서 값을 가져 올 때 첫번째 값에 매개변수를 사용
export const checkUser = (user) => async (dispatch) => {
  const docRef = await getDoc(doc(db, "users", user.uid));
  //exists()함수는 getDoc을 통해 가져온 값이 있으면 true, 없으면 false
  if (!docRef.exists()) {
    // 유저 추가 함수 - firebase 작성
    //user{uid,email}
    await setDoc(doc(db, "users", user.uid), user);
  } else {
    console.log("가입되어 있습니다");
  }
};

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

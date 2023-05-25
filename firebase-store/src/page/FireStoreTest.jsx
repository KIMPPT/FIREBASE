import React, { useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";
export default function FireStoreTest() {
  //시작하자마자 값 가져오기
  useEffect(() => {
    //비동기함수로 작성하셔 값 가져옴
    async function getData() {
      //getDocs를 통해서 컬렉션 안의 모든 문서를 가져옴
      const querySnapshot = await getDocs(collection(db, "users"));
      //forEach를 통해서 모든 문서값에 접근하여 원하는 값을 가져온다
      querySnapshot.forEach((doc) => {
        //doc.id와 doc.data()값을 redux/state에 저장하여
        //웹에서 사용
        console.log(`${doc.id} => ${doc.data().admin}`);
      });
    }
    getData();
  }, []);
  const addDocData = async () => {
    try {
      //서버에 연결해서 사용하는 것은 비동기 함수로 작성(async-await)
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div>
      <h3>Firestore의 값을 추가, 가져옴 확인</h3>
      <p>users컬렉션 확인</p>
      <button onClick={addDocData}>버튼을 누르면 firestore에 값 추가</button>
    </div>
  );
}

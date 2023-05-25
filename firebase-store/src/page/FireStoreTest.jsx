import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";
export default function FireStoreTest() {
  const [users, setUsers] = useState();
  //시작하자마자 값 가져오기
  useEffect(() => {
    //비동기함수로 작성하셔 값 가져옴
    getData();
  }, []);

  async function getData() {
    //getDocs를 통해서 컬렉션 안의 모든 문서를 가져옴
    const querySnapshot = await getDocs(collection(db, "users"));
    //forEach에서 출력한 모든 값을 배열에 담음
    let dataArray = [];
    //forEach를 통해서 모든 문서값에 접근하여 원하는 값을 가져온다
    querySnapshot.forEach((doc) => {
      //doc.id와 doc.data()값을 redux/state에 저장하여
      //웹에서 사용 > forEach의 모든 내용을 배열로 저장
      //배열에 계속해서 추가한다. 안에 set을 넣으면 forEach에 의해 console까지 반복하는데 그러면 앞의 값을 계속해서 덮는다
      dataArray.push(doc.data()); 
      console.log(`${doc.id} => ${doc.data().admin}`);
    });
    setUsers(dataArray); //이것을 기준으로 화면이 바뀐다
  }

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
    getData();
  };
  return (
    <div>
      <h3>Firestore의 값을 추가, 가져옴 확인</h3>
      <p>users컬렉션 확인</p>
      <button onClick={addDocData}>버튼을 누르면 firestore에 값 추가</button>
      <br />
      {users &&
        users.map((x) => (
          <div>
            <p>
              {x.first},{x.born}
            </p>
          </div>
        ))}
    </div>
  );
}

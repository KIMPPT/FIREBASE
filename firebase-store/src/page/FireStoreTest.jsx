import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../database/firebase";
export default function FireStoreTest() {
  const [users, setUsers] = useState();
  //가져올 값을 개별 state로 가져오기
  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [born, setBorn] = useState();
  //변경할 값을 state로 가져오기
  const [updateFirst, setUpdateFirst] = useState();
  //시작하자마자 값 가져오기
  useEffect(() => {
    //비동기함수로 작성하셔 값 가져옴
    getData();
  }, []);
  //getData함수의 이유 : 이벤트를 실행했을 때 실시간으로 추가나 삭제를 보여줌
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
      //id 값을 함께 넣어주기 위해서 새로운 객체 생성
      //id는 doc.id, 객체인 doc.data()는 ...(스프레드연산자)를 통해
      //그 안에 있는 값을 꺼내서 객체로 다시 만들어서 넣음
      dataArray.push({
        id: doc.id,
        ...doc.data(),
      });
      console.log(`${doc.id} => ${doc.data().admin}`);
    });
    setUsers(dataArray); //이것을 기준으로 화면이 바뀐다
  }

  const addDocData = async () => {
    try {
      //서버에 연결해서 사용하는 것은 비동기 함수로 작성(async-await)
      const docRef = await addDoc(collection(db, "users"), {
        first,
        last,
        born: parseInt(born),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    getData();
  };
  //id값을 가져와서 삭제
  const deleteData = async (id) => {
    //doc(db,컬렉션이름,id)로 하나의 문서를 찾을 수 있다
    await deleteDoc(doc(db, "users", id));
    getData();
  };
  //id값을 가져와서 내용 업데이트
  const updateData = async (id) => {
    //수정할 필드의 값을 객체형태로 넣어줌
    await updateDoc(doc(db, "users", id), {
      first: updateFirst,
    });
    getData();
  };
  return (
    <div>
      <h3>Firestore의 값을 추가, 가져옴 확인</h3>
      <p>users컬렉션 확인</p>
      <label htmlFor="">first</label>
      <input type="text" onChange={(e) => setFirst(e.target.value)} />

      <label htmlFor="">last</label>
      <input type="text" onChange={(e) => setLast(e.target.value)} />

      <label htmlFor="">born</label>
      <input type="number" onChange={(e) => setBorn(e.target.value)} />
      <button onClick={addDocData}>버튼을 누르면 firestore에 값 추가</button>
      <br />
      {users &&
        users.map((x) => (
          <div>
            <p>
              {x.id},{x.first},{x.born}
              <button onClick={() => deleteData(x.id)}>X</button>
              <input
                type="text"
                onChange={(e) => setUpdateFirst(e.target.value)}
              />
              <button onClick={() => updateData(x.id)}>first 수정</button>
            </p>
          </div>
        ))}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  getDoc,
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
  //검색할 last 값 state로 가져오기
  const [searchLast, setSearchLsat] = useState();
  //검색된 state
  const [searchUser, setSearchUser] = useState();
  //유저 uid값이 문서의 id값 일 때, 문서의 값을 찾아올 수 있는지 확인
  useEffect(() => {
    async function getUserData() {
      //doc()를 통해서 값을 찾을 때, getDoc를 통해서 한개의 값을 들고옴
      const querySnapshot = await getDoc(
        doc(db, "userList", "H33piVeLqqYtuAeGaIkok2Krth93")
      );
      //바로 값을 들고오므로 forEach 사용하지 않음
      console.log(querySnapshot.data());
    }
    getUserData();
  }, []);
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
  //단일 쿼리를 이용하여 값 찾기
  const onsearch = async () => {
    //where에서 하나를 이용한 단일 쿼리
    //문자열에서 특정 문자열을 찾을 수 없다
    //데이터를 세부적으로 사용 > 따로 서버를 만들어서 SQL 또는 noSQL을 사용
    const q = query(
      collection(db, "users"),
      where("last", "==", searchLast),
      where("born", ">", 1800)
    );
    //복합 쿼리문은 firebase 콘솔에서 색인(index)에서 설정해야 쓸 수 있다
    //작성한 쿼리 객체를 getDocs를 이용하여 가져옴
    const querySnapshot = await getDocs(q);
    let dataArray = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      dataArray.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setSearchUser(dataArray);
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
      <br />
      <hr />
      <label>last검색</label>
      <input type="text" onChange={(e) => setSearchLsat(e.target.value)} />
      <button onClick={onsearch}>검색하기</button>
      <hr />
      {
        //검색결과 출력
        searchUser &&
          searchUser.map((user) => (
            <div>
              <p>
                {user.first},{user.last},{user.born}
              </p>
            </div>
          ))
      }
      <hr />
      <button onClick={addDocData}>버튼을 누르면 firestore에 값 추가</button>
      <br />
      {users &&
        users.map((x) => (
          <div>
            <p>
              {x.id},{x.first},{x.born},{x.last}
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

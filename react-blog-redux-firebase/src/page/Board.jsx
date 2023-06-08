import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { db } from "../database/firebase";
import {
  Timestamp,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
export default function Board() {
  const user = useSelector((state) => state.user);

  const [boards, setBaords] = useState();
  useEffect(() => {
    //boards 컬렉션의 값 가져오기
    const getBoards = async () => {
      const q = query(collection(db, "boards"), orderBy("writeTime","desc"));
      const querySnapshot = await getDocs(q);
      //state를 사용하지 않은 값들은 업데이트시 화면에 표시되지 않는다
      let dataArray = [];
      querySnapshot.forEach((doc) => {
        let data = {
          id: doc.id,
          uid: doc.data().uid,
          title: doc.data().title,
          writeTime: doc.data().writeTime,
          email: doc.data().email,
        };
        dataArray.push(data);
        console.log(doc.id, " => ", doc.data());
      });
      setBaords(dataArray);
    };
    getBoards();
  }, []);
  return (
    <div>
      <h3>게시물</h3>
      {user.uid && <Link to="/board-write-form">글 작성하기</Link>}
      <ul>
        <Link to="">
          <li>게시물 이름, 작성자, 시간</li>
        </Link>
        {boards &&
          boards.map((board) => (
            <Link to={`/board/${board.id}`} key={board.id}>
              <li>
                {board.title},{board.uid},{board.writeTime.toDate().getHours()}:
                {board.writeTime.toDate().getMinutes()},{board.email}
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
}

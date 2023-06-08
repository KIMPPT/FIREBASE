import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../database/firebase";

export default function BoardWriteForm() {
  const user = useSelector((state) => state.user);

  //게시물 작성값 state에 저장
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate=useNavigate();
  //게시물 작성 후 추가
  const addBoard = async(e) => {
    e.preventDefault();
    //작성된 값 firebase에 추가
    //addDoc을 이용하면 id 값이 랜덤    
    await addDoc(collection(db,"boards"),
    {uid:user.uid,title:title,content:content,writeTime:new Date(),email:user.email})
    //docRef를 통해서 firebase에 들어간 문서를 가져온다
    ///docRef.id를 가져 올 수 있다
    //> 만약 게시물 작성 후에 자신이 작성한 게시물로 이동할 경우 필요
    //board로 이동
    navigate('/board')
  };
  return (
    <div>
      <h3>게시글 작성</h3>
      <p>작성자 : {user.email}</p>
      <form onSubmit={addBoard}>
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
        <br />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <button type="submit">작성</button>
      </form>
    </div>
  );
}

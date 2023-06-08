import logo from './logo.svg';
import './App.css';
import {Route,Routes} from 'react-router-dom'
import Main from './page/Main';
import Board from './page/Board';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginUser } from './slice/userSlice';
function App() {

  const dispatch=useDispatch();
  //하면을 새로고침(F5)할 때마다 확인
  //app.js 컴포넌트는 한번 마운트되고 새로고침 또는 꺼질때 까지 마운트되지 않는다
  useEffect(()=>{
    const user=JSON.parse(sessionStorage.getItem('user'))
    if(user){dispatch(loginUser(user))}
  },[])
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/board'element={<Board/>}/>
      </Routes>
    </div>
  );
}

export default App;

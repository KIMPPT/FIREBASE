import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import FireStoreTest from "./page/FireStoreTest";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/firestore" element={<FireStoreTest/>}/>
      </Routes>
    </div>
  );
}

export default App;

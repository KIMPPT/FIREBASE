import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//안에 있는 값을 꺼내지 않고 바로 실행
//9버전(모듈형)을 쓸 때는 아래와 같이 쓸 필요 없음. 즉, 그 미만인 8버전까지는 아래에 있는 import 를 써야함
import "./database/firebase";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

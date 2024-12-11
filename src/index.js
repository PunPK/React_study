import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// // เก็บการเรียกใช้ root รูปแบบ immutable (แก้ไขไม่ได้) ต้องสร้างใหม่มาทับเท่านั้น
// const root = ReactDOM.createRoot(document.getElementById('root'));
// //const showTime = () => {
// root.render(
//   <React.StrictMode>
//   <div>
//     {/* <h1>Hello, world!</h1>
//     <h2>It is {new Date().toLocaleTimeString()}.</h2> */}
//   </div>
//   </React.StrictMode>,
//   document.getElementById('root')
//  );
// //}

// //setInterval(showTime,1000) //รีเว็บทุก 1 วินาที และ เรน เฉพาะที่เปลี่ยนแปลง

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

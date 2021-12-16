import App from "./App.js";
import ReactDOM from "react-dom";
import React from 'react';
import { Link } from "react-router-dom";
import  Cookie  from "react-cookies"

//import store from "./store";
//import { Provider } from "react-redux";

// const Check = (props) => {
    
//     if(props == null){
//         console.log(Cookie.load('useremail'));
//         return null;
//     }else{
//         console.log(Cookie.load('useremail'));
//         return <App />
//     }
    

// }

function test(){
    location.href = "/api/checkSession"
    
}

if(Cookie.load('useremail') != null){
ReactDOM.render(
    <App />
    ,
    document.getElementById("root")
);
}else{
    test()
    alert('로그인이 필요합니다.')
    

    
    
}
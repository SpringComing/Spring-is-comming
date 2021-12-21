import React from "react";
import cookie from 'react-cookies'

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

class Info extends React.Component {


  render() {
  
    return (
      <React.Fragment>

        <div className="name-user">{cookie.load('useremail')}</div>
        <div className="avatar-user">
          
       
        
        <div className="dropdown">
  {/* <button onClick={myFunction} className="dropbtn">Dropdown</button> */}
  <img className="dropbtn" src={require("../../../assets/img/thompson.jpg")} onClick={myFunction}/>
  <div id="myDropdown" className="dropdown-content">
    <a href="#">Profile</a>
    <a href="http://localhost:8080/logout">Logout</a>
  </div>
</div>
 
        </div>
      </React.Fragment>
    );
  }

}

function test(){
  console.log('테스트');
}

export default Info;

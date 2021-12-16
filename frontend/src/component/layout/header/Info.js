import React from "react";
import cookie from 'react-cookies'

class Info extends React.Component {


  render() {
  
    return (
      <React.Fragment>
        <div className="name-user">{cookie.load('useremail')}</div>
        <div className="avatar-user">
          
          <img src={require("../../../assets/img/thompson.jpg")} onClick={test}/>
        </div>
      </React.Fragment>
    );
  }

}

function test(){
  console.log('테스트');
}

export default Info;

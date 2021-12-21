import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import SiteLayout from "../layout/SiteLayout"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" 
crossorigin="anonymous"/>

const Profile = () => {

    const [profile, setProfile] = useState([]);    
    const [editable, setEditable] = useState(1);    
    const [profileeditable, setProfileEditable] = useState(1);
    const[checkName, setCheckName] = useState();
    const[buttonType, setButtonType] = useState("Edit");

    const handleChange = (e) => {
      var profileBox = []

      for(var i = 0; i<profile.length; i++){
        if(i == 3){
          profileBox.push(e.target.value)
        }else{
          profileBox.push(profile[i])
        }
      }
        setProfile(profileBox);
    }

    const onChange = (e) =>{
      var profileBox = []
      
      for(var i = 0; i<profile.length; i++){
        if(i == 0){
          profileBox.push(e.target.value)
        }else{
          profileBox.push(profile[i])
        }
      }

      setProfile(profileBox)

    }

    const profileChange = (e) =>{
      var profileBox = []
      for(var i = 0; i<profile.length; i++){
        if(i == 5){
          profileBox.push(e.target.value)
        }else{
          profileBox.push(profile[i])
        }
      }
        setProfile(profileBox);
    }

    useEffect(async () => {  

        try {
          const response = await fetch('/api/profile', {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',   // cf. application/x-www-form-urlencoded
              'Accept': 'application/json'          // cf. text/html
            },        
            body: null
          });
    
          if(!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          const jsonResult = await response.json();
          if(jsonResult.result !== 'success') {
            location.href = "/api/checkSession"
            alert('세션이 만료되었습니다!')
            throw new Error(`${jsonResult.result} ${jsonResult.message}`);
          }

          const profileBox = []
          profileBox.push(jsonResult.data.name);
          profileBox.push(jsonResult.data.email);
          profileBox.push(jsonResult.data.tel);
          profileBox.push(jsonResult.data.birth);
          profileBox.push(jsonResult.data.join_date);
          profileBox.push(jsonResult.data.profile);
          setProfile(profileBox)
          
          console.log(jsonResult.data);

          


        } catch (err) {
          console.error(err);
        }
      }, []);

    return (
        <SiteLayout>
            <section className="kanban__nav">
                <div className="kanban__nav-wrapper">
                    <div className="kanban__nav-name">
                    <div className="kanban-name">Studio Settings</div>
                    </div>
                </div>

                
            </section>
            <section className="kanban__main">
                <div className="kanban__main-wrapper" />
                <div className="container" style={{
                    marginLeft : "2%"
                }}>
        <div className="main-body" >
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="main-breadcrumb">
            <ol className="breadcrumb" style={{
                width: "100%",
                backgroundColor:"#FFFFE0"
            }}>
              <li className="breadcrumb-item" ><a href="/profile" style={{ color: "#5D5D5D", fontWeight: "bold" }}>Profile</a></li>
            </ol>
          </nav>
          {/* /Breadcrumb */}
          <div className="row gutters-sm">
            <div className="col-md-3 mb-3">
              <div className="card">
                <div className="card-body" style={{
                    height:"500px"
                }}>
                  <div className="d-flex flex-column align-items-center text-center" style={{
                      marginTop: "55px"
                  }}>
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width={150} />
                    <div className="mt-3">
                      <h4>{profile[0]}</h4><br />
                      <input style={
                        {width:"200px",
                      height:"100px",
                      backgroundColor: "#FFFFF8"}
                      } value={profile[5] || ''} disabled={profileeditable} onChange={profileChange}></input> <br />
                      <p style={{color:"black", borderColor:"black",marginTop:"10px" ,marginLeft:"150px", height:"20px", fontSize:"10px",fontWeight:"bold" ,paddingTop:"3px"}} className="btn btn-outline-primary" onClick={profileEdit}>{buttonType}</p>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="col-md-8">
              <div className="card mb-3" style={{
                  width:"113%"
              }}>
                <div className="card-body" style={{
                    height:"500px"
                }}><center><span style={{
                    fontWeight: "bold",
                    fontSize: "30px"
                }}>Profile</span></center>
                    <br /><br />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input value={profile[0] || ''} disabled={editable} id="name" onChange={onChange}></input> &nbsp;&nbsp;&nbsp;<span style={{color:'red'}}>{checkName}</span>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input value={profile[1] || ''} disabled></input>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Tel</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    <input value={profile[2] || ''} disabled></input> &nbsp;&nbsp;&nbsp;<span style={{color:"blue"}}>인증완료</span>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Birth</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    <input type="date" value={profile[3] || ''} disabled={editable} onChange={handleChange}></input>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Join Date</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    <input value={profile[4] || ''} disabled ></input>
                    </div>
                  </div>
                  <hr />
                  <br />
                  <div className="row" style={{
                      textAlign : "center"
                  }}>
                    <div className="col-sm-12">
                      <button className="btn btn-info " style={{background:"#C0C0C0", borderColor: "#C0C0C0", color: "black"}}
                       target="__blank" onClick={edit}>수정</button>&nbsp;
                      <button className="btn btn-info " style={{background:"#C0C0C0", borderColor: "#C0C0C0", color: "black"}}target="__blank" onClick={save}>저장</button>
                    </div>
                  
                  </div>
                </div>
              </div>
              
                
             
            </div>
          </div>
        </div>
      </div>
            </section>
            
        </SiteLayout>
    );

    function edit(){
        setEditable(0)
    }

    function profileEdit(e){

        if(buttonType == "Edit"){
          setButtonType("저장")
          setProfileEditable(0)
        }else{
          setButtonType("Edit")
          setProfileEditable(1)
          changeProfile(profile)
        }
    }

    function save(){
        var reg_name = 	/^[가-힣a-zA-Z]+$/
        if(!reg_name.test(profile[0])){
          setCheckName('사용할 수 없는 이름 입니다.')


        }else{
          setEditable(1)
          setCheckName('')
          changeProfile(profile)
        }
    }


};

const changeProfile = async (profile) => {

    try {
        const response = await fetch(`/api/changeProfile`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name : profile[0],
                birth : profile[3],
                profile : profile[5]
                
            })
        });
        if(!response.ok) {
            throw  `${response.status} ${response.statusText}`;
        }
        const json = await response.json();
        if(!json.data) {
            return;
        }
  
    } catch (err) {
        console.error(err);
    }
  }


export default Profile;
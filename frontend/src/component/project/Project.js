import React,{ useState, useEffect }  from "react";
import SiteLayout from "../layout/SiteLayout"
import ProjectMain from "./ProjectMain"
import Nav from "./nav/Nav"
import ProjectAddModal from "./modal/ProjectAddModal";
//import projects2 from "../../assets/json/data.json"



/**
* 컴포넌트: Project
* 작성자: 성창현
* 책임: 프로젝트화면 기능 상태 컴포넌트
*/
const Project = () => {
  const [projects, setProjects] = useState([]);              //프로젝트 데이터 상태

  const [modalIsOpen, setModalIsOpen] = useState(false);     //모달 생성 상태

  /**
   * 함수: useEffect에 사용되는 익명함수 
   * 작성자: 성창현
   * 기능: fetch()사용하여 프로젝트 데이터 가져오기
   */
  useEffect(async () => {

    try {
      const response = await fetch('/api/project/1', {
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
        throw new Error(`${jsonResult.result} ${jsonResult.message}`);
      }

      setProjects(jsonResult.data);

    } catch (err) {
      console.error(err);
    }
  },[]);

  

    return (
      <SiteLayout>
        <Nav setModalIsOpen = { setModalIsOpen } />
        <ProjectMain projects={ projects }/>
        <ProjectAddModal modalIsOpen= {modalIsOpen} setModalIsOpen={setModalIsOpen}/>
      
      </SiteLayout>
    );
};

export default Project;


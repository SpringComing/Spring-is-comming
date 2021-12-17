import React,{ useState, useEffect }  from "react";
import SiteLayout from "../layout/SiteLayout"
import ProjectMain from "./ProjectMain"
import Nav from "./nav/Nav"
import ProjectAddModal from "./modal/ProjectAddModal";
import ProjectUpdateModal from "./modal/ProjectUpdateModal"
import ProjectPeopleModal from "./modal/ProjectPeopleModal"
//import projects2 from "../../assets/json/data.json"

/**
 * 컴포넌트: Project
 * 작성자: 성창현
 * 책임: 프로젝트화면 기능 상태 컴포넌트
 */
const Project = () => {
  const [projects, setProjects] = useState([]);                          //프로젝트들 데이터 상태
  const [project, setProject] = useState({});                            //설정할 프로젝트 데이터 상태
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);           //프로젝트 추가 모달 생성 상태
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);     //프로젝트 기본 설정 모달 생성 상태
  const [peopleModalIsOpen, setPeopleModalIsOpen] = useState(false);     //프로젝트 인원 설정 모달 생성 상태
  
  useEffect(() => { getProject() },[]); //project 초기데이터 가져오기

  /**
   * 함수: getProject 
   * 작성자: 성창현
   * 기능: fetch()사용하여 프로젝트 데이터 가져오기
   */
  const getProject = async () => {
    
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
  }
  
  /**
   * 함수: openModal 
   * 작성자: 성창현
   * 기능: modal 파라미터로 특정 Modal창 띄우기, project 상태 파라미터 no로 바꾸기
   */
  const openModal =  (no, modal) => {
    setProject(projects.filter((project) => project.no === no )[0]);
    modal === 'update' ? setUpdateModalIsOpen(true) : setPeopleModalIsOpen(true);
  }

    return (
      <SiteLayout>
        <Nav setModalIsOpen = { setAddModalIsOpen } />
        <ProjectMain projects={ projects } openModal={ openModal }/>

        <ProjectAddModal modalIsOpen= { addModalIsOpen } 
                         setModalIsOpen={ setAddModalIsOpen } 
                         getProject={ getProject }/>

        <ProjectUpdateModal modalIsOpen= { updateModalIsOpen } 
                            setModalIsOpen={ setUpdateModalIsOpen } 
                            project={ project }
                            getProject={ getProject }/>

        <ProjectPeopleModal modalIsOpen= { peopleModalIsOpen } 
                            setModalIsOpen={ setPeopleModalIsOpen } 
                            project={ project }
                            getProject={ getProject }/>
      </SiteLayout>
    );
};

export default Project;
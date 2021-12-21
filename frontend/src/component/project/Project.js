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
  const [people, setPeople] = useState([]);                              //프로젝트 인원 상태

  useEffect(() => { getProject() },[]); //project 초기데이터 가져오기

  /**
   * 함수: getProject 
   * 작성자: 성창현
   * 기능: fetch()사용하여 프로젝트 데이터 가져오기
   */
  const getProject = async () => {
    
    try {
      const response = await fetch('/api/project', {
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
        alert("세션이 만료 되었습니다.")
        throw new Error(`${jsonResult.result} ${jsonResult.message}`);
      }
      
      setProjects(jsonResult.data);

    } catch (err) {
      console.error(err);
    }
  }

  /**
    * 함수: getPeople 
    * 작성자: 성창현
    * 기능: 프로젝트 팀원의 데이터를 가져와서 상태에 반영 
    */
  const getPeople = async (projectNo) => {
    try {
        const response = await fetch("/api/project/people/" + projectNo, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // 통신 응답 받기 실패할 경우
        if (!response.ok) {
            alert("프로젝트 팀원 데이터 통신이 실패 했습니다. 다시 시도하세요");
            throw `response failed ${response.status} ${response.statusText}`;
        }

        const jsonResult = await response.json();

        // 팀원 데이터 가져오기 실패할 경우
        if (jsonResult.result !== 'success') {
            alert("프로젝트 팀원 데이터 통신이 실패 했습니다. 다시 시도하세요");
            throw new Error(`${jsonResult.result} ${jsonResult.message}`);
        }
        
        // 가져온 팀원 데이터 상태에 셋팅
        //console.log("jsonResult",jsonResult.data);
        setPeople(jsonResult.data);
        
    } catch (err) {
        console.error(err);
    }
  }

  /**
    * 함수: deleteUser 
    * 작성자: 성창현
    * 기능: 팀원을 프로젝트에서 제외 하기 위해 attend table의 유저 데이터를 삭제한다
    */
  const excludeUser = async (projectNo, userNo) => {
    try {
        const response = await fetch(`/api/project/people?projectNo=${projectNo}&userNo=${userNo}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // 통신 응답 받기 실패할 경우
        if (!response.ok) {
            alert("서버가 응답하지않습니다. 잠시만 기다려 주세요");
            throw `response failed ${response.status} ${response.statusText}`;
        }

        const jsonResult = await response.json();

        // 업데이트 실패시
        if (jsonResult.result !== 'success') {
            alert("서버에서 삭제가 실패했습니다. 다시 시도하세요");
            throw new Error(`${jsonResult.result} ${jsonResult.message}`);
        }
        
        //업데이트 성공시
        //console.log("jsonResult",jsonResult);
        setPeople(people.filter(user => user.no !== userNo) );

    } catch (err) {
        console.error(err);
    }
  }

  /**
    * 함수: deleteProject 
    * 작성자: 성창현
    * 기능: 프로젝트와 관련된 모든 데이터 삭제
    */
  const deleteProject = async (projectNo) => {
    try {
        const response = await fetch(`/api/project/${projectNo}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        // 통신 응답 받기 실패할 경우
        if (!response.ok) {
            alert("서버가 응답하지않습니다. 잠시만 기다려 주세요");
            throw `response failed ${response.status} ${response.statusText}`;
        }

        const jsonResult = await response.json();

        // 삭제 실패시
        if (jsonResult.result !== 'success') {
            alert("서버에서 삭제가 실패했습니다. 다시 시도하세요");
            throw new Error(`${jsonResult.result} ${jsonResult.message}`);
        }
        
        //삭제 성공시
        console.log("jsonResult",jsonResult);
        setProjects(projects.filter(project => project.no !== projectNo) );

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
                            getProject={ getProject }
                            deleteProject={ deleteProject } />

        <ProjectPeopleModal modalIsOpen= { peopleModalIsOpen } 
                            setModalIsOpen={ setPeopleModalIsOpen } 
                            project={ project }
                            people={ people }
                            getPeople={ getPeople }
                            excludeUser={ excludeUser }/>
      </SiteLayout>
    );
};

export default Project;

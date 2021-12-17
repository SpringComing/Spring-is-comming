import React, {useState, useEffect}  from "react";
import SiteLayout from "../layout/SiteLayout"
import KanbanMain from "./KanbanMain"
import Nav from "./nav/Nav"
//import processes2 from '../../assets/json/data.json';
import ProcessAddModal from "./modal/ProcessAddModal";
import ProcessUpdateModal from "./modal/ProcessUpdateModal"
import ProcessPeopleModal from "./modal/ProcessPeopleModal"

const Kanban = () => {
  const [processes, setProcesses] = useState([]);
  const projectNo = 1;
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);           //프로젝트 추가 모달 생성 상태
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);     //프로젝트 기본 설정 모달 생성 상태
  const [peopleModalIsOpen, setPeopleModalIsOpen] = useState(false);     //프로젝트 인원 설정 모달 생성 상태
  
  const addProcess = async () => {
    try {
      const response = await fetch(`/api/process`, {
          method: 'post',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              name: '프로세스',
              projectNo: projectNo
          })
      });

      if(!response.ok) {
          throw  `${response.status} ${response.statusText}`;
      }

      const json = await response.json();

      // insert가 안 된 경우
      if(!json.data) {
          return;
      }

      // insert가 된 경우
      let newProcesses = json.data;
      setProcesses(newProcesses);

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(async () => {
    try {
      const response = await fetch(`/api/process/${projectNo}`, {
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

      setProcesses(jsonResult.data);

    } catch (err) {
      console.error(err);
    }
  }, []);

  const openModal =  (no, modal) => {
    setProcesses({}, ...processes);
    modal === 'update' ? setUpdateModalIsOpen(true) : setPeopleModalIsOpen(true);
  }

  return (
      <SiteLayout>
        <Nav addProcess = { addProcess }/>
        <KanbanMain processes={processes} setProcesses={setProcesses} openModal={ openModal }/>

        
{/*<ProcessAddModal addProcess={ addProcess }/>
        <ProcessUpdateModal modalIsOpen= { updateModalIsOpen } 
                            setModalIsOpen={ setUpdateModalIsOpen } 
                            project={ project }
                            getProject={ getProject }/>

        <ProcessPeopleModal modalIsOpen= { peopleModalIsOpen } 
                            setModalIsOpen={ setPeopleModalIsOpen } 
                            project={ project }
                            getProject={ getProject }/>*/}
      </SiteLayout>
    );
};

export default Kanban;


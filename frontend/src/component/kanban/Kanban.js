import React, {useState, useEffect}  from "react";
import SiteLayout from "../layout/SiteLayout"
import KanbanMain from "./KanbanMain"
import Nav from "./nav/Nav"
//import processes2 from '../../assets/json/data.json';

const Kanban = () => {
  const [processes, setProcesses] = useState([]);
  const projectNo = 1;
  
  const addProcess = async () => {
    try {
      const response = await fetch(`/api/process`, {
          method: 'post',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              name: '새 프로세스',
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

  const reUploadProcesses = async() => {
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
  }

  useEffect(() => {reUploadProcesses()}, []); //컴포넌트 라이프사이클함수중에 didmount, willunmount 함수들과 같은효과

  const openModal =  (no, modal) => {
    setProcesses({}, ...processes);
    modal === 'update' ? setUpdateModalIsOpen(true) : setPeopleModalIsOpen(true);
  }

  return (
      <SiteLayout>
        <Nav addProcess = { addProcess }/>
        <KanbanMain key={projectNo} processes={processes} setProcesses={setProcesses} openModal={ openModal } reUploadProcesses={reUploadProcesses}/>
      </SiteLayout>
  );
}

export default Kanban;


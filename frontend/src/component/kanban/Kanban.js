import React, {useState, useEffect}  from "react";
import SiteLayout from "../layout/SiteLayout"
import KanbanMain from "./KanbanMain"
import Nav from "./nav/Nav"
//import processes2 from '../../assets/json/data.json';

const Kanban = () => {
  const [processes, setProcesses] = useState([]);
  useEffect(async () => {
    try {
      const response = await fetch('/api/process/1', {
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
    return (
      <SiteLayout>
        <Nav />
        <KanbanMain processes={processes} setProcesses={setProcesses}/>
      </SiteLayout>
    );
};

export default Kanban;


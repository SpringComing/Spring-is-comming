import React,{ useState, useEffect }  from "react";
import SiteLayout from "../layout/SiteLayout"
import ProjectMain from "./ProjectMain"
import Nav from "./nav/Nav"
//import projects2 from "../../assets/json/data.json"

const Project = () => {
  const [projects, setProjects] = useState([]);

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

      console.log(jsonResult);
      setProjects(jsonResult.data);

    } catch (err) {
      console.error(err);
    }
  }, []);

    return (
      <SiteLayout>
        <Nav />
        <ProjectMain projects={ projects }/>
      </SiteLayout>
    );
};

export default Project;


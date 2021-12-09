import React  from "react";
import SiteLayout from "../layout/SiteLayout"
import ProjectMain from "./ProjectMain"
import Nav from "./nav/Nav"

const Project = () => {
    return (
      <SiteLayout>
        <Nav />
        <ProjectMain />
      </SiteLayout>
    );
};

export default Project;


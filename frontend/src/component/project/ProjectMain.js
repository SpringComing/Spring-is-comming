import React from 'react';
import ProjectCard from "./ProjectCard.js";

const ProjectMain = () => {
    return (
        <section className="kanban__main">
          <div className={"kanban__main-wrapper"}>
            <ProjectCard />
          </div>
        </section>
    );
};

export default ProjectMain;
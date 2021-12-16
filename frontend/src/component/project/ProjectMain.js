import React from 'react';
import ProjectCard from "./ProjectCard.js";

const ProjectMain = ({ projects }) => {
    return (
        <section className="kanban__main">
           <div className="kanban__main-wrapper">
                { 
                    projects.map( project =>  <ProjectCard key={ project.no } project={ project }/> ) 
                }
            </div>
        </section>
    );
};

export default ProjectMain;
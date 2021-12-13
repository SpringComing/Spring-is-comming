import React from 'react';
import Description from './Description'

const ProjectCard = ({ project }) => {
    return (
        <div className="backlog-color card-wrapper">
            <div className="card-wrapper__header">
                <div className="backlog-name">{ project.name }</div>
                <div className="backlog-dots">
                    <i className="material-icons">clear</i>
                </div>
            </div>
            <div className="cards">
                <Description desc={ project.description }
                             startDate={ project.startDate }
                             endDate={ project.endDate } />
            </div>
        </div>
    );
};

export default ProjectCard;
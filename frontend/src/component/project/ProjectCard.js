import React from 'react';
import Description from './Description'

const ProjectCard = () => {
    return (
        <div className="backlog-color card-wrapper">
            <div className="card-wrapper__header">
                <div className="backlog-name">SpringCome</div>
            </div>
            <div className="cards">
                <Description />
            </div>
        </div>
    );
};

export default ProjectCard;
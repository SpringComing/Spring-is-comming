import React from 'react';
import Description from './Description'
import styles from '../../assets/css/component/project/ProjectCard.scss'

const ProjectCard = ({ project, openModal }) => {
    return (
        <div className="backlog-color card-wrapper">
            <div className="card-wrapper__header">
                <div className={ styles.backlog_name }>{ project.name }</div>
                <div className="backlog-dots" >
                    <div className="backlog-dots" 
                        onClick={ () => openModal(project.no, 'people') }>
                        <i className="material-icons">people</i>
                    </div>
                    <div className="backlog-dots" >
                        <i className="material-icons"></i>
                    </div>
                    <div className="backlog-dots" 
                        onClick={ () => openModal(project.no, 'update') }>
                        <i className="material-icons">settings</i>
                    </div>
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
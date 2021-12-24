import React, { Fragment } from 'react';
import Description from './Description'
import styles from '../../assets/css/component/project/ProjectCard.scss'


const ProjectSetting = (project, openModal) => {
    return(
        <Fragment>
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
        </Fragment>
    );
};


const ProjectCard = ({ project, openModal }) => {
    return (
        <div className="backlog-color card-wrapper">
            <div className="card-wrapper__header">
                <div className={ styles.backlog_name }>{ project.name }</div>
                <div className="backlog-dots" >

                    {
                        project.role === 'ADMIN' ? 
                            ProjectSetting(project,openModal)
                            :
                            null
                    }

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
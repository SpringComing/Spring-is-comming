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


/**
* 함수: setProjectno
* 작성자: 성창현
* 기능: 칸반 보드로 화면 전환
*/
const intoBoard =  (project,setProjectNo) => {
    if(project == null) {
        console.log("check1");
        return
    }
    console.log("check2", project.no);
    //setProjectNo(project.no) ;
    location.href = `/board/${project.no}`;

}


const ProjectCard = ({ project, openModal, projectNo, setProjectNo }) => {
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
            <div className="cards"
                 onClick={() => intoBoard(project,setProjectNo) }>
                     {projectNo}
                <Description desc={ project.description }
                             startDate={ project.startDate }
                             endDate={ project.endDate } />
            </div>
        </div>
    );
};

export default ProjectCard;
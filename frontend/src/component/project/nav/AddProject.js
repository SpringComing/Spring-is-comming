import React from 'react';
import styles from "../../../assets/css/component/project/AddProject.scss"

const AddProject = () => {
    return (
        <div className={ styles.add_project }>
            <button>
                <span className={ styles.add_icon }><i className="material-icons">add_circle</i></span>
                프로젝트 추가
            </button>
        </div>
    );
};

export default AddProject;
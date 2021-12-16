import React from 'react';
import styles from "../../../assets/css/component/kanban/AddProcess.scss"

const AddProcess = () => {
    return (
        <div className={ styles.add_process }>
            <button>
                <span className={ styles.add_icon }><i className="material-icons">add_circle</i></span>
                프로세스 추가
            </button>
        </div>
    );
};

export default AddProcess;
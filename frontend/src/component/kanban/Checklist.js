import React, { useState } from 'react';
import styles from './Kanban.scss';

const Checklist = ({checklist, index, notifyChangeChecklistStatus, notifyDeleteChecklist}) => {
    return (
        <li className={styles.Check}>
            <input type='checkbox' checked={checklist.status} onChange={ () => notifyChangeChecklistStatus(checklist, index)}/> 
            {' '+checklist.name+' '}
            <a onClick={ () => notifyDeleteChecklist(checklist.no) } className={styles.Check__remove}></a>
        </li> 
    );
}

export default Checklist;

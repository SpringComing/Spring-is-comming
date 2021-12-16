import React, {useState, forwardRef, useImperativeHandle, Fragment } from 'react';
import Task from './Task';
import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "../../assets/css/component/kanban/AddTask.scss"
import Modal2 from 'react-modal';
import modalStyles2 from "../../assets/css/component/kanban/AddTaskModal.scss";

const Process = ({process}) => {
    const [tasks, setTasks] = useState(process.tasks);
    const [modalData2, setModalData2] = useState({isOpen: false});
    /*
    useImperativeHandle(ref, () => ({
        changeTasks(processNo, sindex, dindex) {
                console.log("hi");
                let changeTasks = processState.tasks;
                let moveTask = changeTasks.splice(sindex, 1);
                changeTasks.splice(dindex, 0, moveTask);
            setProcess(
                {
                    tasks: changeTasks
                }
            )
                
                //setTasks(changeTasks);
            
        }
    }));
    */

    const notifyAddTask = () => {
        console.log('h1');
        setModalData2(Object.assign({}, modalData2, {
            label: '삭제되지 않았습니다.',
            isOpen: true
        }));
    }
    return (
        <Fragment>
        <div className="backlog-color card-wrapper">
            <div className="card-wrapper__header">
                <div className="backlog-name">{process.name}</div>
                <div className="backlog_dots">
                    <i className="material-icons">clear</i>
                </div>                    
            </div>

            <Droppable droppableId={`${process.no}`} key={process.no}>
                {(provided) => (
                    <div className="cards" {...provided.droppableProps} ref={provided.innerRef}>
                        { tasks.map((task, index) => {
                            return (
                                <Draggable draggableId={`${task.no}`} key={task.no} index={index}> 
                                {(provided) => ( 
                                    <div className="card"
                                        ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps} 
                                    >
                                        <Task
                                                key={task.no}
                                                task={task}
                                        />
                                    </div> 
                                )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                        </div>
                    )}
                </Droppable>


            {/*</DragDropContext>*/}

            <div className={ styles.add_task }>
                <button onClick={ () => notifyAddTask()}>
                    <span className={ styles.add_icon }><i className="material-icons">add_circle_outline</i></span>
                    업무 추가
                </button>
            </div>
        </div>
        <Modal2
                isOpen={modalData2.isOpen}
                ariaHideApp={false}
                onRequestClose={ () => setModalData2({isOpen: false}) }
                shouldCloseOnOverlayClick={true}
                className={modalStyles2.Modal}
                overlayClassName={modalStyles2.Overlay}
                style={{content: {width: 350}}}>
                <div>
                    <form className={styles.DeleteForm}>
                        <label>{modalData2.label || ''}</label>
                    </form>
                </div>
                <div className={modalStyles2['modal-dialog-buttons']}>
                    <button onClick={() => {setModalData2(Object.assign({}, modalData2, {isOpen: false})) } }>추가</button>
                </div>
        </Modal2>
        </Fragment>
    )
}
//);

export default Process;
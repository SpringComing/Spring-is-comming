import React, {Fragment, useState} from 'react';
import Task from './Task';
import { Droppable, Draggable } from "react-beautiful-dnd";
import update from 'react-addons-update';
import stylesTask from "../../assets/css/component/kanban/AddTask.scss"
import styles from './Kanban.scss'

const Process = ({process, pindex, notifyChangeProcess}) => {
    const [tasks, setTasks] = useState(process.tasks);
    const [text, setText] = useState(process.name);
    const [clickName, setClickName] = useState(false);

    const addTask = async() => {
        try {
            const response = await fetch(`/api/task`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    taskNo: taskNo
                })
            });

            if(!response.ok) {
                throw  `${response.status} ${response.statusText}`;
            }

            const json = await response.json();

            // insert가 안 된 경우
            if(!json.data) {
                setModalData(Object.assign({}, modalData, {
                    label: '추가되지 않았습니다.',
                    isOpen: true
                }));
                return;
            }

            // insert가 된 경우
            let addChecklist = json.data;
            const updateChecklists = ([...checklists, addChecklist]);
            setChecklists(updateChecklists);

        } catch (err) {
            console.error(err);
        }
    }

    const changeProcessName = () => {
        setClickName(true);
        setTimeout(()=>{
            document.getElementById("processName").focus();
        }, 50);
        
    }

    const showName = () => {

        if(!clickName) { return process.name; }
        else { 
            return (
                <input
                    id="processName"
                    type='text'
                    value={text}
                    className={styles.process__add} 
                    placeholder={process.name}
                    onChange={ (e) => setText(e.target.value)} 
                    onKeyPress={onCheckEnter}
                    onBlur = {(e) => {setClickName(false)} }
                />
            );
        }
    }

    const onCheckEnter = (e) => {
        if(e.key === 'Enter') {
          if(text.trim() === '') return;
          else {
            changeProcess(text.trim(), process);
            setText(process.name);
            setClickName(false);
          }
        }
    }

    const notifyChangeTaskStatus = (task, index) => {
        let updateTasks = update(tasks, {
            [index] :{
                status: {
                    $set: task.status
                }
            }
        });
        setTasks(updateTasks);
    }

    const changeProcess = async (processName, process) => {

        let updateProcess = update(process, {
            name: {
                $set: processName
            }
        });

        try {
            const response = await fetch(`/api/process`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    no: process.no,
                    name: processName
                })
            });
    
            if(!response.ok) {
                throw  `${response.status} ${response.statusText}`;
            }
    
            const json = await response.json();
    
            // update가 안 된 경우
            if(!json.data) {
                return;
            }
    
            // update가 된 경우
            notifyChangeProcess(updateProcess, pindex);
            setText(processName);
    
        } catch (err) {
            console.error(err);
        }
    }

    return (
         <Fragment>
            <div className="card-wrapper__header">
                <div className="backlog-name" onDoubleClick={() => changeProcessName() }>
                    {showName()}
                </div>
                <div className="backlog_dots">
                    <i className="material-icons">clear</i>
                </div>                    
            </div>

            <Droppable droppableId={`${pindex}`} key={process.no}>
                {(provided, snapshot) => (
                    <div className={styles.cards} {...provided.droppableProps} style={{ backgroundColor: snapshot.isDraggingOver ? changeZindex() : 'gray' }} ref={provided.innerRef}>
                        { tasks.map((task, index) => {
                            return (
                                <Draggable draggableId={`${task.no}`} key={task.no} index={index} > 
                                {(provided) => ( 
                                    <div className={styles.card}
                                        ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                        style={provided.draggableProps.style}
                                    >
                                        <Task
                                                key={task.no}
                                                task={task}
                                                index={index}
                                                notifyChangeTaskStatus={notifyChangeTaskStatus} 
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

            <div className={ stylesTask.add_task }>
                <button onClick={ () => addTask()}>
                    <span className={ stylesTask.add_icon }><i className="material-icons">add_circle_outline</i></span>
                    업무 추가
                </button>
            </div>
        </Fragment>
    )
}

export default Process;
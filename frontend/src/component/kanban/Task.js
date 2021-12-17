import React, {Fragment, useState} from 'react';
import Modal from 'react-modal';
import update from 'react-addons-update';
import Checklist from './Checklist';
import styles from './Kanban.scss';
import modalStyles from "../../assets/css/component/kanban/modal.scss";

const Task = ({task, index, notifyChangeTaskStatus}) => {

    const [modalData, setModalData] = useState({isOpen: false});
    const [checklists, setChecklists] = useState(task.checklists);
    const [text, setText] = useState('');

    const onCheckEnter = (e) => {
        if(e.key === 'Enter') {
          if(text.trim() === '') return;
          else {
            notifyInsertChecklist(text.trim(), task.no);
            setText('');
          }
        }
    }

    const changeTaskStatus = async () => {

        try {
            const response = await fetch(`/api/task`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({...task})
            });

            if(!response.ok) {
                throw  `${response.status} ${response.statusText}`;
            }

            const json = await response.json();

            // update가 안 된 경우
            if(!json.data) {
                setModalData(Object.assign({}, modalData, {
                    label: '체크상태가 변경되지 않았습니다.',
                    isOpen: true
                }));
                return;
            }

            // update가 안 된 경우
            if(!json.data) {
                setModalData(Object.assign({}, modalData, {
                    label: '진행상황이 변경되지 않았습니다.',
                    isOpen: true
                }));
                return;
            }

            setModalData(Object.assign({}, modalData, {
                label: '진행상황이 변경되었습니다.',
                isOpen: true
            }));

            // update가 된 경우
            notifyChangeTaskStatus(task, index);
            

        } catch (err) {
            console.error(err);
        }
    }

    const notifyChangeChecklistStatus = async (checklist, index) => {

        try {
            const response = await fetch(`/api/checklist/${checklist.no}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: null
            });

            if(!response.ok) {
                throw  `${response.status} ${response.statusText}`;
            }

            const json = await response.json();

            // update가 안 된 경우
            if(!json.data) {
                setModalData(Object.assign({}, modalData, {
                    label: '진행상황이 변경되지 않았습니다.',
                    isOpen: true
                }));
                return;
            }

            // update가 된 경우
            let updateChecklists = update(checklists, {
                [index]: {
                    status: {
                        $set: !checklist.status
                    }
                }
            });
            
            setChecklists(updateChecklists);

        } catch (err) {
            console.error(err);
        }
    }

    const notifyInsertChecklist = async (name, taskNo) => {
        try {
            const response = await fetch(`/api/checklist`, {
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

    const notifyDeleteChecklist = async (checklistNo) => {        
        try {
            const response = await fetch(`/api/checklist/${checklistNo}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: null
            });

            if(!response.ok) {
                throw  `${response.status} ${response.statusText}`;
            }

            const json = await response.json();

            // delete가 안 된 경우
            if(!json.data) {
                setModalData(Object.assign({}, modalData, {
                    label: '삭제되지 않았습니다.',
                    isOpen: true
                }));
                return;
            }

            // delete가 된 경우
            setChecklists(checklists.filter(checklist => checklist.no !== checklistNo));

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Fragment>
            <div className="card__header">
                <div className={task.importance == 1 ? "card-container-color card-color-low" : (task.importance == 2 ? "card-container-color card-color-med" : "card-container-color card-color-high")}>
                    <div className="card__header-priority">{task.importance == 1 ? '★' : (task.importance == 2 ? '★★' : '★★★' )}</div>
                </div>
                <div className="card__header-clear">
                    <i className="material-icons">clear</i>
                </div>
            </div>
            <div className={styles.card__title}>
                <div className={styles.card__text}>{task.name}</div>
                <div className={styles.card__date}>{"["+task.startDate+"~"+task.endDate+"]"}</div>
            </div>
            <ul>
                {checklists.map((checklist, index) => {
                                    return(<Checklist
                                                    key={checklist.no}
                                                    checklist={checklist}
                                                    index={index}
                                                    notifyChangeChecklistStatus={notifyChangeChecklistStatus}
                                                    notifyDeleteChecklist={notifyDeleteChecklist}
                                                />);}
                )}
            </ul>
            <div>
                <input type='text'
                        value={text} 
                        className={styles.CheckList__add_check} 
                        placeholder='체크리스트 추가'
                        onChange={ (e) => setText(e.target.value)} 
                        onKeyPress={onCheckEnter}/>
            </div>
            <div className="card__menu">
                <div className="card__menu-left">
                    <div className="comments-wrapper">
                        <div className="comments-ico">
                            <i className="material-icons">comment</i>
                        </div>
                        <div className="comments-num">1</div>
                    </div>

                    <div className="attach-wrapper">
                        <div className="attach-ico">
                            <i className="material-icons">attach_file</i>
                        </div>
                        <div className="attach-num">2</div>
                    </div>
                </div>

                <div className={styles.card__menu_right}>
                    <div className={styles.img_avatar2} onClick={ () => changeTaskStatus() }>
                        {task.status ? <img src={require("../../assets/img/green.jpg")}/>
                         : <img src={ require("../../assets/img/red.jpg")}/>}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalData.isOpen}
                ariaHideApp={false}
                onRequestClose={ () => setModalData({isOpen: false}) }
                shouldCloseOnOverlayClick={true}
                className={modalStyles.Modal}
                overlayClassName={modalStyles.Overlay}
                style={{content: {width: 350}}}>
                <div>
                    <form className={styles.DeleteForm}>
                        <label>{modalData.label || ''}</label>
                    </form>
                </div>
                <div className={modalStyles['modal-dialog-buttons']}>
                    <button onClick={() => {setModalData(Object.assign({}, modalData, {isOpen: false})) } }>확인</button>
                </div>
            </Modal>
            </Fragment>
    );

};

export default Task;

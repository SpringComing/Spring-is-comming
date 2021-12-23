import React, {Fragment, useRef, useState} from 'react';
import Modal from "react-modal";
import update from 'react-addons-update';
import stylesTask from "../../../assets/css/component/kanban/AddTask.scss"
import SettingModalStyle from "../../../assets/css/component/kanban/TaskSettingModal.scss"
import CommentModalStyle from "../../../assets/css/component/kanban/TaskCommentModal.scss"
import FileModalStyle from "../../../assets/css/component/kanban/TaskFileModal.scss"
import  Cookie  from "react-cookies"

Modal.setAppElement('body');

const TaskModal = ({projectNo, modalIsOpen, setModalIsOpen, processes, setProcesses, pindex, tindex}) => {

    const task = processes[pindex].tasks[tindex];
    const refForm = useRef(null);                             
    const currentDate = new Date().toISOString().substring(0, 10); //현재 날짜 가져오기
    const [name, setName] = useState(task.name);
    const [importance, setImportance] = useState(task.importance);
    const [startDate, setStartDate] = useState(task.startDate ? task.startDate : currentDate);
    const [endDate, setEndDate] = useState(task.endDate ? task.endDate : currentDate);
    const [num, setNum] = useState(1);
    const [taskUsers, setTaskUsers] = useState([]);
    const [taskNoneUsers, setTaskNoneUsers] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [flag, setFlag] = useState(true);

    const modalClose = () => {
        setModalIsOpen(false);
        setName(task.name);
        setImportance(task.importance);
        setStartDate(task.startDate ? task.startDate : currentDate);
        setEndDate(task.endDate ? task.endDate : currentDate);
        setNum(1);
        setFlag(true);
    }

    const callTaskUser = async() => {
        try {
            const response = await fetch(`/api/task/taskUser/${task.no}`, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',   // cf. application/x-www-form-urlencoded
                'Accept': 'application/json'          // cf. text/html
              },         
              body: null
            });
      
            if(!response.ok) {
              throw new Error(`${response.status} ${response.statusText}`);
            }
      
            const jsonResult = await response.json();
      
            if(jsonResult.result !== 'success') {
              throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }
      
            setTaskUsers(jsonResult.data);
      
          } catch (err) {
            console.error(err);
          }
    }

    const callTaskNoneUser = async() => {
        try {
            const response = await fetch(`/api/task/taskNoneUser?projectNo=${projectNo}&taskNo=${task.no}`, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',   // cf. application/x-www-form-urlencoded
                'Accept': 'application/json'          // cf. text/html
              },         
              body: null
            });
      
            if(!response.ok) {
              throw new Error(`${response.status} ${response.statusText}`);
            }
      
            const jsonResult = await response.json();
      
            if(jsonResult.result !== 'success') {
              throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }
      
            setTaskNoneUsers(jsonResult.data);
      
          } catch (err) {
            console.error(err);
          }

    }

    const fileUpload = async(taskNo) => {
        console.log(taskNo);
        try {
            const response = await fetch(`/api/task/file/${taskNo}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: null
            });

            if (!response.ok) {
                throw `${response.status} ${response.statusText}`;
            }
        
            const json = await response.json();
    
            // update가 안 된 경우
            if(!json.data) {
                return;
            }

            console.log(json.data)
            setFileList(json.data);

        } catch (err) {
            console.error(err);
        }
    }
    
    if(modalIsOpen && flag) { 
        callTaskUser();
        callTaskNoneUser();
        fileUpload(task.no);

        setFlag(false);
    }

    const handleSettingSubmit = async(taskName, taskImportance, taskStartDate, taskEndDate) => { 

        if(taskName.trim() == '') return;
        else taskName = taskName.trim();

        try {
            const response = await fetch(`/api/task/attr`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    no: task.no,
                    name: taskName,
                    importance: taskImportance,
                    startDate: taskStartDate,
                    endDate: taskEndDate
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
            
            setProcesses(update(processes, {
              [pindex]: {
                tasks: { 
                    [tindex]: {
                        name: {$set: taskName},
                        importance: {$set: taskImportance},
                        startDate: {$set: taskStartDate},
                        endDate: {$set: taskEndDate}
                    }
                }
              }
            }));
            
            setModalIsOpen(false);
            modalClose();
            
          } catch (err) {
            console.error(err);
          }

    }

    const delTaskUser = async(userNo, index) => {
        try {
            const response = await fetch(`/api/task/assign?userNo=${userNo}&taskNo=${task.no}`, {
                method: 'delete',
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

            if(!json.data) {
                return;
            }

            let updateTaskUsers = taskUsers;
            let [popTaskUser] = updateTaskUsers.splice(index, 1);
            setTaskUsers(updateTaskUsers);
            setTaskNoneUsers([popTaskUser, ...taskNoneUsers]);


        } catch (err) {
            console.error(err);
        }
    }

    const plusTaskUser = async(userNo, index) => {
        try {
            const response = await fetch(`/api/task/assign?userNo=${userNo}&taskNo=${task.no}`, {
                method: 'post',
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

            if(!json.data) {
                return;
            }

            let updateTaskNoneUsers = taskNoneUsers;
            let [popTaskNoneUser] = updateTaskNoneUsers.splice(index, 1);
            setTaskNoneUsers(updateTaskNoneUsers);
            setTaskUsers([popTaskNoneUser, ...taskUsers]);

        } catch (err) {
            console.error(err);
        }

    }

    const delTask  = async(taskNo) => {
        try {
            const response = await fetch(`/api/task/${taskNo}`, {
                method: 'delete',
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

            if(!json.data) {
                modalClose();
                return;
            }

            modalClose();

            let updateTasks = processes[pindex].tasks;
            updateTasks.splice(tindex, 1);

            setProcesses(update(processes, {
                [pindex]: {
                    tasks: {
                        $set: updateTasks
                    }
                }
            }));

        } catch (err) {
            console.error(err);
        }
    }  

    const notifyFile = {
        add: async function(taskNo, file) {
            try {

                // Create FormData
                const formData = new FormData();
                formData.append('file', file);

                // Post
                const response = await fetch(`/api/task/file?userNo=${Cookie.load('userno')}&taskNo=${taskNo}`, {
                    method: 'post',
                    headers: { 'Accept': 'applcation/json' },
                    body: formData
                })

                // fetch success?
                if (!response.ok) {
                    throw `${response.status} ${response.statusText}`;
                }

                // API success?
                const json = await response.json();
                if(!json.data) {
                    return;
                }
                
                // re-rendering(update)
                setFileList([json.data, fileList]);

            } catch (err) {
                console.error(err);
            }
        },
        delete: async function(fileNo, index) {
            try {
                // Delete
                const response = await fetch(`/api/task/file/${fileNo}`, {
                    method: 'delete',
                    headers: { 'Accept': 'applcation/json' },
                    body: null
                });

                // fetch success?
                if (!response.ok) {
                    throw `${response.status} ${response.statusText}`;
                }

                // API success?
                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }

                let updateFileList = fileList;
                updateFileList.splice(index, 1);

                setFileList(updateFileList);

            } catch (err) {
                console.error(err);
            }
        }
    }

    const setting = () => {
        return(
        <Fragment>
        
        <form 
            className={ SettingModalStyle.task_reg }
            ref={ refForm }
            onSubmit={() => handleSettingSubmit(name, importance, startDate, endDate) } >

                <div className={ SettingModalStyle.modal_input } >    
                    <span>업무명</span>
                    <input type='text'  
                        name="taskName" 
                        placeholder={ task.name }
                        defaultValue={ task.name }
                        onChange={ (e) => setName(e.target.value) } />
                </div>

                <div className={ SettingModalStyle.modal_input2 } >
                    <span>중요도</span>
                </div>
                <div className={SettingModalStyle.startRadio}>
                    <label className={SettingModalStyle.startRadio__box}>
                        <input type="radio" name="star" id="" defaultChecked={task.importance === 1} onClick={() => setImportance(1)}/>
                        <span className={SettingModalStyle.startRadio__img}>
                            <span className={SettingModalStyle.blind}>1</span>
                        </span>
                    </label>
                    <label className={SettingModalStyle.startRadio__box}>
                        <input type="radio" name="star" id="" defaultChecked={task.importance === 2} onClick={() => setImportance(2)}/>
                        <span className={SettingModalStyle.startRadio__img}>
                            <span className={SettingModalStyle.blind}>2</span>
                        </span>
                    </label>
                    <label className={SettingModalStyle.startRadio__box}>
                        <input type="radio" name="star" id="" defaultChecked={task.importance === 3} onClick={() => setImportance(3)} />
                        <span className={SettingModalStyle.startRadio__img}>
                            <span className={SettingModalStyle.blind}>3</span>
                        </span>
                    </label>
                </div>

                <div className={ SettingModalStyle.text2 }>
                <span>기간</span>
                </div>
                
                <div className={ SettingModalStyle.modal_input } >
                    <span >시작</span>
                    <input type="date" name="taskStartDate" defaultValue={task.startDate} onChange={ (e) => setStartDate(e.target.value) }/>
                    <span >끝</span>
                    <input type="date" name="taskEndtDate" defaultValue={task.endDate} onChange={ (e) => setEndDate(e.target.value) }/>
                </div>

                <div className={ SettingModalStyle.text }>
                <span>업무 참여 인원</span>
                </div>

                
                <div className={ SettingModalStyle.team_wrapper } >
                        <div className={ SettingModalStyle.team }>
                            {
                                taskUsers.map((user, index) =>
                                                    <div key={index} >
                                                        <span className={ SettingModalStyle.team_profile }>
                                                            <i className="material-icons">account_circle</i>
                                                        </span>
                                                        <span className={ SettingModalStyle.team_name }>
                                                            { user.name }
                                                        </span>
                                                        <span className={ SettingModalStyle.team_email }>
                                                            { user.email }
                                                        </span>
                                                        <span className={ SettingModalStyle.team_exclude }>
                                                            <i className="material-icons"
                                                                onClick={ () => delTaskUser(user.no, index) } >clear</i>
                                                        </span>
                                                    </div> )
                            }
                        </div>
                    </div>

                    <div className={ SettingModalStyle.text }>
                    <span>프로젝트 인원</span>
                    </div>

                    <div className={ SettingModalStyle.team_wrapper } >
                        <div className={ SettingModalStyle.team }>
                            {
                                taskNoneUsers.map((user, index) => 
                                                        <div key={index} >
                                                            <span className={ SettingModalStyle.team_profile }>
                                                                <i className="material-icons">account_circle</i>
                                                            </span>
                                                            <span className={ SettingModalStyle.team_name }>
                                                                { user.name }
                                                            </span>
                                                            <span className={ SettingModalStyle.team_email }>
                                                                { user.email }
                                                            </span>
                                                            <span className={ SettingModalStyle.team_exclude }>
                                                                <i className="material-icons"
                                                                    onClick={ () => plusTaskUser(user.no, index) } >add_box</i>
                                                            </span>
                                                        </div> )
                            }
                    </div>
                </div>          
        </form>

        <div className={ SettingModalStyle.modal_btn }>
            <button type="submit" 
                  form="task_reg"
                  onClick={ () => {refForm.current.dispatchEvent(new Event("submit", {cancelable: true, bubbles: true}))} }>
            <span>변경</span>
            </button>
            <button form="task_reg"
                  onClick={ () => delTask(task.no) }>
                <span>삭제</span>
            </button>
        </div>
        </Fragment>);
    }

    const comment = () => {
        return(
            <form 
                className={ SettingModalStyle.task_reg }
                ref={ refForm }
                onSubmit={() => handleSettingSubmit(name, importance, startDate, endDate) } >
            </form>
        );
    }

    const handleFileSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (e.target['uploadImage'].files.length === 0) {
            console.error(`validation ${e.target['uploadImage'].placeholder} is empty`);
            return;
        }

        const fileData = e.target['uploadImage'].files[0];

        notifyFile.add(task.no, fileData);

        //modalClose();
    }
    
    const fileDownload = () => {}

    const file = () => {
        console.log(Cookie.load('userno'));
        return(
            <Fragment>
                <form 
                className={ SettingModalStyle.task_reg }
                ref={ refForm }
                onSubmit={ handleFileSubmit } >

                <div className={ SettingModalStyle.modal_input3 } >
                    <span>파일첨부</span>
                    <input type={'file'}
                        name={'uploadImage'}/>
                </div>

                <div className={ SettingModalStyle.text }>
                    <span>파일 목록</span>
                </div>

                <div className={ SettingModalStyle.team_wrapper } >
                        <div className={ SettingModalStyle.team }>
                            {
                                fileList.map((item, index) =>
                                                    <div key={index} >
                                                        <span className={ SettingModalStyle.team_exclude }>
                                                            <i className="material-icons"
                                                                onClick={ () => notifyFile.delete(item.no, index) } >clear</i>
                                                        </span>
                                                        <span className={ SettingModalStyle.team_name }>
                                                            { item.userName }
                                                        </span>
                                                        <span className={ SettingModalStyle.team_name }>
                                                            { item.name }
                                                        </span>
                                                        <span className={ SettingModalStyle.team_email }>
                                                            { item.regDate }
                                                        </span>
                                                        <span className={ SettingModalStyle.team_exclude }>
                                                            <i className="material-icons"
                                                                onClick={ () => fileDownload() } >file_download</i>
                                                        </span>
                                                    </div> )
                            }
                        </div>
                </div>
                        
            </form>
            <div className={ SettingModalStyle.modal_btn }>
              <button type="submit" 
                      form="task_reg"
                      onClick={ () => {refForm.current.dispatchEvent(new Event("submit", {cancelable: true, bubbles: true}))} }>
                <span>파일업로드</span>
              </button>
            </div>
            </Fragment>);
    }

    const menu = (num) => {
        if(num == 1) {
            return(setting());
        } else if(num == 2) {
            return(comment());
        } else {
            return(file());
        }
    }

    
    return (
        
        <Modal
            isOpen={ modalIsOpen }
            onRequestClose={ () => modalClose() }          //오버레이 부분을 클릭하거나 또는 Esc 키를 누를 시 모달 창이 닫히게 한다
            shouldCloseOnOverlayClick={ false }            //오버레이 클릭은 막고 Esc 키만으로 모달창을 닫게 한다
            contentLabel="Project Setting"                 //웹접근성 ex) 시작장애인이 사용시 정보 전달에 사용
            className={ SettingModalStyle.Modal }
            overlayClassName={ SettingModalStyle.Overlay }>
            
            <div className={ SettingModalStyle.modal_header } >
                <h2>업무</h2>
                <span onClick={ () => { modalClose(); } }>
                    <i className="material-icons">clear</i>
                </span>
            </div>
            <div className={SettingModalStyle.navi} id='menu'>
                <button style={ num == 1 ? {backgroundColor: '#bcdd28'} : {backgroundColor: '#2bb632'}} onClick={() => setNum(1)}>설정</button>
                <button style={ num == 2 ? {backgroundColor: '#bcdd28'} : {backgroundColor: '#2bb632'}} onClick={() => setNum(2)}>코멘트</button>
                <button style={ num == 3 ? {backgroundColor: '#bcdd28'} : {backgroundColor: '#2bb632'}} onClick={() => setNum(3)}>파일</button>
            </div>
            
            {menu(num)}

        </Modal>
        
    );
}

export default TaskModal;
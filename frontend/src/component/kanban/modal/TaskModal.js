import React, {Fragment, useRef, useState} from 'react';
import Modal from "react-modal";
import update from 'react-addons-update';
import stylesTask from "../../../assets/css/component/kanban/AddTask.scss"
import SettingModalStyle from "../../../assets/css/component/kanban/TaskSettingModal.scss"
import CommentModalStyle from "../../../assets/css/component/kanban/TaskCommentModal.scss"
import ModalStyle from "../../../assets/css/component/project/CommentModal.scss"
import FileModalStyle from "../../../assets/css/component/kanban/TaskFileModal.scss"
import  Cookie  from "react-cookies"

Modal.setAppElement('body');

const TaskModal = ({modalIsOpen, setModalIsOpen, processes, setProcesses, pindex, tindex}) => {

    const task = processes[pindex].tasks[tindex];
    const refForm = useRef(null);                             
    const currentDate = new Date().toISOString().substring(0, 10); //현재 날짜 가져오기
    const [name, setName] = useState(task.name);
    const [importance, setImportance] = useState(task.importance);
    const [startDate, setStartDate] = useState(task.startDate ? task.startDate : currentDate);
    const [endDate, setEndDate] = useState(task.endDate ? task.endDate : currentDate);
    const [num, setNum] = useState(1);
    const [commentText, setComment] = useState([]);
    const [flag, setFlag] = useState(true);

    const menu = (num) => {
        if(num == 1) {
            return(setting());
        } else if(num == 2) {
            return(comment());
        } else {
            return(file());
        }
    }
        
    const modalInit = () => {
        setName(task.name);
        setImportance(task.importance);
        setStartDate(task.startDate ? task.startDate : currentDate);
        setEndDate(task.endDate ? task.endDate : currentDate);
        setComment('');
        setNum(1);
        
    }

    const getComment = async(task) => { 
 
        try {
            const response = await fetch(`/api/task/comment`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    no: task.no,

                })
            });
    
            if(!response.ok) {
                throw  `${response.status} ${response.statusText}`;
            }
    
            const json = await response.json();
    
            if(!json.data) {
                return;
            }

            
            var comments = []
            for(var i = 0; i<json.data.length; i++){
                comments.push(json.data[i]);
            }

            setComment(comments)
    
          } catch (err) {
            console.error(err);
          }
        }

    const addComment = async(task,message) => { 

            try {
                const response = await fetch(`/api/task/addComment`, {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        no: task.no,
                        message: message,
    
                    })
                });
        
                if(!response.ok) {
                    throw  `${response.status} ${response.statusText}`;
                }
        
                const json = await response.json();
        
                if(!json.data) {
                    return;
                }
                
                setComment([...commentText, {no:json.data.no, name:json.data.name, message:json.data.message, reg_date:json.data.reg_date, user_no:json.data.user_no }])
                document.getElementById("back").scrollTop = document.getElementById("back").scrollHeight
                
              } catch (err) {
                console.error(err);
              }
            }

        if(modalIsOpen && flag) {
            setFlag(false)
            getComment(task);
        }

        const scrollToBotton = () => {
            scrollRef.current.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
          };


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
            modalInit();
            
          } catch (err) {
            console.error(err);
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

            <div className={ SettingModalStyle.text }>
              <span>기간</span>
            </div>
            
            <div className={ SettingModalStyle.modal_input } >
                <span >시작</span>
                <input type="date" name="taskStartDate" defaultValue={task.startDate} onChange={ (e) => setStartDate(e.target.value) }/>
                <span >끝</span>
                <input type="date" name="taskEndtDate" defaultValue={task.endDate} onChange={ (e) => setEndDate(e.target.value) }/>
            </div>
        </form>
        <div className={ SettingModalStyle.modal_btn }>
          <button type="submit" 
                  form="task_reg"
                  onClick={ () => {refForm.current.dispatchEvent(new Event("submit", {cancelable: true, bubbles: true}))} }>
            <span>변경</span>
          </button>
        </div>
        </Fragment>);
    }

    const comment = () => {
        
        return(
            <Fragment>
                <form 
                className={ CommentModalStyle.task_reg }
                ref={ refForm }
                onSubmit={ handleSubmit }>

                <div className={ CommentModalStyle.text }>
                <span>COMMENT</span>
                </div>
                <div className={ ModalStyle.team_wrapper }>
                                    <div className={ ModalStyle.team } style={{display:"inline-block"}} id="back">         
                                        {
                                            commentText.map(comment => 
                                                
                                             
                                             <div key={comment.no} style={{display: "inline"}}>
                                                    
                                                    {comment.user_no != Cookie.load('userno') ?
                                                     <div>
                                                                  
                                                                    <span className={ ModalStyle.team_profile }>
                                                                        <i className="material-icons">account_circle</i>
                                                                    </span>
                                                                    <span className={ ModalStyle.team_name } style={{ width:"110px",marginTop:"3px", textAlign:"left", fontWeight:"bold"}}>
                                                                        {comment.name}
                                                                    </span>
                                                                    <p  style={{width: "500px", height: "50px", textAlign:"left", display: "inline-block", overflowY:"auto"}}>
                                                                        {comment.message}
                                                                    </p>
                                                                    <span style={{fontSize:"8px", width:"100px", marginTop:"40px"}}>
                                                                        {comment.reg_date}
                                                                    </span>
                                                    </div>  
    : 
                                                     <div>               
                                                                    
                                                                    
                                                                    <span style={{fontSize:"8px", width:"100px", marginTop:"40px"}}>
                                                                        {comment.reg_date}
                                                                    </span>
                                                                    <p  style={{marginTop:"8px",width: "500px", height: "50px", textAlign:"right", display: "inline-block", overflowY:"auto"}}>
                                                                        {comment.message}
                                                                    </p>
                                                                    <span className={ ModalStyle.team_name } style={{ width:"110px",marginTop:"3px", textAlign:"right", fontWeight:"bold", color:"blue"}}>
                                                                        {comment.name}
                                                                    </span>
                                                                    <span className={ ModalStyle.team_profile }>
                                                                        <i className="material-icons" style={{color:"blue"}}>account_circle</i>
                                                                    </span>
                                                                    
                                                    </div> }
    
                                            </div>
                                            
                                            )                  
                                        }      
                                    </div>
                                    
                                   
                                </div>
                                
                                
                <div className={ CommentModalStyle.modal_input } >
                    <input type='text' 
                           placeholder='comment 를 남겨주세요.' id='input'/>

                </div>

                <div className={ CommentModalStyle.modal_btn }>
                    <button type="submit" 
                            form="task_reg"
                            onClick={ () => {
                                var input = document.getElementById('input').value;   
                                addComment(task,input)
                                document.getElementById('input').value = ""
       
                            }}>
                        <span className={ stylesTask.add_icon }><i className="material-icons">send</i></span>
                    </button>
                </div>
            </form>
                            
            
            </Fragment>)
            
            
            
   
    }

    const file = () => {
        return(
            <Fragment>
                <form 
                className={ SettingModalStyle.task_reg }
                ref={ refForm }
                onSubmit={ handleSubmit } >
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
                        <input type="radio" name="star" id="" defaultChecked={importance === 1} onClick={() => setImportance(1)}/>
                        <span className={SettingModalStyle.startRadio__img}>
                            <span className={SettingModalStyle.blind}>1</span>
                        </span>
                    </label>
                    <label className={SettingModalStyle.startRadio__box}>
                        <input type="radio" name="star" id="" defaultChecked={importance === 2} onClick={() => setImportance(2)}/>
                        <span className={SettingModalStyle.startRadio__img}>
                            <span className={SettingModalStyle.blind}>2</span>
                        </span>
                    </label>
                    <label className={SettingModalStyle.startRadio__box}>
                        <input type="radio" name="star" id="" defaultChecked={importance === 3} onClick={() => setImportance(3)} />
                        <span className={SettingModalStyle.startRadio__img}>
                            <span className={SettingModalStyle.blind}>3</span>
                        </span>
                    </label>
                </div>
    
                <div className={ SettingModalStyle.text }>
                  <span>기간</span>
                </div>
                
                <div className={ SettingModalStyle.modal_input } >
                    <span >시작</span>
                    <input type="date" name="taskStartDate" value = { startDate }  onChange={ (e) => setStartDate(e.target.value) }/>
                    <span >끝</span>
                    <input type="date" name="taskEndtDate" value = { endDate }  onChange={ (e) => setEndDate(e.target.value) }/>
                </div>
            </form>
            <div className={ SettingModalStyle.modal_btn }>
              <button type="submit" 
                      form="task_reg"
                      onClick={ () => {refForm.current.dispatchEvent(new Event("submit", {cancelable: true, bubbles: true}))} }>
                <span>변경</span>
              </button>
            </div>
        
            </Fragment>)
            
    }



    const handleSubmit = () => {}

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
                <span onClick={ () => { setModalIsOpen(false); modalInit(); } }>
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
import React,{useState,useRef} from 'react';
import Modal from "react-modal";
import ModalStyle from "../../../assets/css/component/project/ProjectModal.scss"


Modal.setAppElement('body');

const ProjectAddModal = ({modalIsOpen, setModalIsOpen}) => {

    const refForm = useRef(null);                             
    const currentDate = new Date().toISOString().substring(0, 10); //현재 날짜 가져오기
    const [startDate, setStartDate] = useState(currentDate);   //모달 input startDate 
    const [endDate, setEndDate] = useState(currentDate);       //모달 input endDate
    const [projectName, setProjectName] = useState("");        //모달 input projectName 
    const [projectDesc, setProjectDesc] = useState("");        //모달 input projectDesc
    

   /**
   * 함수: handleSubmit 
   * 작성자: 성창현
   * 기능: 모달 form 태그 onSubmut 이벤트 핸들러 함수
   */
   const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //프로젝트 이름에 다른 문자열 없이 스페이스(공백)만 있으면 리턴
            if ( e.target.projectName.value.replace(/(\s*)/g, '') === '' ) {
                refForm.current && refForm.current.projectName.focus();
                return;
            }

            const projectVo = {
                name : projectName,
                description: projectDesc,
                startDate: startDate,
                endDate: endDate
            }
            
            const response = await fetch('/api/project/1', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'applcation/json'
                },
                body: JSON.stringify(projectVo)
            });

            if (!response.ok) {
                throw `${response.status} ${response.statusText}`;
            }

            const jsonResult = await response.json();

            if (jsonResult.result !== 'success') {
                throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }
            
            // // 비밀번호가 틀린 경우
            // if (jsonResult.data === null) {
            //     setModalData(Object.assign({}, modalData, {
            //         label: '비밀번호가 일치하지 않습니다.',
            //         password: ''
            //     }));
            //     return;
            // }

            // //잘 삭제가 된 경우
            // setModalData({
            //     isOpen: false, 
            //     password: ''
            // });

        } catch (err) {
            console.error(err);
        }
    }


    /**
   * 함수: modalClose 
   * 작성자: 성창현
   * 기능: 모달 상태 리셋
   */
   const modalClose = () => {

    setStartDate(currentDate);
    setEndDate(currentDate);
    setProjectName("");
    setProjectDesc("");

    setModalIsOpen(false)
   }


    return (
        
        <Modal
            isOpen={ modalIsOpen }
            onRequestClose={ () => modalClose() }          //오버레이 부분을 클릭하거나 또는 Esc 키를 누를 시 모달 창이 닫히게 한다
            shouldCloseOnOverlayClick={ false }            //오버레이 클릭은 막고 Esc 키만으로 모달창을 닫게 한다
            contentLabel="Project Setting"                 //웹접근성 ex) 시작장애인이 사용시 정보 전달에 사용
            className={ ModalStyle.Modal }
            overlayClassName={ ModalStyle.Overlay }>
            
            <div className={ ModalStyle.modal_header } >
                <h2>프로젝트</h2>
                <span onClick={ () => modalClose() }>
                    <i className="material-icons">clear</i>
                </span>
            </div>
            <form 
                className={ ModalStyle.project_reg }
                ref={ refForm }
                onSubmit={ handleSubmit } >
                <div className={ ModalStyle.modal_input } >
                    <span>프로젝트 이름</span>
                    <input type='text'  
                           name="projectName" 
                           placeholder="프로젝트의 이름을 입력해주세요(필수)"
                           value={ projectName }
                           onChange={  (e) => setProjectName(e.target.value ) } />
                </div>
                {/* <div className={ModalStyle.modal_input} >
                    <span >관리자</span>
                    <input type='text'  />
                </div> */}

                <div className={ ModalStyle.text }>
                  <span>설명</span>
                </div>
                <div className={ ModalStyle.modal_textarea } >
                    <textarea name="projectDesc" 
                              value={ projectDesc } 
                              onChange={ (e) => setProjectDesc(e.target.value )}  
                              />
                </div>

                <div className={ ModalStyle.text }>
                  <span>기간</span>
                </div>
                
                <div className={ ModalStyle.modal_input } >
                    <span >시작</span>
                    <input type="date" name="startDate" value = { startDate }  onChange={ (e) => setStartDate(e.target.value) }/>
                    <span >끝</span>
                    <input type="date" name="endtDate" value = { endDate }  onChange={ (e) => setEndDate(e.target.value) }/>
                </div>
            </form>
            <div className={ ModalStyle.modal_btn }>
              <button type="submit" 
                      form="project_reg"
                      onClick={ () => { 
                              refForm.current.dispatchEvent(new Event("submit", {cancelable: true, bubbles: true})); 
                              //modalClose(); 
                              } }>
                <span>추가</span>
              </button>
            </div>

        </Modal>
        
    );
};

export default ProjectAddModal;
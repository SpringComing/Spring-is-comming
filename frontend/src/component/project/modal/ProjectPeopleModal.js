import React,{useState,useRef, useEffect} from 'react';
import Modal from "react-modal";
import ModalStyle from "../../../assets/css/component/project/ProjectPeopleModal.scss"


Modal.setAppElement('body');

const ProjectPeopleModal = ({modalIsOpen, setModalIsOpen, getProject, project}) => {
    const refForm = useRef(null);                           
    const [email, setEmail] = useState("");          //input email 상태
    const [flag, setFlag] = useState(true);          //모달에 프로젝트 내용 넣기위한 플래그
    const [emailCheck, setEmailCheck] = useState("") 
    
    /**
     * 모달에 프로젝트 내용 넣기
     */
    if(modalIsOpen && flag){
        setFlag(false);
        
    }
    

   /**
   * 함수: handleSubmit 
   * 작성자: 성창현
   * 기능: 모달 form 데이터 서버에 fetch
   */
   const handleSubmit = async (e) => {
    
        e.preventDefault();
        try {
            //이메일형식이 아니면 비우고 포커스후 경고글 표시
            const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
            if (!re.test(e.target.email.value) ) {
                refForm.current && refForm.current.email.focus();
                setEmailCheck("이메일 형식이 아닙니다. 다시 입력하세요")
                return;
            }
            

            const guestvo = {
                email: email,
                projectNo : project.no
            } 
            

            const response = await fetch('/api/project/sendemail', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(guestvo)
            });

            if (!response.ok) {
                throw `response failed ${response.status} ${response.statusText}`;
            }

            const jsonResult = await response.json();

            //console.log(jsonResult);

            if (jsonResult.result !== 'success') {
                throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            }
            
            // insert가 실패한경우
            if (jsonResult.data.result === false) {
                alert("프로젝트 생성이 실패 했습니다.");
                return;
            }

            // insert 성공한 경우
            console.log("jsonResult",jsonResult);

        } catch (err) {
            console.error(err);
        }
    }


   /**
   * 함수: modalClose 
   * 작성자: 성창현
   * 기능: 모달 상태 리셋후 모달 닫기
   */
   const modalClose = () => {
    setFlag(true);
    setEmailCheck("");
    setEmail("");
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
                <h2>프로젝트 팀원 설정</h2>
                <span onClick={ () => modalClose() }>
                    <i className="material-icons">clear</i>
                </span>
            </div>
            <form 
                className={ ModalStyle.project_reg }
                ref={ refForm }
                onSubmit={ handleSubmit } >
                
                <div className={ ModalStyle.text }>
                    <span>현재 팀원</span>
                </div>
                <div className={ ModalStyle.team } >
                    <div>
                    </div>
                </div>

                <div className={ ModalStyle.text }>
                    <span>팀원 초대</span>
                </div>
                <div className={ ModalStyle.modal_input } >
                    <input type='text'  
                           name="email" 
                           placeholder="초대 할 이메일을 입력해 주세요"
                           value={ email }
                           onChange={  (e) => setEmail(e.target.value ) } />
                </div>
            </form>

            <div className={ ModalStyle.modal_btn }>
                <span className={ ModalStyle.email_check }>{ emailCheck }</span>
                <button type="submit" 
                      form="project_reg"
                      onClick={ () => { 
                              refForm.current.dispatchEvent(new Event("submit", {cancelable: true, bubbles: true})); 
                            } }>
                <span>보내기</span>
              </button>
            </div>

        </Modal>
        
    );
};

export default ProjectPeopleModal;
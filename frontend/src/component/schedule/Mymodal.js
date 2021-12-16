import React,{useState,useRef} from 'react';
import Modal from "react-modal";
import "./modal.css"



Modal.setAppElement('body');

const Mymodal = ({modalIsOpen, setModalIsOpen, data}) => {

    const refForm = useRef(null);                             
    const currentDate = new Date().toISOString().substring(0, 10); //현재 날짜 가져오기

    /**
   * 함수: modalClose 
   * 작성자: 성창현
   * 기능: 모달 상태 리셋
   */
   const modalClose = () => {
    setModalIsOpen(false)
   }


    return (
        
        <Modal
            isOpen={ modalIsOpen }
            onRequestClose={ () => modalClose() }          //오버레이 부분을 클릭하거나 또는 Esc 키를 누를 시 모달 창이 닫히게 한다
            shouldCloseOnOverlayClick={ false }            //오버레이 클릭은 막고 Esc 키만으로 모달창을 닫게 한다
            contentLabel="Project Setting"                 //웹접근성 ex) 시작장애인이 사용시 정보 전달에 사용
            className='modal'
            >
            
            <div className='modal_header'> 
                <center><h2>상세 정보</h2></center><hr />
                <span onClick={ () => modalClose() }>
                </span>
            </div>
            <form 
                
                ref={ refForm }
               >
                   <br />
                <div>
                    <span className='text'>프로젝트 이름</span>
                    <input type='text'  
                           name="projectName" 
                           placeholder={data[0]}
                           
                           disabled
                        />
                </div>
                <br /> <br />
                <div>
                  <span className='text'>설명</span>
                </div>
                <div>
                    <textarea name="projectDesc" 
                              value={ data[3] } 
                              disabled
                               
                              />
                </div>
                <br /> <br />

                <div>
                  <span className='text'>기간</span>
                  <span >시작</span>
                    <input type="date" name="startDate" value = { data[1] } disabled  />
                    <span >끝</span>
                    <input type="date" name="endtDate" value = { data[2] }  disabled/>
                </div>
                
            </form>
            <br /> <br /><br /> <br /><br />
            <div className='modal_btn'>
              <button  
                      form="project_reg"
                      onClick={ () => {  
                              modalClose(); 
                              } }>
                 확인
              </button>
            </div>

        </Modal>
        
    );
};

export default Mymodal;
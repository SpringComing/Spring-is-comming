import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import "./Calendar.js"
import Mymodal from './Mymodal'
import { Link } from 'react-router-dom'


const Calendar = () => {

    const [event, setEvent] = useState([]);
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);     //모달 생성 상태

    useEffect(async () => {

        try {
          const response = await fetch('/api/schedule', {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',   // cf. application/x-www-form-urlencoded
              'Accept': 'application/json'          // cf. text/html
            },        
            body: null
          });
    
          if(!response.ok) {
            console.log('테스트');
            throw new Error(`${response.status} ${response.statusText}`);
          }
          const jsonResult = await response.json();
          if(jsonResult.result !== 'success') {
            location.href = "/api/checkSession"
            alert('세션이 만료되었습니다!')
            throw new Error(`${jsonResult.result} ${jsonResult.message}`);
            
          }
    
          const box = []
          const color = ['red','blue','green']
    
          for(var i = 0; i<jsonResult.data.length; i++){
            box.push({title: jsonResult.data[i].name, start: jsonResult.data[i].startDate, end: jsonResult.data[i].endDate, color: color[i], description: jsonResult.data[i].description})
          }
    
          setEvent(box)
          console.log(jsonResult.data)
          
        } catch (err) {
          console.error(err);
        }
      }, []);

    return (
      
        <div>
            <FullCalendar style={{
      }}
      defaultView="dayGridMonth" 
      plugins={[ dayGridPlugin, interactionPlugin ]}
      events={
        event
      }

        editable={true} // 이벤트 날짜, 위치 수정 가능
        dateClick={handleDateClick} // 날짜 클릭시 이벤트
        eventClick={open}
      
/>
<Mymodal modalIsOpen= {modalIsOpen} setModalIsOpen={setModalIsOpen} data={data} />
      </div>
    );

    function open(args){
        const box2 = []
        var start = new Date(args.event.start);
        var year = start.getFullYear();
        var month = ('0' + (start.getMonth() + 1)).slice(-2);
        var day = ('0' + start.getDate()).slice(-2);
        var startDate = year + '-' + month  + '-' + day;
  
        var end = new Date(args.event.end);
        year = end.getFullYear();
        month = ('0' + (end.getMonth() + 1)).slice(-2);
        day = ('0' + end.getDate()).slice(-2);
        var endDate = year + '-' + month  + '-' + day;
  
        box2.push(args.event.title)
        box2.push(startDate)
        box2.push(endDate)
        box2.push(args.event.extendedProps.description)
  
        setData(box2)
        setModalIsOpen(true)
        
      }


};

function handleDateClick(arg){
    alert(arg.dateStr)
  }

export default Calendar;
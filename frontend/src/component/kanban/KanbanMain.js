import React, { useState } from 'react';
import Process from './Process';
import { DragDropContext } from "react-beautiful-dnd";
import update from 'react-addons-update';

const KanbanMain = ({processes, setProcesses}) => {

    // const [zindex, setZindex] = useState("1");

    // const changeZindex = () => {
    //   setZindex
    // }

    const onDragEnd = (result) => { 
      // droppableId : process의 index
      // dragableId : task.no
      // index : task의 index

      if (!result.destination) return;
      let { source, destination } = result;

      if (source.droppableId !== destination.droppableId) { // 다른 프로세스에 놓았을 때

        let sourceColumn = processes[source.droppableId];
        let destColumn = processes[destination.droppableId];
        let sourceItems = sourceColumn.tasks;
        let destItems = destColumn.tasks;
        
        let [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);

        let updateProcesses = update(processes, {
          [source.droppableId]: {
            tasks: { $set: sourceItems }
          },
          [destination.droppableId]: {
            tasks: { $set: destItems }
          }
        });

        setProcesses(updateProcesses);

      } else { // 같은 프로세스에 놓았을 때
        let column = processes[source.droppableId];
        let copiedItems = column.tasks;
        let [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);

        let updateProcesses = update(processes, {
          [source.droppableId]: {
            tasks: { $set: copiedItems }
          }
        });

        setProcesses(updateProcesses);
      }

    }

    const notifyChangeProcess = (process, index) => {
      let updateProcesses = update(processes, {
        [index]: {
          $set: process
        }
      });

      setProcesses(updateProcesses);

    }

    return (
        <section className="kanban__main">
            <div className="kanban__main-wrapper">
                <DragDropContext onDragEnd={onDragEnd}>
                    {processes.map((process, index) => 
                        <div className="backlog-color card-wrapper">
                        return(
                          
                            <Process key={process.no} process={process} pindex={index} notifyChangeProcess={notifyChangeProcess} />
                          
                        );
                        </div>
                    )}
                </DragDropContext>
            </div>
        </section>
    );

    
}

export default KanbanMain;



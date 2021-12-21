import React from 'react';
import Process from './Process';
import { DragDropContext } from "react-beautiful-dnd";
import update from 'react-addons-update';

const KanbanMain = ({processes, setProcesses}) => {

    //const childRef = useRef();

    const onDragEnd = (result) => { 
      // droppableId : process.no
      // dragableId : task.no
      // index : task의 index

      /*if (!result.destination) return;
      const { source, destination } = result;
    
      if (source.droppableId !== destination.droppableId) { // 다른 프로세스에 놓았을 때


        const sourceColumn = processes.filter(process => process.no == source.droppableId); //columns[source.droppableId];
        const destColumn = processes.filter(process => process.no == destination.droppableId); //columns[destination.droppableId];
        const sourceItems = [...sourceColumn.tasks];
        const destItems = [...destColumn.tasks];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setProcesses({
          ...processes,
          [source.droppableId-1]: {
            ...sourceColumn,
            tasks: sourceItems
          },
          [destination.droppableId-1]: { 
            ...destColumn,
            tasks: destItems
          }
        });
      } else { // 다른 프로세스에 놓았을 때

        update(processNo, sequence source)
        const column = processes[source.droppableId-1];
        const copiedTasks = [...column.tasks];
        const removed = copiedTasks.splice(source.index, 1);
        copiedTasks.splice(destination.index, 0, removed);
        setProcesses({
          ...processes,
          [source.droppableId-1]: {
            ...column,
            tasks: copiedTasks
          }
        });
      }*/

      
    };

    /*const onDragEnd = (result) => {
      
      // droppableId : process.no
      // dragableId : task.no
      // index : task의 index

        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) { // 다른 프로세스에 놓았을 때

          updateProcesses = update()
          const sourceP = processes[source.droppableId-1];
          const destP = processes[destination.droppableId-1];

          const sourceTs = [...sourceP.tasks];
          const destTs = [...destP.tasks];
          const [removed] = sourceTs.splice(source.index, 1);
          destTs.splice(destination.index, 0, removed);
/*
          const updateSourceProcess = update(sourceP, {
            tasks: {
              $set: sourceTs
            }
          });

          const updateDestinationProcess = update(destP, {
            tasks: {
              $set: destTs
            }
          });

          let updateProcesses = update(processes, {
            [source.droppableId-1]: {
              tasks: {
                $set: {...sourceTs}
              }
            }
          });
          updateProcesses = update({
            [destination.droppableId-1]: {
              tasks: {
                $set: {...destTs}
              }
            }
          });

          setProcesses(updateProcesses);

        } else {

          const itemsProcess = processes.filter(process => process.no == source.droppableId);
          const items = itemsProcess.tasks;
          console.log("items:"+items);
          const [reorderedItem] = items.splice(source.index, 1);
          items.splice(destination.index, 0, reorderedItem);

          let updateProcesses = update(processes, {
            [source.droppableId]: {
              tasks: {
                $set: items
              }
            }
          })

          setProcesses(updateProcesses);

          //setProcesses(updateProcesses);
      }
    }
*/
    return (
        <section className="kanban__main">
            <div className="kanban__main-wrapper">
                <DragDropContext onDragEnd={onDragEnd}>               
                    {processes.map((process) => {
                        return(
                            <Process key={process.no} process={process} />
                        );
                    })}
                </DragDropContext>
            </div>
        </section>
    );
}

export default KanbanMain;



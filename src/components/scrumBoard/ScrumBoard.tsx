import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
} from "react-beautiful-dnd";
import { useState } from "react";
import NewTicket from "./NewTicket";

// fake data generator
const getItems = (count: any, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};
const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

function ScrumBoard(props: any) {
  const removeItem = (ind: number, index: number, id: number) => {
    const newState = JSON.parse(JSON.stringify(props.ticketList));
    newState[props.sprintStatusList[ind].status].splice(index, 1);
    props.send({
      type: "removeTicket",
      payload: {
        ticketList: newState,
        removeTicketId: id,
      },
    });
  };

  function onDragEnd(result: any) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(
        props.ticketList[props.sprintStatusList[sInd].status],
        source.index,
        destination.index
      );
      const newState: any = JSON.parse(JSON.stringify(props.ticketList));
      newState[props.sprintStatusList[sInd].status] = items;
    } else {
      const result = move(
        props.ticketList[props.sprintStatusList[sInd].status],
        props.ticketList[props.sprintStatusList[dInd].status],
        source,
        destination
      );
      const newState: any = JSON.parse(JSON.stringify(props.ticketList));
      newState[props.sprintStatusList[sInd].status] = result[sInd];
      newState[props.sprintStatusList[dInd].status] = result[dInd];
      props.send({
        type: "updateTicketStatus",
        payload: {
          ticketList: newState,
          ticketId:
            props.ticketList[props.sprintStatusList[sInd].status][source.index]
              .id,
          destStatusId: props.sprintStatusList[dInd].id,
        },
      });
    }
  }

  function getIndividualSprint(el: any, ind: number) {
    if (props.ticketList && props.ticketList[el.status]) {
      return props.ticketList[el.status].map((item: any, index: any) => (
        <Draggable key={item.ticket.id} draggableId={item.ticket} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <props.ScrumItem
                  {...item}
                  draggableIndx={index}
                  droppableIndx={ind}
                  removeItem={removeItem}
                  restProps={props}
                />
              </div>
            </div>
          )}
        </Draggable>
      ));
    }
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {props.sprintStatusList?.map((el: any, ind: any) => (
            <Droppable key={el.id} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  <div>{el.status}</div>
                  {getIndividualSprint(el, ind)}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
      <NewTicket {...props} />
    </div>
  );
}

export default ScrumBoard;

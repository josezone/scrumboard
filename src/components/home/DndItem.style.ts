import styled from "styled-components";


export const DndItemStyled = styled.div`
.editContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 220px;
    background-color: #d2d7d9;
}
.ticketContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.ticketVersion {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.storyPoints {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.priorityCritical{
    background-color: #ffcccb;
}
.priorityHigh{
    background-color: #FFD580;
}
.priorityNormal{
    background-color: #98FB98;
}
.priorityLow{
    background-color: #ADD8E6;
}
.dndItem{
    padding: 7px;
}
.ticketNumberStyle{
    color: #0000FF;
    cursor: pointer;
}
.resourceWrap{
    display: flex;
    gap: 7px;
    flex-wrap: wrap;
}
.borderItem{
    background-color: #FFFBC8;
    padding: 0 10px;
    border-radius: 25px;
}
`
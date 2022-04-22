import styled from "styled-components";

export const DndItemStyled = styled.div`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.25;
  letter-spacing: 0.02857em;
  /* padding: 2rem; */
  .editContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 220px;
    /* background-color: #d2d7d9; */
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
  .priorityCritical {
    /* background-color: #ffcccb; */
  }
  .priorityHigh {
    /* background-color: #FFD580; */
  }
  .priorityNormal {
    /* background-color: #98FB98; */
  }
  .priorityLow {
    /* background-color: #ADD8E6; */
  }
  .dndItem {
    padding: 7px;
    div {
      padding: 1px 0;
    }
  }

  .ticketNumberStyle {
    color: #0000ff;
    cursor: pointer;
  }
  .resourceWrap {
    display: none;
    gap: 7px;
    flex-wrap: wrap;
  }
  .borderItem {
    background-color: #fffbc8;
    padding: 0 10px;
    border-radius: 25px;
  }
`;

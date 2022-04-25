import styled from "styled-components";

export const DndItemStyled = styled.div`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 14px;
  letter-spacing: 0.8px;
  border-radius: 10px;
  padding: 0 10px;
  div:first-of-type {
    border-radius: 10px;
  }
  .editContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 220px;
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
    text-transform: capitalize;
  }
  .storyPoints {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .priorityCritical {
    .ticketNumberStyle {
      color: #ff332f;
    }
  }
  .priorityHigh {
    .ticketNumberStyle {
      color: #eb9d00;
    }
  }
  .priorityNormal {
    .ticketNumberStyle {
      color: #007000;
    }
  }
  .priorityLow {
    .ticketNumberStyle {
      color: #2e87a5;
    }
  }
  .dndItem {
    padding: 0 7px 7px 7px;

    div {
      margin: 0.1rem 0;
    }
  }
  .ticketNumberStyle {
    color: #0000ff;
    cursor: pointer;
    font-weight: 300;
  }
  .resourceWrap {
    display: flex;
    gap: 7px;
    flex-wrap: wrap;
    margin-top: 10px !important;
    margin-bottom: 10px !important;
  }
  .borderItem {
    color: rgb(70 69 69);
    font-size: 12px;
    text-transform: uppercase;
    /* font-weight: bold; */
  }
`;

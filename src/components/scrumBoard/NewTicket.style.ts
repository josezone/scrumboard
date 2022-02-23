import styled from "styled-components";

export const NewTicketStyled = styled.div`
  .cardContainer {
    padding: 10px;
    position: relative;
  }

  .formContainer {
    margin-left: 5px;
  }

  .slipContainer {
  }
  .fabButton {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .newVerButton {
    margin-left: 20px;
    width: 100px;
  }

  .MuiCard-root {
    border: none;
  }
`;

export const ModalActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

export const MoveTicketStyled = styled.div`
  width: 450px;
  padding: 10px;

  .MuiFormControl-root{
    margin: 10px 0px;
  }

  .SubmitBtn{
    margin: 10px;
  }
`

export const MoveTicketStyledWrapper = styled.div`
  margin: 10px;
`

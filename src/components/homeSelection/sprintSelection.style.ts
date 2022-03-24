import styled from "styled-components";

export const SprintSelectionStyle = styled.div`
  display: flex;
  gap: 2em;
  align-items: flex-end;
`;

export const CreateSprintStyle = styled.div`
  display: flex;
  gap: 2em;
  .createProjectSection{
    border-right: 1px solid #e6e6e6;
  }
  #mui-component-select-country{
    width: 11em;
  }

  .selectProject {
    .MuiInputBase-root {
      width: 100%;
    }
  }

  .displayInline {
    display: flex;
    .MuiFormControl-root {
      width: 100px;
      margin-right: 10px;
      margin-bottom: 10px;
    }

    p.MuiFormHelperText-root {
      margin: 0;
      padding: 0;
      font-size: x-small;
      font-weight: 500;
    }
  }

  .selectCountry .MuiInputBase-root {
    width: 100%;
  }

  .selectVersion .MuiInputBase-root {
    width: 100%;
  }

  .projecMessage {
    margin: 0;
    font-size: smaller;
    color: #5c5c5c;
  }

`;

export const ModalActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;
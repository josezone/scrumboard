import styled from "styled-components";

export const ItemDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  justify-content: space-between;

  .MuiInputLabel-root {
    font-size: 14px;
    padding: 0px 6px;
    margin: 0 5px;
  }
`;

export const SelectWrapper = styled.div`
  .MuiInput-input {
    font-size: 15px;
    width: 100%;
    padding: 0 11px;
    margin: 0 5px;
  }

  .MuiInput-root:hover:not(.Mui-disabled):before {
    border: none;
  }
  .MuiInput-root:before {
    border-bottom: none;
  }

  .MuiInput-root:after {
    border-bottom: none;
  }
`;

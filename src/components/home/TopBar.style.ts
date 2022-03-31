import styled from "styled-components";

export const TopBarStyled = styled.div`
  .projectGroup {
    margin-top: 20px;
    display: flex;
    gap: 15px;
  }
  .selected {
    :hover {
      color: blue;
      cursor: pointer;
    }
  }
`;

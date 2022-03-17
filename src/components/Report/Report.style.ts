import styled from "styled-components";

const ReportStyled = styled.div`
  .cardContainer {
    .MuiCardActions-root {
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 2rem 0;
      .MuiButton-root {
        text-transform: unset;
        box-shadow: unset;
        width: 110px;
      }
    }
  }
  .MuiPaper-root {
    width: 100%;
    max-width: none;
  }
  .MuiCardContent-root {
    padding: 1rem 2rem 2rem;
  }
  .MuiContainer-root {
    margin: 2rem auto;
  }
`;

export { ReportStyled };

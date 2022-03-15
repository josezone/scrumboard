import { Container } from "@mui/material";
import styled from "styled-components";


const SprintReportStyled = styled(Container)`
    margin-top: 50px;

    .MuiButton-root{
        margin-bottom: 10px;
    }

    .btnContainer{
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .MuiButton-root{
            box-shadow: unset;
            border-radius: 200px;
            text-transform: none;
        }
    }
`;

export {
    SprintReportStyled
}
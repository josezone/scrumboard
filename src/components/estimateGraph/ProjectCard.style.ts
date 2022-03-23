import styled from "styled-components";


export const ProjectCardStyled = styled.div`
    padding: 5px;
    border-radius: 8px;
    display: inline-block;
    background-color: white;
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
    width: 275px;
    .cardHead{
        display: flex;
        justify-content: space-around;
    }
    .cardBody{
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
        gap: 10px;
    }
`
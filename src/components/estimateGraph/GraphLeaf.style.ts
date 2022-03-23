import styled from "styled-components";


export const GraphLeafStyled = styled.div`
    padding: 5px;
    border-radius: 8px;
    display: inline-block;
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
    background-color: white;
    width: 200px;
    .cardHead{
        display: flex;
        justify-content: space-around;
        padding: 11px;
        color:#1976d2;
    }
    .cardBody{
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
    }
    .total{
        color:#1976d2;
    }
    .headContainer{
        display:flex;
        justify-content:space-between;
    }
`
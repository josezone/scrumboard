import styled from "styled-components";


export const GraphLeafStyled = styled.div`
    padding: 5px;
    border-radius: 8px;
    display: inline-block;
    border: 1px solid black;
    background-color: white;
    width: 200px;
    .cardHead{
        display: flex;
        justify-content: space-around;
    }
    .cardBody{
        display: flex;
        justify-content: space-around;
        margin-top: 10px;
    }
    .total{
        color:blue;
    }
`
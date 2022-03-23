import styled from "styled-components";

export const ResourcePlaningDragStyle = styled.div`
 width:100%;
 display:flex;
 .cells1{
    width:100px;
 }
 .cells2{
    width:150px;
 }
 @media (max-width: 1560px) {
    .cells{
        flex-grow:1;
        width:calc(100vw/6)
    }
 }
 @media (min-width: 1561px) {
    .cells{
        flex-grow:1;
        width:calc(100vw/5.6)
    }
}
`;
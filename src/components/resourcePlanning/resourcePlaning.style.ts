import styled from "styled-components";

export const ResourcePlaningDragStyle = styled.div`
 width:100%;
 display:flex;
 @media (max-width: 1560px) {
    .cells{
        flex-grow:1;
        width:calc(100vw/5)
    }
 }
 @media (min-width: 1561px) {
    .cells{
        flex-grow:1;
        width:calc(100vw/4.4)
    }
}
`;
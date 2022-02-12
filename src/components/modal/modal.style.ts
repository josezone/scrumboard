import styled from "styled-components";

const ModalStyleWrapper = styled("div")`
    .modalContainer{
  
    }
`;

const ModalContentStyle = styled("div")`
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: #fff;
        box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
        padding: 32px;

        .closeButton{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modalTitle{
            font-size: 20px;
            font-weight: bold;
        }


`

export {
    ModalStyleWrapper,
    ModalContentStyle
}
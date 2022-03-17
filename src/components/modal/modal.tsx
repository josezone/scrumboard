import { cloneElement, FC } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import { ModalProps, Typography } from "@mui/material"

import { ModalStyleWrapper, ModalContentStyle } from "./modal.style";

interface IModalComponent extends ModalProps{
    handleClose: () => void,
    title: string,
    componentsProps?: any
  }

 const ModalComponent: FC<IModalComponent> =  (props) => {
    const { children, title, handleClose, componentsProps, ...rest  } = props;
    return (
        <ModalStyleWrapper>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                onClose={handleClose}
                {...rest}
            >
                    <ModalContentStyle  >
                        <div className="closeButton">
                        <Typography id="modal-modal-title" variant="h6" component="h2">{title}</Typography>
                        </div>
                      
                        {cloneElement(children, { modalProps:  componentsProps?.data})}
                    </ModalContentStyle>
        
            </Modal>
        </ModalStyleWrapper>
    );
}

export default ModalComponent;
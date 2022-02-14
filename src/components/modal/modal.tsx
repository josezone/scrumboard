import { FC } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import { IconButton, ModalProps, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { ModalStyleWrapper, ModalContentStyle } from "./modal.style";

interface IModalComponent extends ModalProps{
    handleCloseIconClick: () => void,
    title: string
  }

 const ModalComponent: FC<IModalComponent> =  (props) => {
    const { children, title, handleCloseIconClick, ...rest  } = props;

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
                {...rest}
            >
                    <ModalContentStyle  >
                        <div className="closeButton">
                        <Typography id="modal-modal-title" variant="h6" component="h2">{title}</Typography>
                            <IconButton  onClick={handleCloseIconClick}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                      
                        {children}
                    </ModalContentStyle>
        
            </Modal>
        </ModalStyleWrapper>
    );
}

export default ModalComponent;
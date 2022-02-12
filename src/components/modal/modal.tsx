import { FC } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import { IconButton, ModalProps } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { ModalStyleWrapper, ModalContentStyle } from "./modal.style";

interface IModalComponent extends ModalProps{
    handleCloseIconClick: () => void
  }

 const ModalComponent: FC<IModalComponent> =  (props) => {
    const { children, handleCloseIconClick, ...rest  } = props;

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
                            <div className="modalTitle" >Add ticket </div>
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
import { FC } from "react";
import NewTicket from "./NewTicket";


interface IEditProfile {
    ticket: string,
    priority: any,
    restProps: any,
    be_story: number | null,
    fe_story: number | null,
    qa_story: number | null,
    version:  any,
    scope: any,
    editModal: boolean,
    handleClose: () => void,
    id: number
}


const EditTicket: FC<IEditProfile> = (props) => {
    const { restProps = {}, handleClose, ...rest } = props;
    const initialValues = {
        ...rest,
        beStory: props?.be_story,
        feStory: props?.fe_story,
        qaStory: props?.qa_story,
        priority: props?.priority?.id,
        version: props?.version?.id,
        scope: props?.scope?.id
    }
    
    const handleEditSubmit = (values: any) => {
        handleClose()
        const payload = {
            ...values,
            ticket_id: rest?.id
        }

        restProps.send({ type: "updateTicket", prop: payload });
    }


    return (
        <NewTicket 
            {...restProps} 
            editModal={rest?.editModal} 
            handleClose={handleClose} 
            handleEditSubmit={handleEditSubmit} 
            initialValues={initialValues}
            modalTitleName="Edit Ticket"
            type="editTicket" />
    );
}

export default EditTicket
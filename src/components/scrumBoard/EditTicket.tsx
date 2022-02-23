import { FC } from "react";
import NewTicket from "./NewTicket";
import MoveTicket from "./moveTicket";
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
    id: number,
    qa_spill: number | null,
    fe_spill: number | null,
    be_spill: number | null,
    spill: boolean
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

    const moveTicketInitialValue = {
        beSpill: props?.be_spill || null,
        feSpill: props?.fe_spill || null,
        qaSpill: props?.qa_spill ||null,
        sprintId: null,
        ticketId: props?.id,
        spill: Boolean(props.spill)
    }
    
    const handleEditSubmit = (values: any) => {
        handleClose()
        const payload = {
            ...values,
            ticket_id: rest?.id
        }
        restProps.send({ type: "updateTicket", prop: payload });
    }

    const handleMoveTicketSubmit = (data: any) => {
        let payload = data;
        if(!Boolean(data.spill)){
            payload = {
                ...moveTicketInitialValue,
                sprintId: data?.sprintId,
            }
        }
        restProps.send({ type: "changeTicketSprint", prop: payload });
        handleClose()
    }


    return (
        <NewTicket 
            {...restProps} 
            editModal={rest?.editModal} 
            handleClose={handleClose} 
            handleEditSubmit={handleEditSubmit} 
            initialValues={initialValues}
            modalTitleName="Edit Ticket"
            type="editTicket" 
            chamgeSprintComponent={<MoveTicket 
                                        sprintList={restProps?.sprintListMoving || []} 
                                        onSubmit={handleMoveTicketSubmit}
                                        initialValues={moveTicketInitialValue} />}
        />
    );
}

export default EditTicket
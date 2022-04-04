import Breadcrumbs from "@mui/material/Breadcrumbs";
import { dateConvert } from "./SrumBar";
import TicketBody from "./TicketBody";

function NewTicket(props: any) {
  return (
    <div>
      <Breadcrumbs>
        <div>{props.modalProps?.projectGroupSelected?.name}</div>
        <div>{dateConvert(props.modalProps?.scrumSelected?.scrum)}</div>
        <div>{props.modalProps?.projectSelected?.project}</div>
        <div>{props.modalProps?.sprintSelected?.country?.country}</div>
        <div>{props.modalProps?.sprintSelected?.version?.version}</div>
        <div>{props.modalProps?.sprintSelected?.sprint}</div>
      </Breadcrumbs>
      <TicketBody
        {...props.modalProps}
        toggleOpenTicket={props.toggleOpenTicket}
        editMode={props.editMode}
      />
    </div>
  );
}

export default NewTicket;

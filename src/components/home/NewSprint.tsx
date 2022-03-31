import Breadcrumbs from "@mui/material/Breadcrumbs";
import SprintBody from "./SprintBody";
import { dateConvert } from "./SrumBar";

function NewSprint(props: any) {
  return (
    <div>
      <Breadcrumbs>
        <div>{props.modalProps.projectGroupSelected.name}</div>
        <div>{dateConvert(props.modalProps.scrumSelected.scrum)}</div>
        <div>{props.modalProps.projectSelected.project}</div>
      </Breadcrumbs>
      <SprintBody
        {...props.modalProps}
        toggleOpenTicket={props.toggleOpenTicket}
        editMode={props.editMode}
      />
    </div>
  );
}

export default NewSprint;

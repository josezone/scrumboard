import Breadcrumbs from "@mui/material/Breadcrumbs";
import ChangeSprintBody from "./ChangeSprintBody";

function ChangeSprint(props:any){
    return (
        <div>
          <Breadcrumbs>
            <div>{props.modalProps.projectGroupSelected.name}</div>
            <div>{props.modalProps.projectSelected.project}</div>
            <div>{props.modalProps.sprintSelected.country.country}</div>
          </Breadcrumbs>
          <ChangeSprintBody
           {...props.modalProps}
           toggleChangeSprint={props.toggleChangeSprint}
           editMode={props.editMode}
          />
        </div>
      );
}

export default ChangeSprint;
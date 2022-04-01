import Breadcrumbs from "@mui/material/Breadcrumbs";
import VersionBody from "./VersionBody";

function NewVersion(props: any) {
  return (
    <div>
      <Breadcrumbs>
        <div>{props.modalProps.projectGroupSelected.name}</div>
        <div>{props.modalProps.projectSelected.project}</div>
      </Breadcrumbs>
      <VersionBody
        {...props.modalProps}
        toggleOpenVersion={props.toggleOpenVersion}
        editMode={props.editMode}
      />
    </div>
  );
}

export default NewVersion;

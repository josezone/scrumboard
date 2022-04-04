import Breadcrumbs from "@mui/material/Breadcrumbs";
import ScrumBody from "./ScrumBody";

function NewScrum(props: any) {
  return (
    <div>
      <Breadcrumbs>
        <div>{props.modalProps?.projectGroupSelected?.name}</div>
      </Breadcrumbs>
      <ScrumBody
        {...props.modalProps}
        toggleOpenScrum={props.toggleOpenScrum}
      />
    </div>
  );
}

export default NewScrum;

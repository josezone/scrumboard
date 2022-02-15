import AddIcon from "@mui/icons-material/Add";
import {AddIconWrapper} from "./AddNew.style";

interface IAddNew {
  addNew?: () => void;
}

function AddNew(props: IAddNew) {
  return (
    <AddIconWrapper>
      <AddIcon fontSize="small" color="primary" onClick={props.addNew} />
    </AddIconWrapper>
  );
}

export default AddNew;

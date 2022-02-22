import AddIcon from "@mui/icons-material/Add";
import {AddIconWrapper} from "./AddNewAppBar.style";

interface IAddNew {
  addNew?: () => void;
}

function AddNewAppBar(props: IAddNew) {
  return (
    <AddIconWrapper>
      <AddIcon fontSize="small" color="primary" onClick={props.addNew} />
    </AddIconWrapper>
  );
}

export default AddNewAppBar;

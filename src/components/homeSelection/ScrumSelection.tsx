import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import isWeekend from "date-fns/isWeekend";
import { ScrumSelectionStyle } from "./scrumSelection.style";

function ScrumSelection(props: any) {

  const handleClickOpen = () => {
    props.send({ type: "createScrumPopupOpen" });
  };

  const handleClose = () => {
    props.send({ type: "createScrumPopupClose" });
  };

  const handleCreateScrum = () => {
    props.send({ type: "initiateScrumCreate" });
  }

  const activateScrum = () => {
    props.send({ type: "activateScrum" });
  };

  return (
    <ScrumSelectionStyle>
      {props.selectedScrum && !props.selectedScrum.active && (
        <div>
          <Button
            variant="contained"
            onClick={activateScrum}
          >
            Activate Scrum
          </Button>
        </div>
      )}
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Create Scrum
        </Button>
        <Dialog open={props.scrumCreateOpen} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">{"Create Scrum"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  orientation="landscape"
                  openTo="day"
                  value={props.scrumCreateData}
                  shouldDisableDate={isWeekend}
                  onChange={(newValue: any) => {
                    props.send({ type: "createScrum", prop: newValue });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreateScrum} autoFocus>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ScrumSelectionStyle>
  );
}

export default ScrumSelection;

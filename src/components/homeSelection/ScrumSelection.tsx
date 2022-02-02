import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";
import isWeekend from "date-fns/isWeekend";
import { ScrumSelectionStyle } from "./scrumSelection.style";

const year = new Date().getFullYear();

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

  const onYearChange = (event: any) => {
    props.send({ type: "yearChanged", prop: event.target.value });
  };

  const onScrumChange = (event: any) => {
    const selectedObjList = props.scrumList.filter(
      (obj: any) => obj.id === Number(event.target.value)
    );
    let selectedObj = {};
    if (selectedObjList.length) {
      selectedObj = selectedObjList[0];
    }
    props.send({ type: "scrumChanged", prop: selectedObj });
  };

  const activateScrum = () => {
    props.send({ type: "activateScrum" });
  };

  return (
    <ScrumSelectionStyle>
      <div>
        <InputLabel variant="standard" htmlFor="selectYearNative">
          Year
        </InputLabel>
        <NativeSelect
          defaultValue={props.year}
          onChange={onYearChange}
          inputProps={{
            name: "Year",
            id: "selectYearNative",
          }}
        >
          <option value={year}>{year}</option>
          <option value={year - 1}>{year - 1}</option>
        </NativeSelect>
      </div>
      {props.selectedScrum && props.scrumList && props.scrumList.length && (
        <div>
          <InputLabel variant="standard" htmlFor="selectSprintNative">
            Scrum
          </InputLabel>
          <NativeSelect
            defaultValue={props.selectedScrum.id}
            onChange={onScrumChange}
            inputProps={{
              name: "Scrum",
              id: "selectSprintNative",
            }}
          >
            {props.scrumList.map((scrum: any) => {
              return (
                <option value={scrum.id} key={scrum + scrum.scrum}>
                  {new Date(scrum.scrum).toLocaleString("default", {
                    month: "long",
                  }) +
                    " " +
                    new Date(scrum.scrum).getDate()}
                </option>
              );
            })}
          </NativeSelect>
        </div>
      )}
      {props.selectedScrum && (
        <div>
          <Button
            variant="contained"
            disabled={props.selectedScrum.active}
            onClick={activateScrum}
          >
            Activate
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

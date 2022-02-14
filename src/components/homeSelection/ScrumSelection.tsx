import { Fragment } from "react";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import isWeekend from "date-fns/isWeekend";
import ModalComponent from "../modal/modal";

function ScrumSelection(props: any) {

  const handleClose = () => {
    props.send({ type: "createScrumPopupClose" });
  };

  const handleCreateScrum = () => {
    props.send({ type: "initiateScrumCreate" });
  };

  return (
    <ModalComponent
      title="Create Scrum"
      open={props.scrumCreateOpen}
      handleClose={handleClose}
    >
      <Fragment>
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreateScrum}>
          Create
        </Button>
      </Fragment>
    </ModalComponent>
  );
}

export default ScrumSelection;

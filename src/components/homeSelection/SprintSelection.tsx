import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  CreateSprintStyle,
  SprintSelectionStyle,
} from "./sprintSelection.style";

const schema = yup
  .object({
    sprint: yup.string().required(),
    country: yup.string().required(),
  })
  .required();

function SprintSelection(props: any) {
  const {
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [countrySelect, setCountrySelect] = useState("");
  const [newCountry, setNewCountry] = useState("");

  const addCountry = (event: any) => {
    if (newCountry) {
      props.send({ type: "assignNewCountry", prop: newCountry });
      setNewCountry("");
    }
  };

  const newCountryChange = (event: any) => {
    setNewCountry(event.target.value);
  };

  const handleClickOpen = () => {
    props.send({ type: "createSprintPopupOpen" });
  };

  const handleClose = () => {
    reset();
    setCountrySelect("");
    setNewCountry("");
    props.send({ type: "createSprintPopupClose" });
  };

  const onSubmit = (e: any) => {
    handleSubmit((data: any) => {
      reset();
      e.target.reset();
      setCountrySelect("");
      props.send({ type: "assignNewSprint", prop: data });
    })(e);
  };

  return (
    <SprintSelectionStyle>
      <div>
        {props.selectedProject && (
          <Button variant="outlined" onClick={handleClickOpen}>
            Create Sprint
          </Button>
        )}
        <Dialog open={props.newSprintPopup} onClose={handleClose}>
          <form onSubmit={onSubmit}>
            <DialogTitle id="alert-dialog-title">{"Create Sprint"}</DialogTitle>
            <DialogContent>
              <Box>
                <DialogContentText id="alert-dialog-description">
                  <CreateSprintStyle>
                    <div>
                      <div>
                        <InputLabel variant="standard" id="sprintInputTitle">
                          Sprint
                        </InputLabel>
                        <Controller
                          name="sprint"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              error={errors.sprint ? true : false}
                              helperText={errors?.sprint?.message}
                            />
                          )}
                        />
                      </div>
                      {props.countryList && props.countryList.length && (
                        <div>
                          <InputLabel
                            variant="standard"
                            htmlFor="selectSprintNative"
                          >
                            Country
                          </InputLabel>
                          <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                              <Select
                                {...field}
                                value={countrySelect}
                                onChange={(e: any) => {
                                  setCountrySelect(e.target.value);
                                  field.onChange(e);
                                }}
                                error={errors.country ? true : false}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {props.countryList.map((country: any) => {
                                  return (
                                    <MenuItem
                                      value={country.id}
                                      key={country + country.country}
                                    >
                                      {country.country}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            )}
                          />
                        </div>
                      )}
                    </div>
                    <div className="createProjectSection" />
                    <div>
                      <InputLabel variant="standard" id="newCountry">
                        New Country
                      </InputLabel>
                      <TextField
                        onChange={newCountryChange}
                        value={newCountry}
                      />
                      <Fab size="small" color="primary" onClick={addCountry}>
                        <AddIcon />
                      </Fab>
                    </div>
                  </CreateSprintStyle>
                </DialogContentText>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" autoFocus>
                Create
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </SprintSelectionStyle>
  );
}

export default SprintSelection;

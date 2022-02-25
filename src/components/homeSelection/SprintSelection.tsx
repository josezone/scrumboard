import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

import Fab from "@mui/material/Fab";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState, Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  CreateSprintStyle,
  SprintSelectionStyle,
  ModalActionContainer,
} from "./sprintSelection.style";
import ModalComponent from "../modal/modal";
import { useEffect } from "react";

const schema = yup
  .object({
    sprint: yup.string().required(),
    country: yup.string().required(),
  })
  .required();

function SprintSelection(props: any) {
  const { editMode = false, handleEditMode, selectedSprint } = props;
  const {
    reset,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [countrySelect, setCountrySelect] = useState("");
  const [newCountry, setNewCountry] = useState("");

  useEffect(() => {
    if (editMode) {
      setCountrySelect(selectedSprint?.country?.id);
      setValue("sprint", selectedSprint?.sprint);
      setValue("country", selectedSprint?.country?.id);
    } else {
      setValue("sprint", "");
      setValue("country", "");
    }
  }, [selectedSprint?.sprint, editMode]);

  const addCountry = (event: any) => {
    if (newCountry) {
      props.send({ type: "assignNewCountry", prop: newCountry });
      setNewCountry("");
    }
  };

  const newCountryChange = (event: any) => {
    setNewCountry(event.target.value);
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
      if (!editMode) {
        props.send({ type: "assignNewSprint", prop: data });
      } else {
        props.send({ type: "updateSprint", prop: data });
        handleEditMode();
      }
    })(e);
  };

  return (
    <SprintSelectionStyle>
      <div>
        <ModalComponent
          open={editMode ? editMode : props.newSprintPopup}
          handleClose={editMode ? handleEditMode : handleClose}
          title={editMode ? "Update Sprint" : "Create Sprint"}
        >
          <Fragment>
            <form onSubmit={onSubmit}>
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
                  <TextField onChange={newCountryChange} value={newCountry} />
                  <Fab size="small" color="primary" onClick={addCountry}>
                    <AddIcon />
                  </Fab>
                </div>
              </CreateSprintStyle>
              <ModalActionContainer>
                <Button onClick={editMode ? handleEditMode : handleClose}>
                  Cancel
                </Button>
                <Button type="submit"> {editMode ? "Update" : "Create"}</Button>
              </ModalActionContainer>
            </form>
          </Fragment>
        </ModalComponent>
      </div>
    </SprintSelectionStyle>
  );
}

export default SprintSelection;

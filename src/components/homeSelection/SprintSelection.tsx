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
    country: yup.string().notOneOf(["0", undefined, null]).required(),
    project: yup.string().notOneOf(["0", undefined, null]).required(),
    version: yup.string().notOneOf(["0", undefined, null]).required()
  })
  .required();

function SprintSelection(props: any) {
  const { editMode = false, handleEditMode, selectedSprint, selectedProject, selectedCountry, selectedVersion } = props;
  const {
    reset,
    handleSubmit,
    resetField,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [newCountry, setNewCountry] = useState<string>('');
  
  const [newProject, setNewProject] = useState("");
  const [newVersion, setNewVersion] = useState("");
  const [sprint, setSprintName] = useState("");

  useEffect(() => {
    if (editMode) {
      let sprintName = selectedSprint?.sprint.split('-');
      sprintName = sprintName[sprintName.length - 1]
      setSprintName(sprintName);
      setValue("sprint", sprintName);
      setValue("country", selectedSprint?.country?.id);
      setValue("project", selectedProject?.id)
    } else {
      setValue("sprint", "");
      setValue("country", selectedSprint?.country?.id || 0);
      setValue("project", selectedProject?.id || 0);
      setValue("version", selectedVersion?.id || 0);
    }
  }, [editMode, props?.newSprintPopup]);

  useEffect(() => {
    setValue("project", selectedProject?.id || 0);
  }, [selectedProject?.id])

  useEffect(() => {
    setValue("version", selectedVersion?.id || 0);
  }, [selectedVersion?.id])

  const addCountry = (event: any) => {
    if (newCountry) {
      props.send({ type: "assignNewCountry", prop: newCountry });
      setNewCountry("");
      resetField('country');
    }
  };
  
  const addProject = (event: any) => {
    if (newProject) {
      props.send({ type: "createProject", prop: newProject });
      setNewProject("");
    }
  };
  
  const addVersion = (event: any) => {
    if (newVersion) {
      props.send({ type: "newVersion", prop: newVersion });
      setNewVersion("");
    }
  };
  
  const newCountryChange = (event: any) => {
    setNewCountry(event.target.value);
  };
  
  const handleClose = () => {
    reset();
    setValue('country', 0);
    setSprintName("");
    props.send({ type: "createSprintPopupClose" });
  };

  const onSubmit = (e: any) => {
    handleSubmit((data: any) => {
      const name = getName();
      if (!editMode) {
        props.send({ type: "assignNewSprint", prop: { ...data, sprint: name } });
      } else {
        props.send({ type: "updateSprint", prop: { ...data, sprint: name } });
        handleEditMode();
      }
      setSprintName("");
      reset();
      e.target.reset();
    })(e);
  };

  const isDisabled = () => {
    return (!selectedCountry || !selectedProject) ? true : false
  }

  const getName = () => {
    if (!props.countryList) return '';
    const countryName = props.countryList?.find((country: { country: string, id: any }) => country.id == selectedCountry?.id)?.country;
    const versionName = props.versionList?.find((version: any) => version.id === selectedVersion?.id)?.version;
    let sprintName = '';
    sprintName += countryName ? `${countryName}-` : '';
    sprintName += selectedProject?.project ? `${selectedProject?.project}-` : '';
    sprintName += versionName ? `${versionName}-` : '';
    sprintName += sprint ? `${sprint}` : '';
    return sprintName
  }

  const onVersionSelect = (event: any) => {
    const selectedversion = props?.versionList?.filter(
      (version: any) => version.id === Number(event.target.value)
    );
    props.send({ type: "setVersion", prop: selectedversion[0] });
  }

  return (
    <SprintSelectionStyle>
      <div>
        <ModalComponent
          open={editMode ? editMode : props.newSprintPopup}
          handleClose={editMode ? handleEditMode : handleClose}
          title={editMode ? "Update Sprint" : "Create Sprint"}
        >

          <Fragment>
            <span>{getName()}</span>
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
                          onChange={(e) => {
                            setSprintName(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      )}
                    />
                  </div>

                  <div className="selectCountry">
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
                          id="country"
                          {...field}
                          value={selectedCountry?.id || 0}
                          onChange={(e: any) => {
                            props.onCountryChanged(e);
                            field.onChange(e);
                          }}
                          error={errors.country ? true : false}
                        >
                          <MenuItem value={0}>
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


                  <div className="selectProject">
                    <InputLabel
                      variant="standard"
                      htmlFor="project"
                    >
                      Project
                    </InputLabel>
                    <Controller
                      name="project"
                      control={control}
                      render={({ field }) => (
                        <Select
                          id="project"
                          {...field}
                          value={selectedProject?.id || 0}
                          onChange={(e: any) => {
                            props.onProjectChanged(e);
                            field.onChange(e);
                          }}
                          error={errors.project ? true : false}
                        >
                          <MenuItem value={0}>
                              <em>None</em>
                            </MenuItem>
                          {props.projectList.map((project: any) => {
                            return (
                              <MenuItem
                                value={project.id}
                                key={project.id}
                              >
                                {project.project}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      )}
                    />
                    {props?.projectList?.length === 0 ? <p className="projecMessage">Please create a Project</p> : null}
                  </div>

                  {/* select versions */}

                  <div className="selectVersion">
                    <InputLabel
                      variant="standard"
                      htmlFor="version"
                    >
                      Version
                    </InputLabel>
                    <Controller
                      name="version"
                      control={control}
                      render={({ field }) => (
                        <Select
                          id="version"
                          {...field}
                          value={selectedVersion?.id || 0}
                          onChange={(e: any) => {
                            onVersionSelect(e);
                            field.onChange(e);
                          }}
                          error={errors.version ? true : false}
                        >
                          <MenuItem value={0}>
                            <em>None</em>
                          </MenuItem>
                          {props.versionList.map((version: any) => {
                            return (
                              <MenuItem
                                value={version.id}
                                key={version.id}
                              >
                                {version.version}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      )}
                    />
                  </div>

                </div>
                <div className="createProjectSection" />
                <div className="createSction">
                  {/* // * add country */}
                  <div>
                    <InputLabel variant="standard" id="newCountry">
                      New Country
                    </InputLabel>
                    <div className="displayInline">
                      <TextField onChange={newCountryChange} value={newCountry} />
                      <Fab size="small" color="primary" onClick={addCountry}>
                        <AddIcon />
                      </Fab>
                    </div>
                  </div>

                  <div>
                    <InputLabel variant="standard" id="newProject">
                      New Project
                    </InputLabel>
                    <div className="displayInline">
                      <TextField onChange={(event) => setNewProject(event.target.value)} value={newProject} />
                      <Fab size="small" color="primary" onClick={addProject}>
                        <AddIcon />
                      </Fab>
                    </div>
                  </div>

                  <div className="selectVersion">
                    <InputLabel variant="standard" id="newProject">
                      New Version
                    </InputLabel>
                    <div className="displayInline">
                      <TextField
                        disabled={isDisabled()}
                        onChange={(event) => setNewVersion(event.target.value)}
                        value={newVersion}
                        helperText="Required Country and Project"
                      />
                      <Fab size="small" color="primary" onClick={addVersion} disabled={isDisabled()} >
                        <AddIcon />
                      </Fab>
                    </div>
                  </div>

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

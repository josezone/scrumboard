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
    project: yup.string().required(),
    version: yup.string().required()
  })
  .required();

function SprintSelection(props: any) {
  const { editMode = false, handleEditMode, selectedSprint, selectedProject } = props;
  const {
    reset,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [countrySelect, setCountrySelect] = useState<string | undefined>(undefined);
  const [newCountry, setNewCountry] = useState<string | undefined>(undefined);
  const [projectSelected, setProjectSelected] = useState("");
  const [newProject, setNewProject] = useState("");
  const [newVersion, setNewVersion] = useState("");
  const [versionSelected, setVersionSelected] = useState<string | undefined>(undefined);
  const [sprint, setSprintName] = useState("");

  useEffect(() => {
    if (editMode) {
      const spitName = selectedSprint?.sprint.split('-');
      setProjectSelected(selectedProject?.id)
      setCountrySelect(selectedSprint?.country?.id);
      setValue("sprint", spitName[spitName.length - 1]);
      setValue("country", selectedSprint?.country?.id);
      setValue("project", selectedProject?.id)
    } else {
      setValue("sprint", "");
      setValue("country", undefined);
      setValue("project", selectedProject?.id || undefined);
    }
  }, [selectedSprint?.sprint, editMode, selectedSprint?.country?.id, selectedProject?.id]);

  const addCountry = (event: any) => {
    if (newCountry) {
      props.send({ type: "assignNewCountry", prop: newCountry });
      setNewCountry("");
    }
  };

  const addProject = (event: any) => {
    if (newProject) {
      props.send({ type: "createProject", prop: newProject });
      setNewCountry("");
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
    setCountrySelect("");
    setNewCountry("");
    props.send({ type: "createSprintPopupClose" });
  };

  const onSubmit = (e: any) => {
    // if (!countrySelect || !projectSelected || !versionSelected || sprint === '') 
    handleSubmit((data: any) => {
      reset();
      e.target.reset();
      setCountrySelect("");
      if (!editMode) {
        props.send({ type: "assignNewSprint", prop: { ...data, sprint: getName() } });
      } else {
        props.send({ type: "updateSprint", prop: { ...data, sprint: getName() } });
        handleEditMode();
      }
    })(e);
  };

  const isDisabled = () => {
    return (countrySelect === undefined || projectSelected === undefined) ? true : false
  }

  const getName = () => {
    if (!props.countryList) return '';
    const countryName = props.countryList?.find((country: { country: string, id: any }) => country.id == countrySelect)?.country;
    const versionName = props.versionList?.find((version: any) => version.id === versionSelected)?.version;
    let sprintName = '';
    sprintName += countryName ? `${countryName}-` : '';
    sprintName += selectedProject?.project ? `${selectedProject?.project}-` : '';
    sprintName += versionName ? `${versionName}-` : '';
    sprintName += sprint ? `${sprint}` : '';
    return sprintName
  }

  const onVersionSelect = (version: string) => {
    setVersionSelected(version);
    props.send({ type: "setVersion", prop: version });
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
                  {props.countryList && props.countryList.length > 0 && (
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
                            value={countrySelect}
                            onChange={(e: any) => {
                              setCountrySelect(e.target.value);
                              props.onCountryChanged(e);
                              field.onChange(e);
                            }}
                            error={errors.country ? true : false}
                          >
                            {/* <MenuItem value="">
                              <em>None</em>
                            </MenuItem> */}
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

                  <div className="selectProject">
                    <InputLabel
                      variant="standard"
                      htmlFor="project"
                    >
                      Project
                    </InputLabel>
                    <Controller
                      name="Project"
                      control={control}
                      render={({ field }) => (
                        <Select
                          id="project"
                          {...field}
                          value={selectedProject?.id}
                          onChange={(e: any) => {
                            setProjectSelected(e.target.value);
                            props.onProjectChanged(e);
                            field.onChange(e);
                          }}
                          error={errors.project ? true : false}
                        >
                          {/* <MenuItem value={selectedProject}>
                              <em>{selectedProject}</em>
                            </MenuItem> */}
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
                          value={versionSelected}
                          onChange={(e: any) => {
                            onVersionSelect(e.target.value);
                            field.onChange(e);
                          }}
                          error={errors.version ? true : false}
                        >
                          <MenuItem value="">
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

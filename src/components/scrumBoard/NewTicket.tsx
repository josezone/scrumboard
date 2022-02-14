import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useState, useMemo, Fragment, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { NewTicketStyled } from "./NewTicket.style";
import Modal from "../modal/modal"
import Button from '@mui/material/Button';
import { Grid, IconButton } from "@mui/material";
import MultipleSelect from "../multiSelect/multiSelect";

const schema = yup
  .object({
    ticket: yup.string().required(),
    priority: yup.string().required(),
    scope: yup.string().required(),
    version: yup.string().required(),
    beStory: yup.number(),
    feStory: yup.number(),
    qaStory: yup.number(),
  })
  .required();

function NewTicket(props: any) {
  const formProps = useForm({
    resolver: yupResolver(schema),
  });
  const [resourceCheck, setResourceCheck] = useState<any>({});
  const [touched, setTouched] = useState<boolean>(false);
  const [priority, setPriority] = useState<string>("");
  const [version, setVersion] = useState<string>("");
  const [scope, setScope] = useState<string>("");
  const [newVersion, setNewVersion] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [resourceList, setResourceList] = useState<Array<any>>([]);
  const [selectedResources, setSelectedResources] = useState<Array<any>>([]);

  useEffect(() => {
    const resource = props.resourceList?.map((reso: any) => ({ ...reso, value: reso?.resource }))
    setResourceList(resource);
    
  },[JSON.stringify(props.resourceList)])

  const handleChange = (resource: any) => (event: any) => {
    setTouched(true);
    const currVal = JSON.parse(JSON.stringify(resourceCheck));
    const newVal = currVal ? currVal : {};
    const val = newVal[resource.id] ? newVal[resource.id] : {};
    newVal[resource.id] = { ...val, checked: event.target.checked };
    setResourceCheck(newVal);
  };

  const handleChangeValue = (resource: any) => (event: any) => {
    setTouched(true);
    const currVal = JSON.parse(JSON.stringify(resourceCheck));
    const newVal = currVal ? currVal : {};
    const val = newVal[resource.id] ? newVal[resource.id] : {};
    newVal[resource.id] = { ...val, value: event.target.value };
    setResourceCheck(newVal);
  };

  const createNewVersion = () => {
    if (newVersion) {
      props.send({ type: "newVersion", prop: newVersion });
      setNewVersion("");
    }
  };

  const onSubmit = (e: any) => {
    formProps.handleSubmit((data: any) => {
      if (touched) {
        setTouched(false);
      }
      setPriority("");
      setScope("");
      setVersion("");
      formProps.reset();
      e.target.reset();
      const resources: any = [];
      Object.keys(resourceCheck).forEach((key: any) => {
        if (resourceCheck[key].checked && resourceCheck[key].value) {
          resources.push({
            resourceId: key,
            storyPoints: resourceCheck[key].value,
          });
        }
      });
      setResourceCheck({});
      if (!resources.length) {
        return;
      }
      const newData = {
        ticket: {
          ticket: data.ticket,
          scopeId: data.scope,
          versionId: data.version,
          priorityId: data.priority,
          spill: data.spill ? true : false,
          beStory: data.spill ? null : data.beStory ? data.beStory : null,
          feStory: data.spill ? null : data.feStory ? data.feStory : null,
          qaStory: data.spill ? null : data.qaStory ? data.qaStory : null,
          beSpill: data.spill ? (data.beSpill ? data.beSpill : null) : null,
          feSpill: data.spill ? (data.feSpill ? data.feSpill : null) : null,
          qaSpill: data.spill ? (data.qaSpill ? data.qaSpill : null) : null,
        },
        resources,
      };
      console.log(newData);

       props.send({ type: "newTicket", prop: newData });
    })(e);
  };

  const getResourceError = () => {
    if (!touched) {
      return false;
    }
    let val;
    Object.keys(resourceCheck).forEach((key: any) => {
      if (resourceCheck[key].checked && resourceCheck[key].value) {
        val = true;
      }
    });
    return val ? false : true;
  };

  const handleCloseModal = (): void => {
    setModal(m => !m)
  }

  const handleChangeResource = (payload: Array<any>): void => {
    setSelectedResources(payload);
  }

  return (
    <Fragment>
      <Button onClick={handleCloseModal} variant="contained" >Add New Ticket</Button>
      <Modal title="Add new ticket" open={modal} handleCloseIconClick={handleCloseModal} >
        <NewTicketStyled>
          <Card variant="outlined" className="cardContainer">
            <form onSubmit={onSubmit} className="formContainer">
              <Grid container spacing={2} >
                <Grid item md={6} sm={12} >
                  <Controller
                    name="ticket"
                    control={formProps.control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="standard-basic"
                        label="Ticket"
                        variant="outlined"
                        className="textConatiner"
                        fullWidth
                        error={formProps.formState.errors.ticket ? true : false}
                        helperText={formProps.formState.errors?.ticket?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControl fullWidth >
                    <InputLabel id="priority">Priority</InputLabel>
                    <Controller
                      name="priority"
                      control={formProps.control}
                      render={({ field }) => (
                        <Select
                          labelId="priority"
                          id="priority"
                          label="Priority"
                          className="textConatiner"
                          fullWidth
                          {...field}
                          value={priority}
                          onChange={(e) => {
                            setPriority(e.target.value);
                            field.onChange(e);
                          }}
                          error={formProps.formState.errors.priority ? true : false}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {props.priorityList?.map((priority: any) => {
                            return (
                              <MenuItem value={priority.id} key={priority.priority}>
                                {priority.priority}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      )}
                    />
                    <FormHelperText>
                      {formProps.formState.errors?.priority?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item md={6} sm={12}>
                  <FormControl fullWidth >
                    <InputLabel id="version">Version</InputLabel>
                    <Controller
                      name="version"
                      control={formProps.control}
                      render={({ field }) => (
                        <Select
                          labelId="version"
                          id="version"
                          label="version"
                          fullWidth
                          className="textConatiner"
                          {...field}
                          value={version}
                          onChange={(e) => {
                            setVersion(e.target.value);
                            field.onChange(e);
                          }}
                          error={formProps.formState.errors?.version ? true : false}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {props.versionList?.map((version: any) => {
                            return (
                              <MenuItem value={version.id} key={version.version}>
                                {version.version}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      )}
                    />
                    <FormHelperText>
                      {formProps.formState.errors?.version?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item md={6} sm={12}>
                  <TextField
                    id="standard-basic"
                    label="New Version"
                    variant="outlined"
                    fullWidth
                    className="newVer"
                    value={newVersion}
                    onChange={(e) => {
                      setNewVersion(e.target.value);
                    }}
                    InputProps={{
                      endAdornment: <IconButton onClick={createNewVersion} >
                        <AddIcon color="primary" />
                      </IconButton>
                    }}
                  />
                </Grid>

                <Grid item md={6} sm={12} >
                  <FormControl fullWidth>
                    <InputLabel id="scope">Scope</InputLabel>
                    <Controller
                      name="scope"
                      control={formProps.control}
                      render={({ field }) => (
                        <Select
                          labelId="scope"
                          id="scope"
                          label="Scope"
                          className="textConatiner"
                          {...field}
                          value={scope}
                          onChange={(e) => {
                            setScope(e.target.value);
                            field.onChange(e);
                          }}
                          error={formProps.formState.errors.scope ? true : false}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {props.scopeList?.map((scope: any) => {
                            return (
                              <MenuItem value={scope.id} key={scope.scope}>
                                {scope.scope}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      )}
                    />
                    <FormHelperText>
                      {formProps.formState.errors?.scope?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item md={6} sm={12}>
                  {props.scopeList
                    ?.filter((item: any) => item.id === scope)[0]
                    ?.scope?.includes("BE") && (
                      <Controller
                        name="beStory"
                        control={formProps.control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="number"
                            id="standard-basic"
                            label="BE Story Points"
                            variant="outlined"
                            fullWidth
                            error={formProps.formState.errors.beStory ? true : false}
                            helperText={formProps.formState.errors?.beStory?.message}
                          />
                        )}
                      />
                    )}

                  {props.scopeList
                    ?.filter((item: any) => item.id === scope)[0]
                    ?.scope?.includes("FE") && (
                      <Controller
                        name="feStory"
                        control={formProps.control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="number"
                            id="standard-basic"
                            label="FE Story Points"
                            variant="outlined"
                            fullWidth
                            error={formProps.formState.errors.feStory ? true : false}
                            helperText={formProps.formState.errors?.feStory?.message}
                          />
                        )}
                      />
                    )}

                  {props.scopeList
                    ?.filter((item: any) => item.id === scope)[0]
                    ?.scope?.includes("QA") && (
                      <Controller
                        name="qaStory"
                        control={formProps.control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="number"
                            id="standard-basic"
                            label="QA Story Points"
                            variant="outlined"
                            fullWidth
                            error={formProps.formState.errors.qaStory ? true : false}
                            helperText={formProps.formState.errors?.qaStory?.message}
                          />
                        )}
                      />
                    )}
                </Grid>

                <Grid  item md={6} sm={12}>
                <Controller
                    name="spill"
                    control={formProps.control}
                    render={({ field }) => (
                         <MultipleSelect label="Resources" error={getResourceError() && !Boolean(selectedResources.length)}  options={resourceList} handleChange={handleChangeResource} />)}
                  />
                </Grid>

                <Grid item md={6} sm={12}>
                  <Controller
                    name="spill"
                    control={formProps.control}
                    render={({ field }) => (
                      <FormControlLabel
                        {...field}
                        className="slipContainer"
                        control={<Switch />}
                        label="Spill"
                      />
                    )}
                  />
                </Grid>

              
                <Grid item md={12} sm={12}>
                 {Boolean(selectedResources.length) && <FormControl
                    sx={{ m: 3 }}
                    component="fieldset"
                    variant="standard"
                    error={getResourceError()}
                  >
                    <FormLabel component="legend">Resources StoryPoints </FormLabel>
                    <Controller
                      name="resources"
                      control={formProps.control}
                      render={({ field }) => {
                        return (
                          <FormGroup>
                            {selectedResources?.map((resource: any) => {
                              return (
                                <FormControlLabel
                                  control={
                                    <>
                                      <Checkbox
                                        checked={
                                          resourceCheck[resource.id]?.checked
                                            ? true
                                            : false
                                        }
                                        onChange={handleChange(resource)}
                                        name={resource.id}
                                      />
                                      <TextField
                                        onChange={handleChangeValue(resource)}
                                        type="number"
                                        label="Story points"
                                        variant="standard"
                                      />
                                    </>
                                  }
                                  label={resource.resource}
                                />
                              );
                            })}
                          </FormGroup>
                        );
                      }}
                    />
                    {getResourceError() && (
                      <FormHelperText>
                        Resource with storypoint required
                      </FormHelperText>
                    )}
                  </FormControl>}
                </Grid>

                <Fab size="small" color="primary" type="submit" className="fabButton">
                  <AddIcon />
                </Fab>
              </Grid>
            </form>
          </Card>
        </NewTicketStyled>
      </Modal>
    </Fragment>
  )

}

export default NewTicket;

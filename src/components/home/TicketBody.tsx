import { useState, Fragment, useEffect } from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

import MultipleSelect from "../multiSelect/multiSelect";

const schema = yup
  .object({
    ticket: yup.string().required(),
    priority: yup.string().required(),
    scope: yup.string().required(),
    beStory: yup.number().nullable(true),
    feStory: yup.number().nullable(true),
    qaStory: yup.number().nullable(true),
    link: yup.string().required(),
  })
  .required();

function NewTicket(props: any) {
  const formProps = useForm({
    resolver: yupResolver(schema),
  });

  const [priority, setPriority] = useState<string>("");
  const [scope, setScope] = useState<string>("");
  const [resourceList, setResourceList] = useState<Array<any>>([]);
  const [selectedResources, setSelectedResources] = useState<Array<any>>([]);

  useEffect(() => {
    if (props.editMode) {
      formProps.setValue("ticket", props.ticket);
      formProps.setValue("priority", props.priority.id);
      setPriority(props.priority.id);
      formProps.setValue("scope", props.scope.id);
      setScope(props.scope.id);
      if (props.be_story) {
        formProps.setValue("beStory", props.be_story);
      }
      if (props.fe_story) {
        formProps.setValue("feStory", props.fe_story);
      }
      if (props.qa_story) {
        formProps.setValue("qaStory", props.qa_story);
      }
      formProps.setValue("link", props.link);
      const newResource = props.ticket_resources.map((ticketResource: any) => {
        const newResource = JSON.parse(JSON.stringify(ticketResource.resource));
        newResource.story = ticketResource.story;
        newResource.value = newResource.resource;
        newResource.ticketResourceId = ticketResource.id;
        return newResource;
      });
      setSelectedResources(newResource);
    }
  }, []);

  useEffect(() => {
    const resource = props.resourceList?.map((reso: any) => ({
      ...reso,
      value: reso?.resource,
    }));
    setResourceList(resource);
  }, [JSON.stringify(props.resourceList)]);

  const handleChangeValue = (resource: any) => (event: any) => {
    setSelectedResources((item: any) => {
      return item.map((res: any) => {
        const data = JSON.parse(JSON.stringify(res));
        if (data.id === resource.id) {
          if (event.target.value) {
            data.story = event.target.value;
          } else {
            data.story = "";
          }
        }
        return data;
      });
    });
  };

  const onSubmit = (e: any) => {
    formProps.handleSubmit((data: any) => {
      formProps.reset();
      e.target.reset();
      if (!selectedResources.length) {
        return;
      }
      const newData: { [x: string]: any } = {
        ticket: {
          ticket: data.ticket,
          sprintId: props.sprintSelected.id,
          scopeId: data.scope,
          versionId: props.sprintSelected.version.id,
          priorityId: data.priority,
          statusId: props.sprintStatusList[0]?.id,
          spill: false,
          beStory: data.beStory ? data.beStory : null,
          feStory: data.feStory ? data.feStory : null,
          qaStory: data.qaStory ? data.qaStory : null,
          beSpill: null,
          feSpill: null,
          qaSpill: null,
          link: data.link,
        },
      };
      if (props.editMode) {
        const updateResource = selectedResources.filter(
          (item: any) => item.ticketResourceId
        );
        const newResource = selectedResources.filter(
          (item: any) => !item.ticketResourceId
        );
        const deleteResource = props.ticket_resources.filter(({ resource }: any) => !selectedResources.some(({ id: id2 }) => resource.id === id2));
        newData.ticket.id = props.id;
        newData.updateResource = updateResource;
        newData.newResource = newResource;
        newData.deleteResource = deleteResource;
        props.send({ type: "updateTicket", prop: newData });
      } else {
        newData.resources = selectedResources;
        props.send({ type: "newTicket", prop: newData });
      }
      props.toggleOpenTicket();
    })(e);
  };

  const getResourceError = () => {
    return false;
  };

  const handleChangeResource = (payload: Array<any>): void => {
    setSelectedResources((items: any) => {
      const results = items.filter(
        ({ id: id1 }: any) => !payload.some(({ id: id2 }) => id2 === id1)
      );
      if (!results.length) {
        return payload.map((item: any) => {
          const data = JSON.parse(JSON.stringify(item));
          if (data.story === undefined) {
            data.story = "";
          }
          if (props.editMode) {
            const filteredTicketResource = props.ticket_resources.filter(
              (ticketResource: any) => {
                if (ticketResource.resource.id === data.id) {
                  return true;
                }
              }
            );
            if (filteredTicketResource.length) {
              data.ticketResourceId = filteredTicketResource[0].id;
              data.story = filteredTicketResource[0].story;
            }
          }
          return data;
        });
      }
      const val = items.filter(
        ({ id: id1 }: any) => !results.some(({ id: id2 }: any) => id2 === id1)
      );
      return val;
    });
  };

  return (
    <Fragment>
      <Card variant="outlined" className="cardContainer">
        <form onSubmit={onSubmit} className="formContainer">
          <Grid container spacing={2}>
            <Grid item md={6} sm={12}>
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
              <FormControl fullWidth>
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

            <Grid item md={6} sm={12}>
              <Controller
                name="link"
                control={formProps.control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="standard-basic"
                    label="Jira Link"
                    variant="outlined"
                    className="textConatiner"
                    fullWidth
                    error={formProps.formState.errors.link ? true : false}
                    helperText={formProps.formState.errors?.link?.message}
                  />
                )}
              />
            </Grid>

            <Grid item md={6} sm={12}>
              <Controller
                name="resources"
                control={formProps.control}
                render={({ field }) => (
                  <MultipleSelect
                    label="Resources"
                    error={
                      getResourceError() && !Boolean(selectedResources.length)
                    }
                    options={resourceList}
                    value={selectedResources}
                    handleChange={handleChangeResource}
                  />
                )}
              />
            </Grid>

            <Grid item md={12} sm={12}>
              {Boolean(selectedResources.length) && (
                <FormControl
                  sx={{ m: 3 }}
                  component="fieldset"
                  variant="standard"
                  error={getResourceError()}
                >
                  <FormLabel component="legend">
                    Resources StoryPoints{" "}
                  </FormLabel>
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
                                    <TextField
                                      onChange={handleChangeValue(resource)}
                                      type="number"
                                      label="Story points"
                                      variant="standard"
                                      value={resource.story}
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
                </FormControl>
              )}
            </Grid>
            <Button type="submit" autoFocus>
              Create
            </Button>
          </Grid>
        </form>
      </Card>
    </Fragment>
  );
}

export default NewTicket;

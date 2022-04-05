import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    version: yup.string().required(),
    sprint: yup.string().required(),
  })
  .required();

function ChangeSprintBody(props: any) {
  const formProps = useForm({
    resolver: yupResolver(schema),
  });

  const [version, setVersion] = useState<string>("");
  const [sprint, setSprint] = useState<string>("");
  useEffect(() => {
    formProps.setValue("version", props.sprintSelected.version.id);
    setVersion(props.sprintSelected.version.id);
    setSprint(props.sprintSelected.id);
    formProps.setValue("sprint", props.sprintSelected.id);
    props.send({ type: "initChangeSprint" });
  }, []);

  const onSubmit = (e: any) => {
    formProps.handleSubmit((data: any) => {
      formProps.reset();
      e.target.reset();
      const val = {
        ticketId: props.id,
        sprintId: data.sprint,
        versionId: data.version,
      };
      props.send({ type: "makeChangeSprint", data: val });
    })(e);
  };

  return (
    <Card variant="outlined" className="cardContainer">
      <form onSubmit={onSubmit} className="formContainer">
        <Grid item md={6} sm={12}>
          <FormControl fullWidth>
            <InputLabel id="version">Version</InputLabel>
            <Controller
              name="version"
              control={formProps.control}
              render={({ field }) => (
                <Select
                  labelId="version"
                  id="version"
                  label="version"
                  className="textConatiner"
                  {...field}
                  value={version}
                  onChange={(e) => {
                    setVersion(e.target.value);
                    field.onChange(e);
                    props.send({
                      type: "sprintChangeVersion",
                      data: e.target.value,
                    });
                  }}
                  error={formProps.formState.errors.version ? true : false}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {props.changeSprintVersionList?.map((version: any) => {
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
          <FormControl fullWidth>
            <InputLabel id="sprint">Sprint</InputLabel>
            <Controller
              name="sprint"
              control={formProps.control}
              render={({ field }) => (
                <Select
                  labelId="sprint"
                  id="sprint"
                  label="sprint"
                  className="textConatiner"
                  {...field}
                  value={sprint}
                  onChange={(e) => {
                    setSprint(e.target.value);
                    field.onChange(e);
                  }}
                  error={formProps.formState.errors.sprint ? true : false}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {props.changeSprintSprintList?.map((sprint: any) => {
                    return (
                      <MenuItem value={sprint.id} key={sprint.sprint}>
                        {sprint.sprint}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            />
            <FormHelperText>
              {formProps.formState.errors?.sprint?.message}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Button type="submit" autoFocus>
          Move
        </Button>
      </form>
    </Card>
  );
}

export default ChangeSprintBody;

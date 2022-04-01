import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { SprintBodyWrapper } from "./sprintBody.style";
const schema = yup
  .object({
    sprint: yup.string().required(),
    country: yup.string().required(),
    version: yup.string().required(),
  })
  .required();

function SprintBody(props: any) {
  const [country, setCountry] = useState<string>("");
  const [version, setVersion] = useState<string>("");

  const formProps = useForm({
    resolver: yupResolver(schema),
  });

  const onCountryChanged = (country: any) => {
    const data = {
      country,
      project: props.projectSelected.id,
    };
    setVersion("");
    formProps.setValue("version", "");
    props.send({ type: "getVersion", data });
  };

  useEffect(() => {
    if (props.editMode) {
      formProps.setValue("sprint", props.sprintSelected.sprint);
      formProps.setValue("country", props.sprintSelected.country.id);
      setCountry(props.sprintSelected.country.id);
      const data = {
        country: props.sprintSelected.country.id,
        project: props.projectSelected.id,
      };
      props.send({ type: "getVersion", data });
    }
  }, []);

  useEffect(() => {
    if (props.editMode && props.versionList.length) {
      const versionN = props.versionList.filter(
        (item: any) => item.id === props.sprintSelected.version.id
      );
      if (versionN.length && formProps.getValues("version") === undefined) {
        setVersion(String(versionN[0].id));
        formProps.setValue("version", String(versionN[0].id));
      }
    }
  }, [JSON.stringify(props.versionList)]);

  const onSubmit = (e: any) => {
    formProps.handleSubmit((data: any) => {
      formProps.reset();
      e.target.reset();
      props.toggleOpenTicket();
      if (props.editMode) {
        const val = JSON.parse(JSON.stringify(data));
        val.sprintId = props.sprintSelected.id;
        props.send({ type: "updateSprint", val });
      } else {
        props.send({ type: "newSprint", data });
      }
    })(e);
  };

  return (
    <SprintBodyWrapper>
      <form onSubmit={onSubmit} className="formContainer">
        <Grid container spacing={2}>
          <Grid item md={6} sm={12}>
            <Controller
              name="sprint"
              control={formProps.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="standard-basic"
                  label="Sprint"
                  variant="outlined"
                  className="textConatiner"
                  fullWidth
                  error={formProps.formState.errors.sprint ? true : false}
                  helperText={formProps.formState.errors?.sprint?.message}
                />
              )}
            />
          </Grid>

          <Grid item md={6} sm={12}>
            <FormControl fullWidth>
              <InputLabel id="country">Country</InputLabel>
              <Controller
                name="country"
                control={formProps.control}
                render={({ field }) => (
                  <Select
                    labelId="country"
                    id="country"
                    label="country"
                    className="textConatiner"
                    fullWidth
                    {...field}
                    value={country}
                    onChange={(e) => {
                      onCountryChanged(e.target.value);
                      setCountry(e.target.value);
                      field.onChange(e);
                    }}
                    error={formProps.formState.errors.country ? true : false}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {props.countryList?.map((country: any) => {
                      return (
                        <MenuItem value={country.id} key={country.country}>
                          {country.country}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
              <FormHelperText>
                {formProps.formState.errors?.country?.message}
              </FormHelperText>
            </FormControl>
          </Grid>

          {props.versionList && (
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
                      fullWidth
                      {...field}
                      value={version}
                      onChange={(e) => {
                        setVersion(e.target.value);
                        field.onChange(e);
                      }}
                      error={formProps.formState.errors.version ? true : false}
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
          )}
        </Grid>
        <Button type="submit" autoFocus>
          Create
        </Button>
      </form>
    </SprintBodyWrapper>
  );
}

export default SprintBody;

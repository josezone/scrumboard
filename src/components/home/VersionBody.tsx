import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { VersionBodyWrapper } from "./versionBody.style";

const schema = yup
  .object({
    country: yup.string().required(),
    version: yup.string().required(),
  })
  .required();

function VersionBody(props: any) {
  const formProps = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (e: any) => {
    formProps.handleSubmit((data: any) => {
      formProps.reset();
      e.target.reset();
      props.toggleOpenVersion();
      props.send({ type: "newVersion", data });
    })(e);
  };

  return (
    <VersionBodyWrapper>
      <form onSubmit={onSubmit} className="formContainer">
        <Grid container spacing={2}>
          <Grid item md={6} sm={12}>
            <Controller
              name="version"
              control={formProps.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="standard-basic"
                  label="Version"
                  variant="outlined"
                  className="textConatiner"
                  fullWidth
                  error={formProps.formState.errors.version ? true : false}
                  helperText={formProps.formState.errors?.version?.message}
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
        </Grid>
        <Button type="submit" autoFocus>
          Create
        </Button>
      </form>
    </VersionBodyWrapper>
  );
}

export default VersionBody;

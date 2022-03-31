import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";

const schema = yup
  .object({
    sprint: yup.string().required(),
    country: yup.string().required(),
    version: yup.string().required(),
  })
  .required();

function SprintBody(props: any) {
  const formProps = useForm({
    resolver: yupResolver(schema),
  });

  const [version, setVersion] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const onSubmit = (e: any) => {
    formProps.handleSubmit((data: any) => {
      formProps.reset();
      e.target.reset();
    });
  };
console.log(props)
  return (
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
      </Grid>
    </form>
  );
}

export default SprintBody;

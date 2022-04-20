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
import VersionCalendar from "./versionCalendar";
import { VersionEntryStyle } from "./versionEntry.style";

const schema = yup
  .object({
    noteType: yup.string().required(),
    noteTypeAction: yup.string().required(),
    dateEntry: yup.string().required(),
    link: yup.string().required(),
    notes: yup.string().required(),
  })
  .required();

function VersionEntry(props: any) {
  const [noteType, setNoteType] = useState<any>(undefined);
  const [noteTypeAction, setNoteTypeAction] = useState<any>("0");

  const formProps = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (e: any) => {
    formProps.handleSubmit((data: any) => {
      formProps.reset();
      e.target.reset();
      console.log(data);
    })(e);
  };

  const getActionType = () => {
    const val = props.versionTypeList.filter(
      (ver: any) => ver.id === noteType
    )[0]?.type;
    return val ? val : "";
  };

  useEffect(() => {
    formProps.setValue("noteTypeAction", false);
  }, []);

  return (
    <VersionEntryStyle>
      <form onSubmit={onSubmit} className="formContainer">
        <Grid container spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="noteType">Type</InputLabel>
              <Controller
                name="noteType"
                control={formProps.control}
                render={({ field }) => (
                  <Select
                    labelId="noteType"
                    id="noteType"
                    label="noteType"
                    className="textConatiner"
                    fullWidth
                    {...field}
                    value={noteType}
                    onChange={(e) => {
                      setNoteType(e.target.value);
                      field.onChange(e);
                    }}
                    error={formProps.formState.errors.noteType ? true : false}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {props.versionTypeList?.map((noteType: any) => {
                      return (
                        <MenuItem value={noteType.id} key={noteType.type}>
                          {noteType.type}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
              <FormHelperText>
                {formProps.formState.errors?.noteType?.message}
              </FormHelperText>
            </FormControl>
          {noteType && (
            <div>
                <FormControl fullWidth>
                  <InputLabel id="noteTypeAction">
                    {getActionType()} action
                  </InputLabel>
                  <Controller
                    name="noteTypeAction"
                    control={formProps.control}
                    render={({ field }) => (
                      <Select
                        labelId="noteTypeAction"
                        id="noteTypeAction"
                        label="noteTypeAction"
                        className="textConatiner"
                        fullWidth
                        {...field}
                        value={noteTypeAction}
                        onChange={(e) => {
                          setNoteTypeAction(e.target.value);
                          field.onChange(e);
                        }}
                        error={
                          formProps.formState.errors.noteTypeAction
                            ? true
                            : false
                        }
                      >
                        <MenuItem value="0">
                          <em>False</em>
                        </MenuItem>
                        <MenuItem value="1">
                          <em>True</em>
                        </MenuItem>
                      </Select>
                    )}
                  />
                  <FormHelperText>
                    {formProps.formState.errors?.noteType?.message}
                  </FormHelperText>
                </FormControl>

              <Controller
                name="dateEntry"
                control={formProps.control}
                render={({ field }) => (
                  <VersionCalendar
                    label={getActionType() + " date"}
                    field={field}
                  />
                )}
              />

                <Controller
                  name="link"
                  control={formProps.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="standard-basic"
                      label="Link"
                      variant="outlined"
                      className="textConatiner"
                      fullWidth
                      error={formProps.formState.errors.link ? true : false}
                      helperText={formProps.formState.errors?.link?.message}
                    />
                  )}
                />

                <Controller
                  name="notes"
                  control={formProps.control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="standard-basic"
                      label="Notes"
                      variant="outlined"
                      className="textConatiner"
                      fullWidth
                      error={formProps.formState.errors.notes ? true : false}
                      helperText={formProps.formState.errors?.notes?.message}
                    />
                  )}
                />
            </div>
          )}
        </Grid>
        <Button type="submit" autoFocus>
          Create
        </Button>
      </form>
    </VersionEntryStyle>
  );
}

export default VersionEntry;

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";

function VersionCalendar(props: any) {
  const [value, setValue] = useState<any>(new Date());

  useEffect(() => {
    props.field.onChange(new Date());
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label={props.label}
          value={value}
          {...props.field}
          onChange={(newValue) => {
            setValue(newValue);
            props.field.onChange(newValue);
          }}
          renderInput={(params) => <TextField style={{width:"12rem"}} {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export default VersionCalendar;

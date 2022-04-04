import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import isWeekend from "date-fns/isWeekend";
import { useEffect, useState } from "react";

function ScrumBody(props: any) {
  const [val, setVal] = useState<any>(undefined);

  useEffect(()=>{setVal(new Date())},[]);

  const handleCreateScrum = () => {
    props.send({ type: "initiateScrumCreate", data:val });
    props.toggleOpenScrum();
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          orientation="landscape"
          openTo="day"
          value={val}
          shouldDisableDate={isWeekend}
          onChange={(newValue: any) => {
            setVal(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button onClick={handleCreateScrum}>Create</Button>
    </>
  );
}

export default ScrumBody;

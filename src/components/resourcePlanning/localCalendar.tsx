import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import TextField from "@mui/material/TextField";
import isWeekend from "date-fns/isWeekend";
import { Button } from '@mui/material';

function LocalCalendar(props: any) {
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                    orientation="landscape"
                    openTo="day"
                    value={props.leaveDate}
                    shouldDisableDate={isWeekend}
                    onChange={props.addPlannedLeave(props.modalProps, props.resource)}
                    renderInput={(params) => <TextField {...params} />}
                    minDate={props.minDate}
                    maxDate={props.maxDate}
                    showToolbar={false}
                    allowSameDateSelection={true}
                />
            </LocalizationProvider>
            <Button variant="outlined" onClick={props.closePlannedLeavePopup}>Cancel</Button>
        </>
    )
}

export default LocalCalendar;
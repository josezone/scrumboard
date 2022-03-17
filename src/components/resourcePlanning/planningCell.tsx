import { Button } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ModalComponent from '../modal/modal';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import TextField from "@mui/material/TextField";
import isWeekend from "date-fns/isWeekend";
import { initPlannedLeaveData } from '../../constants/constants';


function ModalChild(props: any) {
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
                />
            </LocalizationProvider>
            <Button variant="outlined" onClick={props.closePlannedLeavePopup}>Cancel</Button>
        </>
    )
}

function PlanningCell(props: any) {
    const openPlannedLeavePopup = (resource: any) => () => {
        props.send({ type: "planLeave", data: resource })
    }

    const closePlannedLeavePopup = () => {
        props.send({ type: "onPlanedLeavePopupDisable" })
    }

    const addPlannedLeave = (project: any, resource: any) => (newValue: any) => {
        props.send({
            type: "addDataToPlannedLeave",
            data: {
                leaveDate: newValue,
                resource: resource.id,
                scrumId: props.scrumSelected.id,
                projectId: project
            }
        });
    }
    const projectmodal: any = { data: props.project, enableProps: true }

    return (
        <TableRow>
            <TableCell className='cells'>
                {props.resource.resource && <div>
                    <Button variant="outlined" onClick={openPlannedLeavePopup(props.resource.resource)}>Add Planed Leave</Button>
                    <ModalComponent
                        open={props.assignPlanedLeavePopup[props.resource.resource]}
                        handleClose={closePlannedLeavePopup}
                        title="PlannedLeave"
                        componentsProps={projectmodal}
                    >
                        <ModalChild resource={props.resource}
                            addPlannedLeave={addPlannedLeave}
                            closePlannedLeavePopup={closePlannedLeavePopup}
                            leaveDate={props.plannedLeaveData?.leaveDate}
                            minDate={initPlannedLeaveData.leaveDate}
                            maxDate={Date.now() + (45 * 24 * 60 * 60 * 1000)} />
                    </ModalComponent>
                </div>}
            </TableCell>
        </TableRow>
    )
}

export default PlanningCell;
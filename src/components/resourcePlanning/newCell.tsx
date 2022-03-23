import { Button } from '@mui/material';
import ModalComponent from '../modal/modal';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { PlaningCellStyle } from './planniingCell.style';
import LocalCalendar from './localCalendar';


function NewCell(props: any) {
    const openEmergencyLeavePopup = (resource: any) => () => {
        props.send({ type: "emergencyLeave", data: resource });
    }

    const closeEmergencyLeavePopup = () => {
        props.send({ type: "onUnplanedLeavePopupDisable" });
    }

    const addEmergencyLeave = (project: any, resource: any) => (newValue: any) => {
        props.send({
            type: "addDataToUnplannedLeave",
            data: {
                leaveDate: newValue,
                resource: resource.id,
                scrumId: props.scrumSelected.id,
                projectId: project.id
            }
        });
    }

    const halfDayClicked = (planId: number, currentHalfDayVal: boolean) => () => {
        props.send({ type: "emergencyHalfLeave", data: { planId, val: !currentHalfDayVal } });
    }


    const projectmodal: any = { data: props.project, enableProps: true }
    const resourcePlan = props.resourcePlan?.filter((plan: any) => plan.resource.id === props.resource.id);
    return (
        <PlaningCellStyle>
            <div className="container">
                <div className='sectionBegin'>
                    {props.resource.resource && <div>
                        <Button variant="outlined" onClick={openEmergencyLeavePopup(props.resource.resource)}>Add Unplaned Leave</Button>
                        <ModalComponent
                            open={props.assignUnplanedLeavePopup && props.assignUnplanedLeavePopup[props.resource.resource]}
                            handleClose={closeEmergencyLeavePopup}
                            title="PlannedLeave"
                            componentsProps={projectmodal}
                        >
                            <LocalCalendar resource={props.resource}
                                addPlannedLeave={addEmergencyLeave}
                                closePlannedLeavePopup={closeEmergencyLeavePopup}
                                leaveDate={props.plannedLeaveData?.leaveDate} />
                        </ModalComponent>
                    </div>}
                </div>
                {resourcePlan?.filter((plan: any) => plan.unplanned_leave).map((plan: any) => (
                    <div className='sectionNext'>
                        <div className="plannedDate">
                            {plan.unplanned_leave}
                        </div>
                        <div>
                            <FormControlLabel control={<Checkbox checked={plan.unplanned_half_day} onChange={halfDayClicked(plan.id, plan.unplanned_half_day)} />} label="Half Day" />
                        </div>
                    </div>
                ))}
            </div>
        </PlaningCellStyle>
    )
}

export default NewCell;
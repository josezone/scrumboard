import { Button } from '@mui/material';
import ModalComponent from '../modal/modal';
import { initPlannedLeaveData } from '../../constants/constants';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { PlaningCellStyle } from './planniingCell.style';
import LocalCalendar from './localCalendar';

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
                projectId: project.id
            }
        });
    }

    const halfDayClicked = (planId: number, currentHalfDayVal: boolean) => () => {
        props.send({ type: "planHalfLeave", data: { planId, val: !currentHalfDayVal } });
    }

    const leaveTakenClicked = (planId: number, currentLeaveTakenVal: boolean) => () => {
        props.send({ type: "leaveTaken", data: { planId, val: !currentLeaveTakenVal } });
    }

    const projectmodal: any = { data: props.project, enableProps: true }
    const resourcePlan = props.resourcePlan?.filter((plan: any) => plan.resource.id === props.resource.id);
    return (
        <PlaningCellStyle>
            <div className="container">
                <div className='sectionBegin'>
                    {props.resource.resource && <div>
                        <Button variant="outlined" onClick={openPlannedLeavePopup(props.resource.resource)}>Add Planed Leave</Button>
                        <ModalComponent
                            open={props.assignPlanedLeavePopup[props.resource.resource]}
                            handleClose={closePlannedLeavePopup}
                            title="PlannedLeave"
                            componentsProps={projectmodal}
                        >
                            <LocalCalendar resource={props.resource}
                                addPlannedLeave={addPlannedLeave}
                                closePlannedLeavePopup={closePlannedLeavePopup}
                                leaveDate={props.plannedLeaveData?.leaveDate}
                                minDate={initPlannedLeaveData.leaveDate}
                                maxDate={Date.now() + (45 * 24 * 60 * 60 * 1000)} />
                        </ModalComponent>
                    </div>}
                </div>
                {resourcePlan?.filter((plan: any) => plan.planned_leave).map((plan: any) => (
                    <div className='sectionNext'>
                        <div className="plannedDate">
                            {plan.planned_leave}
                        </div>
                        <div>
                            <FormControlLabel control={<Checkbox checked={plan.planned_half_day} onChange={halfDayClicked(plan.id, plan.planned_half_day)} />} label="Half Day" />
                        </div>
                        <div>
                            <FormControlLabel control={<Checkbox checked={plan.leave_taken} onChange={leaveTakenClicked(plan.id, plan.leave_taken)} />} label="Leave Taken" />
                        </div>
                    </div>
                ))}
            </div>
        </PlaningCellStyle>
    )
}

export default PlanningCell;
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DragDropContext } from "react-beautiful-dnd";
import ResourcePlanDrag from './resourcePlanDrag';

function getDate(scrum: string) {
    return new Date(scrum).toLocaleString("default", {
        month: "long",
    }) +
        " " +
        new Date(scrum).getDate();
}

function ResourcePlanningTable(props: any) {
    function onDragEnd(result: any) {
        const { source, destination, draggableId } = result;
        if (!destination) {
            return;
        }
        const sInd = source.droppableId;
        const dInd = destination.droppableId;
        if (sInd !== dInd) {
            const data = { moveItem: draggableId, moveFrom: sInd, moveTo: dInd };
            props.send({ type: "onDragEnd", data })
        }
    }

    const handleProjectGroupChange = (event: any) => {
        const defaultProjectGroup = props.projectGroupList.filter((project: any) => project.id === event.target.value)[0];
        props.send({ type: "changeProjectGroup", data: defaultProjectGroup });
    };

    const handleChange = (event: any) => {
        const selectedScrum = props.scrumList.filter((scrum: any) => scrum.id === event.target.value)[0];
        props.send({ type: "changeScrum", data: selectedScrum });
    };

    const projectList = [...props.projectList, { id: null, project: "Unassigned" }];
    return (
        <>
            {props.projectGroup && <Select
                value={props.projectGroup.id}
                label="Project Group"
                onChange={handleProjectGroupChange}
            >
                {props.projectGroupList.map((projectGroup: any) => <MenuItem key={projectGroup.name} value={projectGroup.id}>{projectGroup.name}</MenuItem>)}
            </Select>}
            {props.scrumSelected && <Select
                value={props.scrumSelected.id}
                label="Scrum"
                onChange={handleChange}
            >
                {props.scrumList.map((scrum: any) => <MenuItem key={scrum.scrum} value={scrum.id}>{getDate(scrum.scrum)}</MenuItem>)}
            </Select>}
            <DragDropContext onDragEnd={onDragEnd}>
                {projectList.map((project: any) =>
                    <>
                        <h2>{project.project}</h2>
                        {props.resourceList && <ResourcePlanDrag {...props} project={project} />}
                    </>
                )}
            </DragDropContext>
        </>
    );
}

export default ResourcePlanningTable;
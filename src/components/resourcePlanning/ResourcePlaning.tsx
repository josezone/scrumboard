import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ResourcePlaningDragStyle } from './resourcePlaning.style';

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

    function daragableSection(project: any) {
        let scrumResourceProject = props.resourceList.filter((resource: any) => {
            if (props.scrumResourceProject?.find((o: any) => o.project.id === project.id && o.resource.id === resource.id)) {
                return true;
            }
            if (!props.scrumResourceProject?.find((o: any) => o.resource.id === resource.id)) {
                if (project.id === null) {
                    return true;
                }
            }
        })
        if (!scrumResourceProject.length) {
            scrumResourceProject = [{ id: "0", resource: "", resource_type: { resource_type: "" } }]
        }

        return (
            <ResourcePlaningDragStyle>
                <Droppable key={project.project} droppableId={project.project}>
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="droppables"
                        >
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    {scrumResourceProject?.map((resource: any, index: number) => (
                                        <TableBody>
                                            <TableRow>
                                                <Draggable key={resource.resource} draggableId={resource.resource} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="draggables"
                                                        >
                                                            <TableCell className='cells'>{resource.resource}</TableCell>
                                                            <TableCell className='cells'>{resource.resource_type.resource_type}</TableCell>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            </TableRow>
                                        </TableBody>
                                    ))}
                                    {provided.placeholder}
                                </Table>
                            </TableContainer>
                        </div>
                    )}
                </Droppable>
            </ResourcePlaningDragStyle>
        );
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
                        {props.resourceList && daragableSection(project)}
                    </>
                )}
            </DragDropContext>
        </>
    );
}

export default ResourcePlanningTable;
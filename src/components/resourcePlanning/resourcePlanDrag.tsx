import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Draggable, Droppable } from "react-beautiful-dnd";
import ResourceTable from './resourceTable';

function ResourcePlanDrag(props: any) {
    let scrumResourceProject = props.resourceList.filter((resource: any) => {
        if (props.scrumResourceProject?.find((o: any) => o.project.id === props.project.id && o.resource.id === resource.id)) {
            return true;
        }
        if (!props.scrumResourceProject?.find((o: any) => o.resource.id === resource.id)) {
            if (props.project.id === null) {
                return true;
            }
        }
    })
    if (!scrumResourceProject.length) {
        scrumResourceProject = [{ id: "0", resource: "", resource_type: { resource_type: "" } }]
    }

    return (
        <Droppable key={props.project.project} droppableId={props.project.project}>
            {(provided, snapshot) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="droppables"
                >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            {scrumResourceProject?.map((resource: any, index: number) => (
                                <TableBody key={resource.resource + index}>
                                    <TableRow>
                                        <Draggable key={resource.resource} draggableId={resource.resource} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="draggables"
                                                >
                                                    <ResourceTable {...props} resource={resource} />
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
    );
}
export default ResourcePlanDrag;
import TableCell from '@mui/material/TableCell';
import NewCell from './newCell';
import PlanningCell from './planningCell';
import { ResourcePlaningDragStyle } from './resourcePlaning.style';
import TableStoryPoint from './tableStoryPoint';

function ResourceTable(props: any) {
    const scrumResourceProjectData = props.scrumResourceProject?.filter((data: any) => data.resource.id === props.resource.id && data.project.id === props.project.id);
    return (
        <ResourcePlaningDragStyle>
            <TableCell className='cells1'>{props.resource.resource}</TableCell>
            <TableCell className='cells1'>{props.resource.resource_type.resource_type}</TableCell>
            <TableCell className='cells2'>
                <TableStoryPoint {...props} scrumResourceProjectData={scrumResourceProjectData}/>
            </TableCell>
            <TableCell className='cells'>
                <PlanningCell {...props} />
            </TableCell>
            <TableCell className='cells'>
                <NewCell {...props} />
            </TableCell>
        </ResourcePlaningDragStyle>
    )
}

export default ResourceTable
import TableCell from '@mui/material/TableCell';
import PlanningCell from './planningCell';
import { ResourcePlaningDragStyle } from './resourcePlaning.style';

function ResourceTable(props: any) {
    return (
        <ResourcePlaningDragStyle>
            <TableCell className='cells'>{props.resource.resource}</TableCell>
            <TableCell className='cells'>{props.resource.resource_type.resource_type}</TableCell>
            <TableCell className='cells'>
                <PlanningCell {...props} />
            </TableCell>
        </ResourcePlaningDragStyle>
    )
}

export default ResourceTable
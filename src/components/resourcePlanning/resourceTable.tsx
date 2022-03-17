import TableCell from '@mui/material/TableCell';
import PlanningCell from './planningCell';

function ResourceTable(props: any) {
    return (
        <>
            <TableCell className='cells'>{props.resource.resource}</TableCell>
            <TableCell className='cells'>{props.resource.resource_type.resource_type}</TableCell>
            <TableCell className='cells'>
                <PlanningCell {...props} />
            </TableCell></>
    )
}

export default ResourceTable
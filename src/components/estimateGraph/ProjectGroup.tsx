import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function ProjectGroup(props: any) {

    const handleChange = (event: any) => {
        props.send({ type: "changeProjectGroup", data: event.target.value });
    };

    return (
        <>
            {props.selectedProjectGroup && <Select
                value={props.selectedProjectGroup.id}
                onChange={handleChange}
            >
                {props.projectGroupList.map((projectGroup: any) => {
                    return <MenuItem value={projectGroup.id} key={projectGroup.name}>{projectGroup.name}</MenuItem>
                })}
            </Select>}
        </>
    )
}

export default ProjectGroup;
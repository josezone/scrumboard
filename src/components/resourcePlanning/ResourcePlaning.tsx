import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';

function getDate(scrum: string) {
    return new Date(scrum).toLocaleString("default", {
        month: "long",
    }) +
        " " +
        new Date(scrum).getDate();
}

function ResourcePlanningTable(props: any) {
    const handleProjectGroupChange = (event: any) => {
        const defaultProjectGroup = props.projectGroupList.filter((project: any) => project.id === event.target.value)[0];
        props.send({ type: "changeProjectGroup", data: defaultProjectGroup });
    };

    const handleChange = (event: any) => {
        const selectedScrum = props.scrumList.filter((scrum: any) => scrum.id === event.target.value)[0];
        props.send({ type: "changeScrum", data: selectedScrum });
    };

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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Resource Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {props.resourceList && props.resourceList.map((resource: any) => {
                                return (
                                    <>
                                        <TableCell>{resource.resource}</TableCell>
                                        <TableCell>{resource.resource_type.resource_type}</TableCell>
                                    </>
                                );
                            })}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default ResourcePlanningTable;
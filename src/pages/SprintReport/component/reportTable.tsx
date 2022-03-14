import { FC, Fragment } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface IReportTable {
    reportList: any
}


const ReportTable: FC<IReportTable> = (props) => {
    const { reportList } = props;


    const getProjectSpan = (sprints: Array<any>): number => {
        return sprints.reduce((length, data) => length + data.tickets.length + 1, 0) + 1;
    }

    const getDevStoryPoint = ({ fe_story = 0, be_story = 0 }) => {
        return fe_story + be_story
    }

    const getBugs = (bugs: Array<any>) => {
        return(
           <>
            {bugs?.map((bug) => (
                <div>
                    <div>
                        <span>
                            {new Date(bug.date).getDate().toString().padStart(2, "0") + "/" + (new Date(bug.date).getMonth()+ 1).toString().padStart(2, "0") + " - "}
                        </span>
                         {bug.bug}
                    </div>
                    
                </div>
            ))}
           </>
        )
    }

    const getImapact = (bugs: Array<any>) => {
        const issues = bugs.find(bug => bug.report === true)
        if(issues)return "Spilled over"
        return "Delivered on time"
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Project</TableCell>
                        <TableCell >Sprint</TableCell>
                        <TableCell>Ticket</TableCell>
                        <TableCell  align="right">Story Points (DEV)</TableCell>
                        <TableCell  align="right">Story Points (QA)</TableCell>
                        <TableCell>Issue History</TableCell>
                        <TableCell>Issue Impact</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(reportList).map((key) => {
                        const sprints: Array<any> = reportList[key] || [];
                        return (
                            <Fragment key={key} >
                                <TableRow>
                                    <TableCell rowSpan={getProjectSpan(sprints)} >{key}</TableCell>
                                </TableRow>
                                {sprints.map((sprint, i) => {
                                    const tickets: Array<any> = sprint.tickets || []
                                    return (
                                        <Fragment key={i} >
                                            <TableRow>
                                                <TableCell rowSpan={tickets.length + 1} >{sprint.sprint}</TableCell>
                                            </TableRow>
                                            {tickets.map((ticket, i) => (
                                                    <TableRow key={i} >
                                                        <TableCell >{ticket.ticket}</TableCell>
                                                        <TableCell align="right" >{getDevStoryPoint(ticket) || "-"}</TableCell>
                                                        <TableCell  align="right">{ticket.qa_story || "-"}</TableCell>
                                                        <TableCell >{getBugs(ticket.bugs)}</TableCell>
                                                        <TableCell >{getImapact(ticket.bugs)}</TableCell>
                                                    </TableRow>
                                                ))}
                                        </Fragment>
                                    )
                                })}
                            </Fragment>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ReportTable;
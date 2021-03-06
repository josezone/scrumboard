import { FC, Fragment } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { formatDate } from "../../../utils/utils";
interface IReportTable {
  reportList: any;
  scrum: any;
}

const ReportTable: FC<IReportTable> = (props) => {
  const { reportList, scrum } = props;
  const getDateofTicket = (date: any) => {
    const ticketDate = new Date(date);
    const scrumDate = new Date(scrum);
    const dateVal =
      ticketDate > scrumDate ? formatDate(ticketDate) : formatDate(scrumDate);
    return dateVal;
  };
  const getProjectSpan = (sprints: Array<any>): number => {
    return (
      sprints.reduce((length, data) => length + data.tickets.length + 1, 0) + 1
    );
  };

  const getDevStoryPoint = ({ fe_story = 0, be_story = 0 }) => {
    return fe_story + be_story;
  };

  const getBugs = (bugs: Array<any>) => {
    return (
      <>
        {bugs?.map((bug) => (
          <div>
            <div>
              <span>
                {new Date(bug.date).getDate().toString().padStart(2, "0") +
                  "/" +
                  (new Date(bug.date).getMonth() + 1)
                    .toString()
                    .padStart(2, "0") +
                  " - "}
              </span>
              {bug.bug}
            </div>
          </div>
        ))}
      </>
    );
  };

  const getImapact = (ticket: any) => {
    const { status, bugs } = ticket;
    const spilled = bugs.find((bug: any) => bug.spilled === true);
    if (status.status === "Done") {
      return "Delivered on time";
    } else if (spilled) return "Spilled over";
    else return null;
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Project</TableCell>
            <TableCell>Sprint</TableCell>
            <TableCell>Ticket</TableCell>
            <TableCell align="right">Story Points (DEV)</TableCell>
            <TableCell align="right">Story Points (QA)</TableCell>
            <TableCell>Issue History</TableCell>
            <TableCell>Issue Impact</TableCell>
            <TableCell>Start Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(reportList).map((key) => {
            const sprints: Array<any> = reportList[key] || [];
            return (
              <Fragment key={key}>
                <TableRow>
                  <TableCell rowSpan={getProjectSpan(sprints)}>{key}</TableCell>
                </TableRow>
                {sprints.map((sprint, i) => {
                  const tickets: Array<any> = sprint.tickets || [];
                  return (
                    <Fragment key={i}>
                      <TableRow>
                        <TableCell rowSpan={tickets.length + 1}>
                          {sprint.sprint}
                        </TableCell>
                      </TableRow>
                      {tickets.map((ticket, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <a
                              href={ticket.link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {ticket.ticket}
                            </a>
                          </TableCell>
                          <TableCell align="right">
                            {getDevStoryPoint(ticket) || "-"}
                          </TableCell>
                          <TableCell align="right">
                            {ticket.qa_story || "-"}
                          </TableCell>
                          <TableCell>{getBugs(ticket.bugs)}</TableCell>
                          <TableCell>{getImapact(ticket) || "-"}</TableCell>
                          <TableCell>
                            {getDateofTicket(ticket.activated_date)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </Fragment>
                  );
                })}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportTable;

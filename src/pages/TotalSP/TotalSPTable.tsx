import { Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { SPTableWrapper } from "./totalSPTable.style";
import groupArray from "group-array";

function TotalSPTable(props: any) {
  const { ticketList } = props;

  const tickets: Record<any, any> =
    ticketList && groupArray(ticketList, "sprint.project.project");
  const projects = tickets && Object.keys(tickets);

  const getSPList = (el: any) => {
    let spObj: Record<any, any> = {};
    let ticketsArr = tickets[el];
    spObj["project"] = el;
    const fe = ticketsArr.reduce((acc: any, curr: any) => {
      return acc + (curr?.fe_story || 0);
    }, 0);
    const be = ticketsArr.reduce((acc: any, curr: any) => {
      return acc + (curr?.be_story || 0);
    }, 0);
    const qa = ticketsArr.reduce((acc: any, curr: any) => {
      return acc + (curr?.qa_story || 0);
    }, 0);
    let total = fe + be + qa || 0;
    spObj["fe"] = fe;
    spObj["be"] = be;
    spObj["qa"] = qa;
    spObj["total"] = total;
    return spObj;
  };

  const spList = projects.map((el: string) => {
    return getSPList(el);
  });

  return (
    <SPTableWrapper>
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Project</TableCell>
                <TableCell>FE SPs</TableCell>
                <TableCell>BE SPs</TableCell>
                <TableCell>QA SPs</TableCell>
                <TableCell>TOTAL SPs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {spList.length > 0 ? (
                spList.map((obj) => (
                  <TableRow
                    key={obj.project}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" className="project">
                      {obj.project}
                    </TableCell>
                    <TableCell> {obj.fe}</TableCell>
                    <TableCell>{obj.be}</TableCell>
                    <TableCell>{obj.qa}</TableCell>
                    <TableCell>{obj.total}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="project">
                    -
                  </TableCell>
                  <TableCell> -</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </SPTableWrapper>
  );
}

export default TotalSPTable;

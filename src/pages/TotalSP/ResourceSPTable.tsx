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

function ResourceSPTable(props: any) {
  const { resourcePlanningList } = props;

  const resourcePlanning: Record<any, any> =
    resourcePlanningList && groupArray(resourcePlanningList, "project.project");
  const projects = resourcePlanning && Object.keys(resourcePlanning);
  const getSPList = (el: any) => {
    let spObj: Record<any, any> = {};
    let resourcePlanningArr = resourcePlanning[el];
    spObj["project"] = el;
    spObj = resourcePlanningArr.reduce(
      (acc: any, curr: any) => {
        switch (curr?.resource?.resource_type.resource_type) {
          case "FE":
            return { ...acc, fe: acc.fe + curr.story };
          case "BE":
            return { ...acc, be: acc.be + curr.story };
          case "QA":
            return { ...acc, qa: acc.qa + curr.story };
          default:
            return acc;
        }
      },
      { fe: 0, be: 0, qa: 0 }
    );
    return {
      fe: spObj.fe,
      be: spObj.be,
      qa: spObj.qa,
      project: el,
      total: spObj.fe + spObj.be + spObj.qa,
    };
  };

  const spList = projects.map((el: string) => {
    return getSPList(el);
  });
  return (
    <SPTableWrapper>
      <Container>
        <h1>Resource SP</h1>
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

export default ResourceSPTable;

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FC } from 'react';
import { Checkbox, IconButton } from '@mui/material';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface IBugTable{
    contents: Array<any>,
    // reportOnChange: (payload: any)  => (e: any) => void,
    // onDelete: (payload: any) => (e: any) => void
}

const ResourceTable: FC<IBugTable> = (props) => {
  const { contents } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sl no</TableCell>
            <TableCell>Name</TableCell>
            {/* <TableCell>Reporter</TableCell>
            <TableCell>Bug</TableCell>
            <TableCell>Impact</TableCell>
            <TableCell>Reported Status</TableCell>
            <TableCell>Spilled</TableCell>
            <TableCell>BE Spill</TableCell>
            <TableCell>FE Spill</TableCell>
            <TableCell>QA Spill</TableCell>
            <TableCell>Action</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {contents.map((resource, index) => (
            <TableRow
              key={resource.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              {/* <TableCell >
              {new Date(resource.name).toLocaleString("default", { month: "long",}) + " " + new Date(bug.date).getDate()}
              </TableCell> */}
              <TableCell >{resource.resource || "-"}</TableCell>
              {/* <TableCell >{bug.bug}</TableCell>
              <TableCell >{bug.impact}</TableCell>
              <TableCell ><Checkbox defaultChecked={bug.report} onChange={reportOnChange(bug)} /></TableCell>
              <TableCell ><Checkbox disabled defaultChecked={bug.spilled}/></TableCell>
              <TableCell align='right' >{bug.be_spill || "-"}</TableCell>
              <TableCell align='right' >{bug.fe_spill || "-"}</TableCell>
              <TableCell align='right' >{bug.qa_spill || "-"}</TableCell>
              <TableCell ><IconButton onClick={onDelete(bug)} ><DeleteForeverIcon /></IconButton></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResourceTable;
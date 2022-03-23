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
    onDelete: (payload: any) => (e: any) => void
}

const BugEstimateTable: FC<IBugTable> = (props) => {
  const { contents, onDelete } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sl no</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Reporter</TableCell>
            <TableCell>Bug</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contents.map((bug, index) => (
            <TableRow
              key={bug.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell >
              {new Date(bug.date).toLocaleString("default", { month: "long",}) + " " + new Date(bug.date).getDate()}
              </TableCell>
              <TableCell >{bug.resource?.resource || "-"}</TableCell>
              <TableCell >{bug.estimate_bug}</TableCell>
              <TableCell ><IconButton onClick={onDelete(bug)} ><DeleteForeverIcon /></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BugEstimateTable;

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FC } from "react";
import Switch from "@mui/material/Switch";

interface IResourceTable {
  contents: Array<any>;
  send: any;
}

const ResourceTable: FC<IResourceTable> = (props) => {
  const { contents, send } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sl no</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Dept</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contents.map((resource, index) => (
            <TableRow
              key={resource.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{resource.resource || "-"}</TableCell>
              <TableCell>
                {resource.resource_type?.resource_type || "-"}
              </TableCell>
              <TableCell>
                <Switch
                  defaultChecked={resource?.status}
                  onChange={() => {
                    send({
                      type: "changeResourceStatus",
                      data: {
                        resourceId: resource.id,
                        status: !resource?.status,
                      },
                    });
                  }}
                />
                {resource.status ? "available" : "not available"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResourceTable;

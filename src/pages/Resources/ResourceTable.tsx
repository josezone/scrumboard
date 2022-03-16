import { FC, useState, Fragment } from "react";

import { EditIconWrapper } from "./resourceTable.style";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";

import AddResource from "./AddResource";

interface IResourceTable {
  contents: Array<any>;
  send: any;
  context: any;
}

const ResourceTable: FC<IResourceTable> = (props) => {
  const { contents, send } = props;
  const [resourceId, setResourceId] = useState<number>();

  const handleResourceEdit = (id: number): void => {
    setResourceId(id);
    props.send({ type: "updateResource" });
  };
  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl no</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Dept</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
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
                    checked={resource?.status}
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
                <TableCell>
                  <EditIconWrapper>
                    <EditIcon
                      color="primary"
                      onClick={(): void => {
                        handleResourceEdit(resource.id);
                      }}
                    ></EditIcon>
                  </EditIconWrapper>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddResource {...props} editMode={true} resourceId={resourceId} />
    </Fragment>
  );
};

export default ResourceTable;

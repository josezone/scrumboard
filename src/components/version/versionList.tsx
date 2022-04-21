import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "version_notes_type",
    headerName: "Type",
    width: 150,
    valueGetter: (params: any) => params.row.version_notes_type.type,
  },
  {
    field: "action_date",
    headerName: "Action Date",
    width: 150,
    valueGetter: (params: any) => params.row.action_date.substring(0, 10),
  },
  { field: "action_done", headerName: "Action Done", width: 150 },
  { field: "link", headerName: "Link", width: 150 },
  { field: "notes", headerName: "Notes", width: 250 },
];

const columns2 = [
  {
    field: "ticket",
    headerName: "Ticket",
    width: 150,
    renderCell: (params: any) => (
      <a href={params.row.link} target="_blank">
        {params.row.ticket}
      </a>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    valueGetter: (params: any) => params.row.status.status,
  },
];

function VersionList(props: any) {
  console.log(props);
  return (
    <>
      <Paper elevation={3}>
        {props.versionNotes?.length && (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={props.versionNotes}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        )}
        {props.versionTickets?.length && (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={props.versionTickets}
              columns={columns2}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        )}
      </Paper>
    </>
  );
}

export default VersionList;

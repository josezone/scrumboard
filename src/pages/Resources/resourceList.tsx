import { Container } from "@mui/material";
import ResourceTable from "./ResourceTable";
import AddResources from "./AddResource";

function ResourceList(props: any) {
  return (
    <Container>
        <AddResources {...props}></AddResources>
      <ResourceTable {...props}></ResourceTable>
    </Container>
  );
}

export default ResourceList;

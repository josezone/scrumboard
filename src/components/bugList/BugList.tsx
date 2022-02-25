import { BugListStyle } from "./bugList.style";
import BugTable from "./bugListTable";
import { Container } from "@mui/material";
import AddBug from "./addBug";


function BugList(props: any) {

  const reportChanged = (bug: any) => (event: any) => {
    props.send({
      type: "changeReport",
      data: { bug: bug.id, report: event.target.checked },
    });
  };

  const deleteClicked = (bug: any) => (event: any) => {
    props.send({ type: "removeBug", data: bug.id });
  };

  const handleFormSubmit = (data: any) => {
      props.send({ type: "createBug", data });
  }

  return (
    <BugListStyle>
      <Container>
        <h2>Ticket#:&nbsp;{props?.ticketInfo?.ticket}</h2>
        <AddBug resourceList={props?.resourceList || []} onSubmit={handleFormSubmit} send={props.send} modalVisible={Boolean(props?.newBugModal)} />
        <BugTable contents={props?.bugList || []} reportOnChange={reportChanged} onDelete={deleteClicked}  />
      </Container>
    </BugListStyle>
  );
}

export default BugList;

import { BugListStyle } from "./bugList.style";
import BugTable from "./bugListTable";
import { Container } from "@mui/material";
import AddBug from "./addBug";
import AddEstimateBug from "./addEstimateBug";
import BugEstimateTable from "./bugEstimateTable";

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
  };

  const handleAddToSPRChanged = (bug: any) => (event: any) => {
    props.send({
      type: "changeAddtoSPR",
      data: { bug: bug.id, report: event.target.checked },
    });
  };

  return (
    <BugListStyle>
      <Container>
        <h2>Ticket#:&nbsp;{props?.ticketInfo?.ticket}</h2>
        {props.bugType === null && (
          <>
            <AddBug
              resourceList={props?.resourceList || []}
              onSubmit={handleFormSubmit}
              send={props.send}
              modalVisible={Boolean(props?.newBugModal)}
            />
            <BugTable
              contents={props?.bugList || []}
              reportOnChange={reportChanged}
              onDelete={deleteClicked}
              addToSPROnChange={handleAddToSPRChanged}
            />
          </>
        )}
        {props.bugType === "estimate" && (
          <>
            <AddEstimateBug
              resourceList={props?.resourceList || []}
              onSubmit={handleFormSubmit}
              send={props.send}
              modalVisible={Boolean(props?.newBugModal)}
            />
            <BugEstimateTable
              contents={props?.bugList || []}
              onDelete={deleteClicked}
            />
          </>
        )}
      </Container>
    </BugListStyle>
  );
}

export default BugList;

import { useMachine } from "@xstate/react";

import { totalSPMachine } from "./totalSPMachine";
import { actions } from "./stateActions";
import { useGetScrumList, useGetTicketList } from "./dataService";
import { Fragment } from "react";

import AppBar from "../../components/appBar/AppBar";
import Box from "@mui/material/Box";
import ItemSelect from "../../components/itemSelect/ItemSelect";
import TotalSPTable from "./TotalSPTable";

type scrumItem = { key: number; value: number; label: number };

function TotalSP(props: any) {
  const { mutateAsync: invokeGetScrumList } = useGetScrumList(
    props.graphQLClient
  );

  const { mutateAsync: invokeGetTicketList } = useGetTicketList(
    props.graphQLClient
  );

  const [state, send] = useMachine(totalSPMachine, {
    actions,
    services: {
      invokeGetScrumList: (context: any) => invokeGetScrumList(context.year),
      invokeGetTicketList: (context: any) =>
        invokeGetTicketList(context.selectedScrum),
    },
  });

  const scrumItems: Array<scrumItem> = state.context?.scrumList?.map(
    (scrum: any) => {
      const date =
        new Date(scrum.scrum).toLocaleString("default", {
          month: "long",
        }) +
        " " +
        new Date(scrum.scrum).getDate();
      return {
        key: scrum?.id,
        value: scrum?.id,
        label: date,
      };
    }
  );

  const onScrumChange = (event: any) => {
    send({ type: "scrumChanged", data: event.target.value });
  };
  return (
    <Fragment>
      <AppBar>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <ItemSelect
            items={scrumItems}
            defaultItem={state.context.selectedScrum}
            onChange={onScrumChange}
            name="Scrum"
            id="selectScrumNative"
            showList={
              state.context?.selectedScrum &&
              state.context?.scrumList &&
              state.context?.scrumList.length &&
              true
            }
          ></ItemSelect>
        </Box>
      </AppBar>
      <TotalSPTable ticketList={state?.context?.ticketList} />
    </Fragment>
  );
}

export default TotalSP;

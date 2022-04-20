import { useMachine } from "@xstate/react";

import { totalSPMachine } from "./totalSPMachine";
import { actions } from "./stateActions";
import {
  useGetScrumList,
  useGetTicketList,
  useGetProjectGroups,
  useGetResourcePlanningList,
} from "./dataService";
import { Fragment } from "react";

import AppBar from "../../components/appBar/AppBar";
import Box from "@mui/material/Box";
import ItemSelect from "../../components/itemSelect/ItemSelect";
import TotalSPTable from "./TotalSPTable";
import ResourceSPTable from "./ResourceSPTable";

type scrumItem = { key: number; value: number; label: number };
type projectGroupItem = {
  key: number;
  value: number;
  label: string;
};

function TotalSP(props: any) {

  props.graphQLClient.setHeader(
    "Authorization",
    "Basic " + localStorage.getItem("data")
  );

  const { mutateAsync: invokeGetScrumList } = useGetScrumList(
    props.graphQLClient
  );

  const { mutateAsync: invokeGetTicketList } = useGetTicketList(
    props.graphQLClient
  );

  const { mutateAsync: invokeGetProjectGroups } = useGetProjectGroups(
    props.graphQLClient
  );
  const { mutateAsync: invokeGetResourcePlanningList } =
    useGetResourcePlanningList(props.graphQLClient);

  const [state, send] = useMachine(totalSPMachine, {
    actions,
    services: {
      invokeGetScrumList: (context: any) =>
        invokeGetScrumList({
          year: context.year,
          projectGroup: context.selectedProjectGroup,
        }),
      invokeGetTicketList: (context: any) =>
        invokeGetTicketList({
          scrum: context.selectedScrum,
          projectGroup: context.selectedProjectGroup,
        }),
      invokeGetProjectGroups: () => invokeGetProjectGroups(),
      invokeGetResourcePlanningList: (context: any) =>
        invokeGetResourcePlanningList({
          scrum: context.selectedScrum,
          projectGroup: context.selectedProjectGroup,
        }),
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

  const projectGroupItems: Array<projectGroupItem> =
    state.context?.projectGroups?.map((projectGroup: any) => {
      return {
        key: projectGroup.id,
        value: projectGroup.id,
        label: projectGroup.name,
      };
    });

  const onScrumChange = (event: any) => {
    send({
      type: "scrumChanged",
      data: event.target.value,
    });
  };

  const onProjectGroupChange = (event: any) => {
    send({
      type: "projectGroupChanged",
      data: event.target.value,
    });
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
          <ItemSelect
            items={projectGroupItems}
            defaultItem={state.context.selectedProjectGroup}
            onChange={onProjectGroupChange}
            name="Project Group"
            id="selectProjectGroupNative"
            showList={
              state.context?.selectedProjectGroup &&
              state.context?.projectGroups &&
              state.context?.projectGroups.length &&
              true
            }
          ></ItemSelect>
        </Box>
      </AppBar>
      <TotalSPTable ticketList={state?.context?.ticketList} />
      <ResourceSPTable
        resourcePlanningList={state?.context?.resourcePlanningList}
      ></ResourceSPTable>
    </Fragment>
  );
}

export default TotalSP;

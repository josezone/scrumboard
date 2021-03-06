import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useMachine } from "@xstate/react";
import { Fragment, useState } from "react";
import ScrumBoard from "../../components/scrumBoard/ScrumBoard";
import ScrumItem from "../../components/scrumBoard/ScrumItem";
import AppBar from "../../components/appBarHome/AppBar";
import {
  useGetCountryList,
  useGetProjectList,
  useGetScrumList,
  useInovkeRemoveRemoteTicket,
  useInvokeActivate,
  useInvokeCreateNewCountry,
  useInvokeCreateNewSprint,
  useInvokeCreateNewTickets,
  useInvokeUpdateTicket,
  useInvokeCreateResource,
  useInvokeCreateVersion,
  useInvokeGetSprintList,
  useInvokeGetSprintStatusList,
  useInvokeGetTicketsList,
  useInvokeGetVersionList,
  useInvokeMakeProject,
  useInvokeMakeScrum,
  useInvokePriorityList,
  useInvokeReloadCountryList,
  useInvokeReloadProject,
  useInvokeReloadSprintList,
  useInvokeRemoteStatusUpdate,
  useInvokeResouceTypeList,
  useInvokeResourceList,
  useInvokeScopeList,
  useInvokeTicketResource,
  useGetSprintListForMovingSprint,
  useChangeSprintTicket,
  useInvokeChangeEstimate,
  useInvokeUpdateSprint,
  useGetProjectGroupList,
  useInvokecreateEstimateList,
  useInvokeMakeProjectGroup,
} from "./dataService";
import { HomeStyle } from "./home.style";
import { homeMachine } from "./homeMachine";
import { actions } from "./stateActions";
import Resources from "../Resources/Resource";
import { guards } from "./guardService";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function Home(props: any) {
  const [value, setValue] = useState(0);

  props.graphQLClient.setHeader(
    "Authorization",
    "Basic " + localStorage.getItem("data")
  );

  const { mutateAsync: getProjectGroupList } = useGetProjectGroupList(props.graphQLClient);
  const { mutateAsync: getScrumList } = useGetScrumList(props.graphQLClient);
  const { mutateAsync: getCountryList } = useGetCountryList(
    props.graphQLClient
  );
  const { mutateAsync: getProjectList } = useGetProjectList(
    props.graphQLClient
  );
  const { mutateAsync: invokeGetSprintStatusList } =
    useInvokeGetSprintStatusList(props.graphQLClient);
  const { mutateAsync: invokeGetSprintList } = useInvokeGetSprintList(
    props.graphQLClient
  );
  const { mutateAsync: invokeGetTicketsList } = useInvokeGetTicketsList(
    props.graphQLClient
  );
  const { mutateAsync: invokeActivate } = useInvokeActivate(
    props.graphQLClient
  );

  const { mutateAsync: invokeMakeScrum } = useInvokeMakeScrum(
    props.graphQLClient
  );

  const { mutateAsync: invokeMakeProject } = useInvokeMakeProject(
    props.graphQLClient
  );

  const { mutateAsync: invokeReloadProject } = useInvokeReloadProject(
    props.graphQLClient
  );
  const { mutateAsync: invokeCreateNewSprint } = useInvokeCreateNewSprint(
    props.graphQLClient
  );

  const { mutateAsync: invokeReloadSprintList } = useInvokeReloadSprintList(
    props.graphQLClient
  );

  const { mutateAsync: invokeCreateNewCountry } = useInvokeCreateNewCountry(
    props.graphQLClient
  );

  const { mutateAsync: invokeReloadCountryList } = useInvokeReloadCountryList(
    props.graphQLClient
  );

  const { mutateAsync: invokeRemoteStatusUpdate } = useInvokeRemoteStatusUpdate(
    props.graphQLClient
  );

  const { mutateAsync: invokePriorityList } = useInvokePriorityList(
    props.graphQLClient
  );

  const { mutateAsync: invokeScopeList } = useInvokeScopeList(
    props.graphQLClient
  );

  const { mutateAsync: invokeResourceList } = useInvokeResourceList(
    props.graphQLClient
  );

  const { mutateAsync: invokeGetVersionList } = useInvokeGetVersionList(
    props.graphQLClient
  );

  const { mutateAsync: invokeCreateVersion } = useInvokeCreateVersion(
    props.graphQLClient
  );

  const { mutateAsync: invokeCreateNewTickets } = useInvokeCreateNewTickets(
    props.graphQLClient
  );

  const { mutateAsync: invokeUpdateTicket } = useInvokeUpdateTicket(
    props.graphQLClient
  );

  const { mutateAsync: invokeTicketResource } = useInvokeTicketResource(
    props.graphQLClient
  );

  const { mutateAsync: inovkeRemoveRemoteTicket } = useInovkeRemoveRemoteTicket(
    props.graphQLClient
  );

  const { mutateAsync: invokeResouceTypeList } = useInvokeResouceTypeList(
    props.graphQLClient
  );

  const { mutateAsync: invokeCreateResource } = useInvokeCreateResource(
    props.graphQLClient
  );
  const { mutateAsync: invokeGetSprintListForMovingSprint } =
    useGetSprintListForMovingSprint(props.graphQLClient);

  const { mutateAsync: invokeChangeSprintTicket } = useChangeSprintTicket(
    props.graphQLClient
  );

  const { mutateAsync: invokeChangeEstimate } = useInvokeChangeEstimate(
    props.graphQLClient
  );

  const { mutateAsync: invokeUpdateSprint } = useInvokeUpdateSprint(
    props.graphQLClient
  );

  const { mutateAsync: invokecreateEstimateList } = useInvokecreateEstimateList(
    props.graphQLClient
  );

  const { mutateAsync: invokeMakeProjectGroup } = useInvokeMakeProjectGroup(
    props.graphQLClient
  );


  const [state, send] = useMachine(homeMachine, {
    actions,
    services: {
      invokeGetScrumList: (context: any) => getScrumList(context),
      invokeProjectGroupList: (context: any) => getProjectGroupList(),
      invokegetCountryList: () => getCountryList(),
      invokegetProjectList: (context: any) => {
        return getProjectList({ selectedProjectGroupId: context.selectedProjectGroup.id })
      },
      invokeReloadProject: (context: any) => invokeReloadProject({ selectedProjectGroupId: context.selectedProjectGroup.id }),
      invokeResourceList: () => invokeResourceList(),
      invokeScopeList: () => invokeScopeList(),
      invokeGetSprintStatusList: () => invokeGetSprintStatusList(),
      invokeGetSprintList: (context: any) =>
        invokeGetSprintList({
          scrumId: context?.selectedScrum?.id,
        }),
      invokeReloadSprintList: (context: any) =>
        invokeReloadSprintList({
          scrumId: context?.selectedScrum?.id,
        }),
      invokeGetTicketsList: (context: any) =>
        invokeGetTicketsList({ sprintId: context?.selectedSprint?.id }),
      invokeActivate: (context: any) =>
        invokeActivate({
          activateId: context?.activateDeactivateScrum?.activate,
          projectGroupId: context?.selectedProjectGroup.id
        }),
      invokeMakeScrum: (context: any) =>
        invokeMakeScrum({
          scrum: context.scrumCreateData || new Date().toISOString(),
          project_group_id: context.selectedProjectGroup.id
        }),
      invokeMakeProject: (context: any) =>
        invokeMakeProject({ project: context.newProject, project_group_id: context.selectedProjectGroup.id }),
      invokeCreateNewSprint: (context: any) => {
        return invokeCreateNewSprint({
          sprint: context.newSprint.sprint,
          projectId: context.selectedProject.id,
          scrumId: context.selectedScrum.id,
          countryId: context.newSprint.country,
          verisonId: context.newSprint.version
        })
      },
      invokeCreateNewCountry: (context: any) =>
        invokeCreateNewCountry({ country: context.newCountry }),
      invokeReloadCountryList: () => invokeReloadCountryList(),
      invokeRemoteStatusUpdate: (context: any) =>
        invokeRemoteStatusUpdate({
          ticketId: context.remoteStatusUpdateData.ticket,
          statusId: context.remoteStatusUpdateData.status,
        }),
      invokeGetVersionList: (context: any) => {
        return invokeGetVersionList({
          countryId: context?.selectedCountry?.id,
          projectId: context?.selectedProject?.id,
        })
      },
      invokeCreateVersion: (context: any) => {
        return invokeCreateVersion({
          version: context.versionCreateData,
          countryId: context.selectedCountry?.id,
          projectId: context.selectedProject?.id,
        })
      },
      invokeCreateNewTickets: (context: any) =>
        invokeCreateNewTickets({
          sprintId: context?.selectedSprint?.id,
          statusId: context.sprintStatusList.length
            ? context.sprintStatusList[0]?.id
            : 0,
          ...context.newTicket.ticket,
        }),
      invokeUpdateSprint: (context: any) =>
        invokeUpdateSprint({
          sprintId: context.selectedSprint?.id,
          ...context?.updateSprint,
        }),
      invokeUpdateTicket: (context: any) =>
        invokeUpdateTicket({
          sprintId: context?.selectedSprint?.id,
          statusId: context.sprintStatusList.length
            ? context.sprintStatusList[0]?.id
            : 0,
          ...context?.updateTicket?.ticket,
          ticket_id: context?.updateTicket?.ticket_id,
        }),
      invokeAddResource: (context: any) =>
        invokeTicketResource({
          ticketId: context.newTicketId,
          resources: context.newTicket?.resources,
        }),
      inovkeRemoveRemoteTicket: (context: any) =>
        inovkeRemoveRemoteTicket({ ticketId: context.removeTicketId }),
      invokeCreateResource: (context: any) =>
        invokeCreateResource({
          resource: context.newResource.resource,
          resourceType: context.newResource.resourceType,
        }),
      invokeResouceTypeList: () => invokeResouceTypeList(),
      invokePriorityList: () => invokePriorityList(),
      invokeGetSprintListForMovingSprint: (cxt: any) =>
        invokeGetSprintListForMovingSprint(cxt?.sprintListMovingPayload || {}),
      invokeUpdateChangeTicketSprint: (cxt: any) =>
        invokeChangeSprintTicket(cxt?.changeSprintPayload || {}),
      invokeChangeEstimate: (context: any) =>
        invokeChangeEstimate({
          ticketId: context.estimateToggleId.id,
          estimate: context.estimateToggleId.estimation,
        }),
      invokecreateEstimateList: (context: any) =>
        invokecreateEstimateList({
          projectId: context.newProjectId,
          resourceTypeList: context.resourceTypeList,
        }),
      invokeMakeProjectGroup: (context: any) => invokeMakeProjectGroup({ newProjectGroup: context.newProjectGroup })
    },
    guards
  });
  const activateScrum = () => {
    send({ type: "activateScrum" });
  };

  const handleChange = (event: any, newValue: any) => {
    if(newValue === 0){
      send({ type: "reloadResource" });
    }
    setValue(newValue);
  };

  return (
    <Fragment>
      <HomeStyle>
        <Tabs value={value} onChange={handleChange} className="tabBar">
          <Tab label="Scrum" />
          <Tab label="Resources" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <AppBar {...state.context} send={send} />
          {state.context.selectedScrum && !state.context.selectedScrum.active && (
            <div>
              <Button variant="contained" onClick={activateScrum}>
                Activate Scrum
              </Button>
            </div>
          )}
          <ScrumBoard {...state.context} send={send} ScrumItem={ScrumItem} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Resources graphQLClient={props.graphQLClient}></Resources>
        </TabPanel>
      </HomeStyle>
    </Fragment>
  );
}

export default Home;

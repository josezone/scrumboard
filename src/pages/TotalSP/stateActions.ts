import { assign } from "xstate";

const assignSelectedScrum = assign({
  selectedScrum: (context: any, event: any) => {
    return parseInt(event.data);
  },
});

const assignSelectedProjectGroup = assign({
  selectedProjectGroup: (context: any, event: any) => {
    return parseInt(event.data);
  },
});

const assignScrumList = assign({
  scrumList: (context: any, event: any) => {
    return event.data.scrum;
  },
  selectedScrum: (context: any, event: any) => {
    return event.data.scrum[0].id;
  },
});

const assignProjectGroups = assign({
  projectGroups: (context: any, event: any) => {
    return event.data.project_group;
  },
  selectedProjectGroup: (context: any, event: any) => {
    return event.data.project_group[0].id;
  },
});

const assignTicketList = assign({
  ticketList: (context: any, event: any) => {
    return event.data.ticket;
  },
});

const assignResourcePlanningList = assign({
  resourcePlanningList: (context: any, event: any) => {
    return event.data.scrum_resource_project;
  },
});

export const actions = {
  assignSelectedScrum,
  assignScrumList,
  assignTicketList,
  assignSelectedProjectGroup,
  assignProjectGroups,
  assignResourcePlanningList,
};

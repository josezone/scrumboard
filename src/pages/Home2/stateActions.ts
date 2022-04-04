import { assign } from "xstate";

const assignSprintstatusCountryScopeResourcePriorityResourcetype = assign({
  countryList: (context: any, event: any) => {
    return event.data.country;
  },
  priorityList: (context: any, event: any) => {
    return event.data.priority;
  },
  resouceTypeList: (context: any, event: any) => {
    return event.data.resource_type;
  },
  resourceList: (context: any, event: any) => {
    return event.data.resource;
  },
  scopeList: (context: any, event: any) => {
    return event.data.scope;
  },
  sprintStatusList: (context: any, event: any) => {
    return event.data.status;
  },
});

const reassignResourceList = assign({
  resourceList: (context: any, event: any) => {
    return event.data.resource;
  },
});

const assignProjectGroupList = assign({
  projectGroupList: (context: any, event: any) => {
    return event.data.project_group;
  },
});

const assignDefaultProjectGroup = assign({
  projectGroupSelected: (context: any, event: any) => {
    return event.data?.project_group?.length
      ? event.data.project_group.sort((a: any, b: any) => a.id - b.id)[0]
      : undefined;
  },
});

const assignProjectScrumList = assign({
  projectList: (context: any, event: any) => {
    return event.data.project;
  },
  scrumList: (context: any, event: any) => {
    return event.data.scrum;
  },
});

const assignDefaultProjectScrum = assign({
  projectSelected: (context: any, event: any) => {
    return event.data?.project?.length
      ? event.data.project.sort((a: any, b: any) => a.id - b.id)[0]
      : undefined;
  },
  scrumSelected: (context: any, event: any) => {
    return event.data?.scrum?.length
      ? event.data.scrum.sort((a: any, b: any) => b.id - a.id)[0]
      : undefined;
  },
});

const assignSprintList = assign({
  sprintList: (context: any, event: any) => {
    return event.data.sprint;
  },
});

const assignDefaultSprint = assign({
  sprintSelected: (context: any, event: any) => {
    return event.data?.sprint?.length
      ? event.data.sprint.sort((a: any, b: any) => a.id - b.id)[0]
      : undefined;
  },
});

const assignTicketList = assign({
  ticketList: (context: any, event: any) => {
    const ticketList: any = {};
    context.sprintStatusList?.forEach((status: any) => {
      ticketList[status.status] = event?.data?.ticket?.filter(
        (ticket: any) => ticket.status.id === status.id
      );
    });
    return ticketList;
  },
});

const updateDefaultProjectGroup = assign({
  projectGroupSelected: (context: any, event: any) => {
    return event.data;
  },
  projectList: () => [],
  projectSelected: () => undefined,
  scrumList: () => [],
  scrumSelected: () => undefined,
  sprintList: () => [],
  sprintSelected: () => undefined,
  ticketList: () => [],
});

const updateDefaultProject = assign({
  projectSelected: (context: any, event: any) => {
    return event.data;
  },
  sprintList: () => [],
  sprintSelected: () => undefined,
  ticketList: () => [],
});

const updateDefaultScrum = assign({
  scrumSelected: (context: any, event: any) => {
    return event.data;
  },
  sprintList: () => [],
  sprintSelected: () => undefined,
  ticketList: () => [],
});

const updateTicketStatus = assign({
  ticketList: (context: any, event: any) => {
    return event.payload.ticketList;
  },
});

const assignRemoteUpdate = assign({
  remoteStatusUpdateData: (context: any, event: any) => {
    return {
      ticket: event.payload.ticketId,
      status: event.payload.destStatusId,
    };
  },
});

const removeTicketLocal = assign({
  ticketList: (context: any, event: any) => {
    return event.payload.ticketList;
  },
});

const removeRemoteTicket = assign({
  removeTicketId: (context: any, event: any) => {
    return event.payload.removeTicketId;
  },
});

const assignCreateTicket = assign({
  newTicket: (context: any, event: any) => {
    return event.prop;
  },
});

const assignTicketId = assign({
  newTicketId: (context: any, event: any) => {
    return event.data.insert_ticket.returning[0].id;
  },
});

const assignUpdateTicket = assign({
  updateTicket: (context: any, event: any) => {
    return event.prop;
  },
});

const assignGetVersion = assign({
  getVersion: (context: any, event: any) => {
    return event.data;
  },
});

const assignGetVersionList = assign({
  versionList: (context: any, event: any) => {
    return event.data.version;
  },
});

const assignNewSprint = assign({
  newSprint: (context: any, event: any) => {
    return event.data;
  },
  versionList: () => [],
});

const updateAssignSprint = assign({
  updateSprint: (context: any, event: any) => {
    return event.val;
  },
  versionList: () => [],
});

const updateDefaultSprint = assign({
  sprintSelected: (context: any, event: any) => {
    return event.data;
  },
});

const assignNewVersion = assign({
  newVersion: (context: any, event: any) => {
    return event.data;
  },
});

const assignDefaultVersionSprintList = assign({
  changeSprintVersionList: (context: any, event: any) => {
    return event.data.version;
  },
  changeSprintSprintList: (context: any, event: any) => {
    return event.data.sprint;
  },
});

const assignSprintChangeVersion = assign({
  sprintChangeVersion: (context: any, event: any) => {
    return event.data;
  },
  changeSprintSprintList: () => [],
});

const assignGetSprintInVersion = assign({
  changeSprintSprintList: (context: any, event: any) => {
    return event.data.sprint;
  },
});

const assignMakeChangeSprint = assign({
  updateSprintData: (context: any, event: any) => {
    return event.data;
  },
});

export const actions = {
  assignSprintstatusCountryScopeResourcePriorityResourcetype,
  assignProjectGroupList,
  assignDefaultProjectGroup,
  assignProjectScrumList,
  assignDefaultProjectScrum,
  assignSprintList,
  assignDefaultSprint,
  assignTicketList,
  updateDefaultProjectGroup,
  updateDefaultProject,
  updateDefaultScrum,
  updateTicketStatus,
  assignRemoteUpdate,
  removeTicketLocal,
  removeRemoteTicket,
  assignCreateTicket,
  assignTicketId,
  assignUpdateTicket,
  assignGetVersion,
  assignGetVersionList,
  assignNewSprint,
  updateDefaultSprint,
  updateAssignSprint,
  assignNewVersion,
  reassignResourceList,
  assignDefaultVersionSprintList,
  assignSprintChangeVersion,
  assignGetSprintInVersion,
  assignMakeChangeSprint,
};

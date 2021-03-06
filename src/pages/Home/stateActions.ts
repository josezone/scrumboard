import { assign } from "xstate";

const assignCountryList = assign({
  countryList: (context: any, event: any) => {
    return event.data.country;
  },
});

const assignReloadCountryList = assign({
  countryList: (context: any, event: any) => {
    return event.data.country;
  },
});

const assignPprojectList = assign({
  projectList: (context: any, event: any) => {
    return event.data.project_group[0].projects;
  },
});

const assignReloadProject = assign({
  projectList: (context: any, event: any) => {
    return event.data.project;
  },
});

const assignSprintStatusList = assign({
  sprintStatusList: (context: any, event: any) => {
    return event.data.status;
  },
});

const assignScrumList = assign({
  scrumList: (context: any, event: any) => {
    return event.data.scrum;
  },
});

const assignProjectGroupList = assign({
  projectGroupList: (context: any, event: any) => {
    return event.data.project_group;
  },
});

const assignProjectList = assign({
  projectGroupList: (context: any, event: any) => {
    return event.data.project;
  },
});

const assignSelectedScrum = assign({
  selectedScrum: (context: any, event: any) => {
    const scrum = context.scrumList.filter(
      (scrum: { active: boolean }) => scrum.active === true
    );
    return scrum.length ? scrum[0] : context.scrumList[0];
  },
});

const assignSelectedProject = assign({
  selectedProject: (context: any, event: any) => {
    return context.projectList[context.projectList.length - 1];
  },
});

const assignSelectedProjectGroup = assign({
  selectedProjectGroup: (context: any, event: any) => {
    return context.projectGroupList[0];
  },
});

const assignSprintList = assign({
  sprintList: (context: any, event: any) => {
    return event.data?.sprint || [];
  },
});

const assignReloadSprintList = assign({
  sprintList: (context: any, event: any) => {
    return event.data.sprint;
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

const assignSelectedSprint = assign({
  selectedSprint: (context: any, event: any) => {
    return context.sprintList ? context.sprintList[0] : {};
  },
  selectedCountry: (context: any, event: any) => {
    return context.sprintList
      ? context.sprintList.length
        ? context.sprintList[0].country
        : ""
      : "";
  },
  sprintListMovingPayload: (context: any, event: any) => {
    const countryId = context?.sprintList[0]?.country?.id || "";
    const projectId = context?.selectedProject?.id || "";
    const currentSprintId = context.sprintList[0]?.id || "";
    return {
      projectId,
      countryId,
      currentSprintId,
    };
  },
  selectedVersion: (context: any, event: any) => {
    return context.sprintList ? context.sprintList[0]?.version : {};
  }
});

const assignSelectedUpdatedSprint = assign({
  selectedSprint: (context: any, event: any) => {
    const updatedSprint = event.data?.update_sprint?.returning[0];
    return updatedSprint ? updatedSprint : {};
  },
  selectedCountry: (context: any, event: any) => {
    const updatedSprint = event.data?.update_sprint?.returning[0];
    return updatedSprint ? updatedSprint.country : "";
  },
  sprintList: (context: any, event: any) => {
    const updatedSprint = event.data?.update_sprint?.returning[0];
    const newSprintList = context.sprintList.map((sprint: any) => {
      return sprint.id === updatedSprint.id ? updatedSprint : sprint;
    });
    return newSprintList;
  },
  updateSprint: (context: any, event) => {
    return undefined;
  },
});

const updateYear = assign({
  year: (context: any, event: any) => {
    return event.prop;
  },
});

const updateScrum = assign({
  selectedScrum: (context: any, event: any) => {
    return event.prop;
  },
});

const activateScrum = assign({
  activateDeactivateScrum: (context: any, event: any) => {
    const update = {
      activate: "",
      deactivate: "",
    };
    const currentActive = context?.scrumList?.filter(
      (scrum: { active: boolean }) => scrum?.active === true
    );
    if (currentActive?.length) {
      update.deactivate = currentActive[0].id;
    }
    const toActivate = context?.scrumList?.filter(
      (scrum: any) => scrum?.id === context?.selectedScrum?.id
    );
    if (toActivate?.length) {
      update.activate = toActivate[0].id;
    }
    return update;
  },
});

const activateScrumList = assign({
  scrumList: (context: any, event: any) => {
    const currentActive = context?.scrumList?.filter(
      (scrum: { active: boolean }) => scrum?.active === true
    );
    if (currentActive?.length) {
      currentActive[0].active = false;
    }
    const toActivate = context?.scrumList?.filter(
      (scrum: any) => scrum?.id === context?.selectedScrum?.id
    );
    if (toActivate?.length) {
      toActivate[0].active = true;
    }
    return context.scrumList;
  },
});

const assignCreateScrumHandlePopup = assign({
  scrumCreateOpen: (context: any, event: any) => {
    return context.scrumCreateOpen ? false : true;
  },
});

const enableCreateSprintPopup = assign({
  newSprintPopup: (context: any, event: any) => {
    return context.newSprintPopup ? false : true;
  },
});

const disableCreateSprintPopup = assign({
  newSprintPopup: (context: any, event: any) => {
    return context.newSprintPopup ? false : true;
  },
});

const assignNewScrum = assign({
  scrumCreateData: (context: any, event: any) => {
    return event.prop.toISOString();
  },
});

const updateProject = assign({
  selectedProject: (context: any, event: any) => {
    return event.prop;
  },
});

const updateProjectGroup = assign({
  selectedProjectGroup: (context: any, event: any) => {
    return event.prop;
  },
  scrumList: (context: any, event: any) => {
    return [];
  },
  projectList: (context: any, event: any) => {
    return [];
  },
  sprintList: (context: any, event: any) => {
    return [];
  },
});

const assignNewProject = assign({
  newProject: (context: any, event: any) => {
    return event.prop;
  },
});

const assignCreateVersion = assign({
  versionCreateData: (context: any, event: any) => {
    return event.prop;
  },
});

const assignNewSprint = assign({
  newSprint: (context: any, event: any) => {
    return event.prop;
  },
});

const assignNewCountry = assign({
  newCountry: (context: any, event: any) => {
    return event.prop;
  },
});

const assignNewProjectGroup = assign({
  newProjectGroup: (context: any, event: any) => {
    return event.prop || undefined;
  },
});

const updateSprints = assign({
  selectedSprint: (context: any, event: any) => {
    return event.prop;
  },
  selectedCountry: (context: any, event: any) => {
    return event?.prop?.country || context?.selectedCountry;
  },
  selectedVersion: (context: any, event: any) => {
    return event.prop?.version || context?.selectedVersion;
  },
  sprintListMovingPayload: (context: any, event: any) => {
    return {
      ...context?.sprintListMovingPayload,
      countryId: event?.prop?.country?.id,
      currentSprintId: event?.prop?.id,
    };
  },
});

const updateTicketStatus = assign({
  ticketList: (context: any, event: any) => {
    return event.payload.ticketList;
  },
});

const assignPriorityList = assign({
  priorityList: (context: any, event: any) => {
    return event.data.priority;
  },
});

const selectSprintNull = assign({
  selectedSprint: (context: any, event: any) => {
    const sprintExists = context.sprintList.filter(
      (sprint: any) => sprint.id === context.selectedSprint
    );
    if (!context.selectedSprint) {
      return context.sprintList[0];
    } else if (sprintExists.length) {
      return context.selectedSprint;
    } else {
      return context.sprintList[0];
    }
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

const assignScopeList = assign({
  scopeList: (context: any, event: any) => {
    return event.data.scope;
  },
});

export const assignResourceList = assign({
  resourceList: (context: any, event: any) => {
    return event.data.resource;
  },
});

const assignVersionList = assign({
  versionList: (context: any, event: any) => {
    return event.data.version;
  },
});

const assignCreateTicket = assign({
  newTicket: (context: any, event: any) => {
    return event.prop;
  },
});

const assignEstimateChange = assign({
  estimateToggleId: (context: any, event: any) => {
    return event.prop;
  },
});

const assignUpdateTicket = assign({
  updateTicket: (context: any, event: any) => {
    return event.prop;
  },
});

const assignUpdateSprint = assign({
  updateSprint: (context: any, event: any) => {
    return event.prop;
  },
});
const clearUpdateSprint = assign({
  updateSprint: (context: any, event: any) => {
    return undefined;
  },
});
const clearUpdateTicket = assign({
  updateTicket: (context: any, event: any) => {
    return undefined;
  },
});

const assignTicketId = assign({
  newTicketId: (context: any, event: any) => {
    return event.data.insert_ticket.returning[0].id;
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

const assignResourceTypeList = assign({
  resourceTypeList: (context: any, event: any) => {
    return event.data.resource_type;
  },
});

const assignNewResource = assign({
  newResource: (context: any, event: any) => {
    return event.prop;
  },
});

const assignScrumListForMovingSprint = assign({
  sprintListMoving: (context: any, event: any) => {
    return event.data?.sprint || [];
  },
});

const assignChangeSprintPayload = assign({
  changeSprintPayload: (context: any, event: any) => {
    return event.prop;
  },
});

const clearAssignChangeSprintPayload = assign({
  changeSprintPayload: (context: any, event: any) => {
    return undefined;
  },
});

const assignEstimateStatus = assign({
  ticketList: (context: any, event: any) => {
    Object.values(context.ticketList).forEach((ticketType: any) => {
      ticketType.forEach((ticket: any) => {
        if (ticket.id === context.estimateToggleId.id) {
          ticket.estimation = context.estimateToggleId.estimation;
        }
      });
    });
    return context.ticketList;
  },
});

const updateCountry = assign({
  selectedCountry: (context: any, event: any) => {
    return event.prop || {};
  },
});

const updateVersion = assign({
  selectedVersion: (context: any, event: any) => {
    return event.prop || {};
  },
});

const resetSelectedVersion = assign({
  selectedVersion: (context: any, event: any) => {
    return {};
  },
});

const assignNewProjectId = assign({
  newProjectId: (context: any, event: any) => {
    return event.data.insert_project.returning[0].id;
  },
});

export const actions = {
  assignNewResource,
  assignResourceTypeList,
  removeRemoteTicket,
  removeTicketLocal,
  assignTicketId,
  assignCreateTicket,
  assignCreateVersion,
  assignVersionList,
  assignScopeList,
  assignResourceList,
  updateYear,
  updateScrum,
  activateScrum,
  assignScrumList,
  assignCountryList,
  assignPprojectList,
  assignSprintStatusList,
  assignSelectedScrum,
  assignSelectedProject,
  assignSprintList,
  assignSelectedSprint,
  assignTicketList,
  activateScrumList,
  assignCreateScrumHandlePopup,
  assignNewScrum,
  updateProject,
  assignNewProject,
  assignReloadProject,
  enableCreateSprintPopup,
  disableCreateSprintPopup,
  assignNewSprint,
  assignReloadSprintList,
  assignNewCountry,
  assignReloadCountryList,
  updateSprints,
  selectSprintNull,
  updateTicketStatus,
  assignRemoteUpdate,
  assignPriorityList,
  assignUpdateTicket,
  clearUpdateTicket,
  assignScrumListForMovingSprint,
  assignChangeSprintPayload,
  clearAssignChangeSprintPayload,
  assignEstimateChange,
  assignEstimateStatus,
  assignUpdateSprint,
  clearUpdateSprint,
  assignSelectedUpdatedSprint,
  assignProjectGroupList,
  assignSelectedProjectGroup,
  updateProjectGroup,
  updateCountry,
  updateVersion,
  assignNewProjectId,
  assignNewProjectGroup,
  resetSelectedVersion,
};

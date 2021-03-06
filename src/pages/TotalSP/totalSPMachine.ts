import { createMachine } from "xstate";

const date = new Date();
const year = date.getFullYear();

export const totalSPMachine = createMachine<any>({
  id: "main",
  initial: "getProjectGroups",
  context: {
    scrumList: [],
    ticketList: [],
    selectedScrum: undefined,
    year: year,
    projectGroups: [],
    selectedProjectGroup: undefined,
    resourcePlanningList: [],
  },
  states: {
    idle: {
      on: {
        scrumChanged: {
          actions: "assignSelectedScrum",
          target: "getTicketList",
        },
        projectGroupChanged: {
          actions: "assignSelectedProjectGroup",
          target: "getScrumList",
        },
      },
    },
    getScrumList: {
      invoke: {
        id: "getScrumList",
        src: "invokeGetScrumList",
        onDone: {
          actions: "assignScrumList",
          target: "getTicketList",
        },
        onError: {
          target: "idle",
        },
      },
    },
    getProjectGroups: {
      invoke: {
        id: "getProjectGroups",
        src: "invokeGetProjectGroups",
        onDone: {
          actions: "assignProjectGroups",
          target: "getScrumList",
        },
        onError: {
          target: "idle",
        },
      },
    },
    getTicketList: {
      invoke: {
        id: "getTicketList",
        src: "invokeGetTicketList",
        onDone: {
          actions: "assignTicketList",
          target: "getResourcePlanningList",
        },
        onError: {
          target: "idle",
        },
      },
    },
    getResourcePlanningList: {
      invoke: {
        id: "getResourcePlanningList",
        src: "invokeGetResourcePlanningList",
        onDone: {
          actions: "assignResourcePlanningList",
          target: "idle",
        },
        onError: {
          target: "idle",
        },
      },
    },
  },
});

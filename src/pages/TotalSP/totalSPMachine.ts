import { createMachine } from "xstate";

const date = new Date();
const year = date.getFullYear();

export const totalSPMachine = createMachine<any>({
  id: "main",
  initial: "getScrumList",
  context: {
    scrumList: [],
    ticketList: [],
    selectedScrum: undefined,
    year: year,
  },
  states: {
    idle: {
      on: {
        scrumChanged: {
          actions: "assignSelectedScrum",
          target: "getTicketList",
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

    getTicketList: {
      invoke: {
        id: "getTicketList",
        src: "invokeGetTicketList",
        onDone: {
          actions: "assignTicketList",
          target: "idle",
        },
        onError: {
          target: "idle",
        },
      },
    },
  },
});

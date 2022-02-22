import { createMachine } from "xstate";

export const estimateMachine = createMachine<any>({
  id: "main",
  type: "parallel",
  initial: "home",
  context: {
    ticketList: undefined,
    selectedTicketId: undefined,
  },
  states: {
    home: {
      id: "home",
      initial: "getTicketList",
      states: {
        getTicketList: {
          invoke: {
            id: "getTicketList",
            src: "invokeGetTicketList",
            onDone: {
              actions: "assignTicketList",
              target: "end",
            },
            onError: {
              target: "end",
            },
          },
        },
        end: {
          type: "final",
        },
      },
    },
    removeEstimate: {
      initial: "idle",
      states: {
        idle: {
          on: {
            removeEstimate: {
              target: "removeEstimateStart",
            },
          },
        },
        removeEstimateStart: {
          invoke: {
            id: "removeTicket",
            src: "invokeRemoveTicket",
            onDone: {
              actions: "removeTicketAction",
              target: "idle",
            },
            onError: {
              target: "idle",
            },
          },
        },
      },
    },
  },
});

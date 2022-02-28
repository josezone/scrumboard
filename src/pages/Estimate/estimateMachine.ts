import { createMachine } from "xstate";

export const estimateMachine = createMachine<any>({
  id: "main",
  type: "parallel",
  initial: "home",
  context: {
    ticketList: undefined,
    selectedTicketId: undefined,
    estimateList: undefined,
    estimateDate: undefined,
    selectedEstimate: undefined,
    updatedPoint: undefined,
  },
  states: {
    home: {
      id: "home",
      initial: "idle",
      states: {
        idle: {
          always: {
            target: ["groupList.ticketList", "groupList.getEstimateList"],
          },
        },
        groupList: {
          id: "groupList",
          type: "parallel",
          states: {
            ticketList: {
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
            getEstimateList: {
              initial: "getEstimateList",
              states: {
                getEstimateList: {
                  invoke: {
                    id: "getEstimateList",
                    src: "invokeGetEstimateList",
                    onDone: {
                      actions: "assignEstimateList",
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
          },
        },
      },
    },
    updatePoints: {
      initial: "idle",
      states: {
        idle: {
          on: {
            updatePoints: {
              target: "invokeUpdatePoints",
              actions: "assignPoints",
            },
          },
        },
        invokeUpdatePoints: {
          invoke: {
            id: "invokeUpdatePoints",
            src: "invokeUpdatePoints",
            onDone: {
              target: "idle",
            },
            onError: {
              target: "idle",
            },
          },
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

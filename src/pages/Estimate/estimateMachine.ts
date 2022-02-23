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
  },
  states: {
    home: {
      id: "home",
      initial: "idle",
      states: {
        idle: {
          always: {
            target: ["groupList.ticketList", "groupList.estimateDate"],
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
            estimateDate: {
              initial: "getEstimateDate",
              states: {
                getEstimateDate: {
                  invoke: {
                    id: "getEstimateDate",
                    src: "invokeEstimateDate",
                    onDone: {
                      actions: "assigngetEstimateDate",
                      target: "selectDefaultDate",
                    },
                    onError: {
                      target: "end",
                    },
                  },
                },
                selectDefaultDate: {
                  always: {
                    actions: "assignDefaultDate",
                    target: "getEstimateList",
                  },
                },
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
    changeDate: {
      initial: "idle",
      states: {
        idle: {
          on: {
            changeDate: {
              actions: "assignChangeDate",
              target:"#main.home.groupList.estimateDate.getEstimateList"
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

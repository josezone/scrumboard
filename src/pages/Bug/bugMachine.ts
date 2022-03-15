import { createMachine } from "xstate";

export const bugMachine = createMachine<any>({
  id: "main",
  type: "parallel",
  context: {
    newBug: undefined,
    bugList: undefined,
    updateBugReport: undefined,
    removeBug: undefined,
    resourceList: undefined,
    ticketInfo: undefined,
    newBugModal: false,
  },
  states: {
    bug: {
      type: "parallel",
      states: {
        listBug: {
          initial: "getList",
          states: {
            getList: {
              invoke: {
                id: "getList",
                src: "invokeGetList",
                onDone: {
                  actions: "assignBugList",
                  target: ["#main.getTickets.getTicketsInfo", "end"],
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
        resourceList: {
          initial: "start",
          states: {
            start: {
              invoke: {
                id: "resourceList",
                src: "invokeResourceList",
                onDone: {
                  actions: "assignResourceList",
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
    getTickets: {
      initial: "idle",
      states: {
        idle: {
          on: {
            getTicketInfo: {
              target: "getTicketsInfo",
            },
          },
        },
        getTicketsInfo: {
          invoke: {
            id: "getTicketsInfo",
            src: "invokeGetTicket",
            onDone: {
              actions: "assignTicketInfo",
              target: "idle"
            },
            onError: {
              target: "idle"
            }
          }
        }
      }
    },
    createBug: {
      initial: "idle",
      states: {
        idle: {
          on: {
            createBug: {
              target: "newBug",
              actions: "assignNewBug",
            },
            addBugModalToggle: {
              target: "idle",
              actions: "assignToggleModal"
            }
          },
        },
        newBug: {
          invoke: {
            id: "newBug",
            src: "invokeNewBug",
            onDone: {
              target: ["#main.bug.listBug.getList", "idle"],
              actions: "assignToggleModal"
            },
            onError: {
              target: "idle",
            },
          },
        },
      },
    },
    changeReport: {
      initial: "idle",
      states: {
        idle: {
          on: {
            changeReport: {
              target: "updateReport",
              actions: "assignReport",
            },
          },
        },
        updateReport: {
          invoke: {
            id: "updateReport",
            src: "invokeUpdateReport",
            onDone: {
              actions: "assignUpdateReportBugList",
              target: "idle",
            },
            onError: {
              target: "idle",
            },
          },
        },
      },
    },
    updateBug: {
      initial: "idle",
      states: {
        idle: {
          on: {
            updateBug: {
              target: "makeUpdateBug",
              actions: "assignUpdateBug",
            },
          },
        },
        makeUpdateBug: {
          invoke: {
            id: "makeUpdateBug",
            src: "invokeUpdateBug",
            onDone: {
              actions: "assignUpdateBugList",
              target: "idle",
            },
            onError: {
              target: "idle",
            },
          },
        },
      },
    },
    removeBug: {
      initial: "idle",
      states: {
        idle: {
          on: {
            removeBug: {
              target: "deleteBug",
              actions: "assignRemoveBug",
            },
          },
        },
        deleteBug: {
          invoke: {
            id: "deleteBug",
            src: "invokeDeleteBug",
            onDone: {
              actions: "assignDeleteBug",
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

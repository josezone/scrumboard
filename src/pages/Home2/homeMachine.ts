import { createMachine } from "xstate";

export const homeMachine = createMachine<any>({
  id: "main",
  type: "parallel",
  context: {
    countryList: [],
    priorityList: [],
    projectGroupList: [],
    projectGroupSelected: undefined,
    projectList: [],
    projectSelected: undefined,
    resouceTypeList: [],
    resourceList: [],
    scopeList: [],
    scrumList: [],
    scrumSelected: undefined,
    sprintList: [],
    sprintSelected: undefined,
    sprintStatusList: [],
    ticketList: [],
  },

  states: {
    initGroup: {
      type: "parallel",
      states: {
        groupOne: {
          initial: "getSprintstatusCountryScopeResourcePriorityResourcetype",
          states: {
            getSprintstatusCountryScopeResourcePriorityResourcetype: {
              invoke: {
                id: "getSprintstatusCountryScopeResourcePriorityResourcetype",
                src: "invokeGetSprintstatusCountryScopeResourcePriorityResourcetype",
                onDone: {
                  actions:
                    "assignSprintstatusCountryScopeResourcePriorityResourcetype",
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
        groupTwo: {
          initial: "getProjectGroupList",
          states: {
            getProjectGroupList: {
              invoke: {
                id: "getProjectGroupList",
                src: "invokeGetProjectGroupList",
                onDone: {
                  actions: [
                    "assignProjectGroupList",
                    "assignDefaultProjectGroup",
                  ],
                  target: "getProjectAndScrumList",
                },
                onError: {
                  target: "end",
                },
              },
            },
            getProjectAndScrumList: {
              invoke: {
                id: "getProjectAndScrumList",
                src: "invokeGetProjectAndScrumList",
                onDone: {
                  actions: [
                    "assignProjectScrumList",
                    "assignDefaultProjectScrum",
                  ],
                  target: ["#main.getSprint.getSprintlist", "end"],
                },
                onError: {
                  target: "end",
                },
              },
            },
            end: {
              on: {
                projectGroupChanged: {
                  actions: "updateDefaultProjectGroup",
                  target: "getProjectAndScrumList",
                },
              },
            },
          },
        },
      },
    },
    getSprint: {
      states: {
        getSprintlist: {
          invoke: {
            id: "getSprintList",
            src: "invokeGetSprintList",
            onDone: {
              actions: ["assignSprintList", "assignDefaultSprint"],
              target: ["#main.getTicket.getTicketlist", "end"],
            },
            onError: {
              target: "end",
            },
          },
        },
        end: {
          on: {
            projectChanged: {
              actions: "updateDefaultProject",
              target: "getSprintlist",
            },
            scrumChanged: {
              actions: "updateDefaultScrum",
              target: "getSprintlist",
            },
          },
        },
      },
    },
    getTicket: {
      states: {
        getTicketlist: {
          invoke: {
            id: "getTicketlist",
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
          on: {
            sprintChanged: {
              actions: "updateDefaultSprint",
              target: "getTicketlist",
            },
            updateTicketStatus: {
              actions: ["updateTicketStatus", "assignRemoteUpdate"],
              target: "invokeRemoteStatusUpdate",
            },
            removeTicket: {
              actions: ["removeTicketLocal", "removeRemoteTicket"],
              target: "removeRemoteTicket",
            },
            newTicket: {
              target: "createTicket",
              actions: "assignCreateTicket",
            },
            updateTicket: {
              target: [
                "updateTicketGroup.insertResourceTicketC.insertResourceTicket",
                "updateTicketGroup.updateTicketC.updateTicket",
                "updateTicketGroup.updateResourceTicketC.updateResourceTicket",
                "updateTicketGroup.deleteResourceTicketC.deleteResourceTicket",
              ],
              actions: "assignUpdateTicket",
            },
          },
        },
        invokeRemoteStatusUpdate: {
          invoke: {
            id: "invokeRemoteStatusUpdate",
            src: "invokeRemoteStatusUpdate",
            onDone: {
              target: "end",
            },
            onError: {
              target: "end",
            },
          },
        },
        removeRemoteTicket: {
          invoke: {
            id: "removeRemoteTicket",
            src: "inovkeRemoveRemoteTicket",
            onDone: {
              target: "end",
            },
            onError: {
              target: "end",
            },
          },
        },
        createTicket: {
          invoke: {
            id: "createTicket",
            src: "invokeCreateNewTickets",
            onDone: {
              target: "addResource",
              actions: "assignTicketId",
            },
            onError: {
              target: "end",
            },
          },
        },
        addResource: {
          invoke: {
            id: "addResource",
            src: "invokeAddResource",
            onDone: {
              target: "getTicketlist",
            },
            onError: {
              target: "end",
            },
          },
        },
        updateTicketGroup: {
          type: "parallel",
          states: {
            updateTicketC: {
              states: {
                updateTicket: {
                  invoke: {
                    id: "updateTicket",
                    src: "invokeUpdateTicket",
                    onDone: {
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
            deleteResourceTicketC: {
              states: {
                deleteResourceTicket: {
                  invoke: {
                    id: "deleteResourceTicket",
                    src: "invokeDeleteResourceTicket",
                    onDone: {
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
            updateResourceTicketC: {
              states: {
                updateResourceTicket: {
                  invoke: {
                    id: "updateResourceTicket",
                    src: "invokeUpdateResourceTicket",
                    onDone: {
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
            insertResourceTicketC: {
              states: {
                insertResourceTicket: {
                  invoke: {
                    id: "insertResourceTicket",
                    src: "invokeAddResourceTicket",
                    onDone: {
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
          onDone: {
            target: "#main.getTicket.getTicketlist",
          },
        },
      },
    },
  },
});

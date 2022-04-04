import { createMachine } from "xstate";

export const homeMachine = createMachine<any>({
  id: "main",
  type: "parallel",
  context: {
    countryList: [],
    getVersion: undefined,
    newSprint: undefined,
    newTicket: undefined,
    newTicketId: undefined,
    priorityList: [],
    projectGroupList: [],
    projectGroupSelected: undefined,
    projectList: [],
    projectSelected: undefined,
    remoteStatusUpdateData: undefined,
    removeTicketId: undefined,
    resouceTypeList: [],
    resourceList: [],
    scopeList: [],
    scrumList: [],
    scrumSelected: undefined,
    sprintList: [],
    sprintSelected: undefined,
    sprintStatusList: [],
    ticketList: [],
    updateSprint: undefined,
    updateTicket: undefined,
    versionList: [],
    newVersion: undefined,
    changeSprintVersionList: [],
    changeSprintSprintList: [],
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
    version: {
      initial: "idle",
      states: {
        idle: {
          on: {
            getVersion: {
              actions: "assignGetVersion",
              target: "getVersionList",
            },
          },
        },
        getVersionList: {
          invoke: {
            id: "getVersionList",
            src: "invokeGetVersionList",
            onDone: {
              actions: "assignGetVersionList",
              target: "idle",
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
        createNewSprint: {
          invoke: {
            id: "createNewSprint",
            src: "invokeCreateNewSprint",
            onDone: {
              target: "getSprintlist",
            },
            onError: {
              target: "end",
            },
          },
        },
        updateSprintStart: {
          invoke: {
            id: "updateSprintStart",
            src: "invokeUpdateSprint",
            onDone: {
              target: "getSprintlist",
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
            newSprint: {
              actions: "assignNewSprint",
              target: "createNewSprint",
            },
            updateSprint: {
              actions: "updateAssignSprint",
              target: "updateSprintStart",
            },
          },
        },
      },
    },
    newVersion: {
      initial: "idle",
      states: {
        idle: {
          on: {
            newVersion: {
              actions: "assignNewVersion",
              target: "createNewVersion",
            },
          },
        },
        createNewVersion: {
          invoke: {
            id: "createNewVersion",
            src: "invokeCreateNewVersion",
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
    estimate: {
      id: "estimate",
      initial: "end",
      states: {
        changeEstimate: {
          invoke: {
            id: "changeEstimate",
            src: "invokeChangeEstimate",
            onDone: {
              actions: "assignEstimateStatus",
              target: "end",
            },
            onError: {
              target: "end",
            },
          },
        },
        end: {
          on: {
            toggleEstimate: {
              target: "changeEstimate",
              actions: "assignEstimateChange",
            },
          },
        },
      },
    },
    changeSprint: {
      initial: "idle",
      states: {
        idle: {
          on: {
            initChangeSprint: {
              target: "getVersionSprintList",
            },
            sprintChangeVersion: {
              actions: "assignSprintChangeVersion",
              target: "getSprintInVersion",
            },
            makeChangeSprint: {
              actions: "assignMakeChangeSprint",
              target: "updateChangeSprint",
            },
          },
        },
        getVersionSprintList: {
          invoke: {
            id: "getVersionSprintList",
            src: "invokeGetVersionSprintList",
            onDone: {
              actions: "assignDefaultVersionSprintList",
              target: "idle",
            },
            onError: {
              target: "idle",
            },
          },
        },
        updateChangeSprint: {
          invoke: {
            id: "updateChangeSprint",
            src: "invokeUpdateChangeSprint",
            onDone: {
              actions: "idle",
              target: ["#main.getTicket.getTicketlist", "idle"],
            },
            onError: {
              target: "idle",
            },
          },
        },
        getSprintInVersion: {
          invoke: {
            id: "getSprintInVersion",
            src: "invokeGetSprintInVersion",
            onDone: {
              actions: "assignGetSprintInVersion",
              target: "idle",
            },
            onError: {
              target: "idle",
            },
          },
        },
      },
    },
    resourceList: {
      initial: "idle",
      states: {
        idle: {
          on: {
            resourceList: {
              target: "getResourceList",
            },
          },
        },
        getResourceList: {
          invoke: {
            id: "getResourceList",
            src: "invokeGetResourceList",
            onDone: {
              actions: "reassignResourceList",
              target: "idle",
            },
            onError: {
              target: "idle",
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

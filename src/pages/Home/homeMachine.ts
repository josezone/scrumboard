import { createMachine } from "xstate";

export const homeMachine = createMachine<any>({
  id: "main",
  type: "parallel",
  initial: "home",
  context: {
    year: new Date().getFullYear(),
    scrumList: undefined,
    selectedScrum: undefined,
    projectList: undefined,
    selectedProject: undefined,
    selectedSprint: undefined,
    ticketList: undefined,
    newScrum: undefined,
    newProject: undefined,
    countryList: undefined,
    selectedCountry: undefined,
    sprintStatusList: undefined,
    activateDeactivateScrum: undefined,
    scrumCreateOpen: false,
    scrumCreateData: undefined,
    newSprintPopup: false,
    newSprint: undefined,
    newCountry: undefined,
    sprintList: undefined,
    remoteStatusUpdateData: undefined,
    priorityList: undefined,
    scopeList: undefined,
    resourceList: undefined,
    versionList: undefined,
    versionCreateData: undefined,
    removeTicketId: undefined,
    resouceTypeList: undefined,
    newResource: undefined,
    updateTicket: undefined,
    sprintListMoving: undefined,
    sprintListMovingPayload: undefined,
    changeSprintPayload: undefined,
    estimateToggleId: undefined,
    updateSprint: undefined,
    newProjectId: undefined,
  },
  states: {
    home: {
      id: "home",
      initial: "idle",
      on: {
        yearChanged: {
          actions: "updateYear",
          target: "home.getScrumList",
        },
        scrumChanged: {
          actions: "updateScrum",
          target: "home.sprintList",
        },
        projectChanged: {
          actions: "updateProject",
          target: "home.sprintList",
        },
        sprintChanged: {
          actions: "updateSprint",
          target: "home.getTickets",
        },
        updateSprint: {
          actions: "assignUpdateSprint",
          target: "home.updateSelectedSprint",
        },
        assignNewCountry: {
          target: "newSprint.createNewCountry",
          actions: "assignNewCountry",
        },
      },
      states: {
        idle: {
          always: {
            target: [
              "getGroupList.getCountryList",
              "getGroupList.getProjectList",
              "getGroupList.getSprintStatusList",
              "getGroupList.priorityList",
              "getGroupList.scopeList",
              "getGroupList.resourceList",
            ],
          },
        },
        getGroupList: {
          id: "getGroupList",
          type: "parallel",
          states: {
            priorityList: {
              initial: "start",
              states: {
                start: {
                  invoke: {
                    id: "priorityList",
                    src: "invokePriorityList",
                    onDone: {
                      actions: "assignPriorityList",
                      target: "end",
                    },
                    onError: {
                      target: "#home.failiure",
                    },
                  },
                },
                end: {
                  type: "final",
                },
              },
            },
            resouceTypeList: {
              initial: "start",
              states: {
                start: {
                  invoke: {
                    id: "resouceTypeList",
                    src: "invokeResouceTypeList",
                    onDone: {
                      actions: "assignResourceTypeList",
                      target: "end",
                    },
                    onError: {
                      target: "#home.failiure",
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
                      target: "#home.failiure",
                    },
                  },
                },
                end: {
                  type: "final",
                },
              },
            },
            scopeList: {
              initial: "start",
              states: {
                start: {
                  invoke: {
                    id: "scopeList",
                    src: "invokeScopeList",
                    onDone: {
                      actions: "assignScopeList",
                      target: "end",
                    },
                    onError: {
                      target: "#home.failiure",
                    },
                  },
                },
                end: {
                  type: "final",
                },
              },
            },
            getCountryList: {
              initial: "start",
              states: {
                start: {
                  invoke: {
                    id: "getCountryList",
                    src: "invokegetCountryList",
                    onDone: {
                      actions: "assignCountryList",
                      target: "end",
                    },
                    onError: {
                      target: "#home.failiure",
                    },
                  },
                },
                end: {
                  type: "final",
                },
              },
            },
            getProjectList: {
              initial: "start",
              states: {
                start: {
                  invoke: {
                    id: "getProjectList",
                    src: "invokegetProjectList",
                    onDone: {
                      actions: "assignPprojectList",
                      target: "projectSelect",
                    },
                    onError: {
                      target: "#home.failiure",
                    },
                  },
                },
                projectSelect: {
                  always: {
                    target: "end",
                    actions: "assignSelectedProject",
                  },
                },
                end: {
                  type: "final",
                },
              },
            },
            getSprintStatusList: {
              initial: "start",
              states: {
                start: {
                  invoke: {
                    id: "getSprintStatusList",
                    src: "invokeGetSprintStatusList",
                    onDone: {
                      actions: "assignSprintStatusList",
                      target: "end",
                    },
                    onError: {
                      target: "#home.failiure",
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
            target: "#home.getScrumList",
          },
        },
        getScrumList: {
          invoke: [
            {
              id: "getScrumList",
              src: "invokeGetScrumList",
              onDone: {
                actions: "assignScrumList",
                target: "scrumSelect",
              },
              onError: {
                target: "failiure",
              },
            },
          ],
        },
        scrumSelect: {
          always: {
            target: "sprintList",
            actions: "assignSelectedScrum",
          },
        },
        sprintList: {
          invoke: {
            id: "sprintList",
            src: "invokeGetSprintList",
            onDone: {
              target: "sprintSelect",
              actions: "assignSprintList",
            },
            onError: {
              target: "failiure",
            },
          },
        },
        sprintSelect: {
          always: {
            target: "getVersionList",
            actions: "assignSelectedSprint",
          },
        },
        updateSelectedSprint: {
          invoke: {
            id: "updateSelectedSprint",
            src: "invokeUpdateSprint",
            onDone: {
              actions: "assignSelectedUpdatedSprint",
            },
            onError: {
              target: "idle",
              actions: "clearUpdateSprint",
            },
          },
        },
        getVersionList: {
          invoke: {
            id: "getVersionList",
            src: "invokeGetVersionList",
            onDone: {
              actions: "assignVersionList",
              target: "getTickets",
            },
            onError: {
              target: "failiure",
            },
          },
        },
        getTickets: {
          invoke: {
            id: "getTickets",
            src: "invokeGetTicketsList",
            onDone: {
              target: "getAvailableSprintListForMoving",
              actions: "assignTicketList",
            },
            onError: {
              target: "failiure",
            },
          },
        },
        getAvailableSprintListForMoving: {
          invoke: {
            id: "getAvailableScrum",
            src: "invokeGetSprintListForMovingSprint",
            onDone: {
              target: "success",
              actions: "assignScrumListForMovingSprint",
            },
            onError: {
              target: "failiure",
            },
          },
        },
        success: {
          type: "final",
        },
        failiure: {
          type: "final",
        },
      },
    },
    invokeRemoteStatusUpdate: {
      id: "invokeRemoteStatusUpdate",
      initial: "idle",
      states: {
        idle: {
          on: {
            updateTicketStatus: {
              actions: ["updateTicketStatus", "assignRemoteUpdate"],
              target: "invokeRemoteStatusUpdate",
            },
          },
        },
        invokeRemoteStatusUpdate: {
          invoke: {
            id: "invokeRemoteStatusUpdate",
            src: "invokeRemoteStatusUpdate",
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
    activateScrum: {
      id: "activateScrum",
      initial: "idle",
      states: {
        idle: {
          on: {
            activateScrum: {
              actions: "activateScrum",
              target: "#activateScrum.activate",
            },
          },
        },
        activate: {
          invoke: {
            id: "invokeActivate",
            src: "invokeActivate",
            onDone: {
              actions: "activateScrumList",
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
      on: {
        toggleEstimate: {
          target: "estimate.changeEstimate",
          actions: "assignEstimateChange",
        },
      },
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
          type: "final",
        },
      },
    },
    newScrum: {
      id: "newScrum",
      initial: "end",
      on: {
        createScrumPopupOpen: {
          target: "#newScrum.createScrum",
          actions: "assignCreateScrumHandlePopup",
        },
        createScrumPopupClose: {
          target: "#newScrum.end",
          actions: "assignCreateScrumHandlePopup",
        },
      },
      states: {
        createScrum: {
          on: {
            createScrum: {
              target: "initiateScrumCreate",
              actions: "assignNewScrum",
            },
            initiateScrumCreate: {
              target: "makeScrum",
            },
          },
        },
        initiateScrumCreate: {
          on: {
            initiateScrumCreate: {
              target: "makeScrum",
            },
          },
        },
        makeScrum: {
          invoke: {
            id: "makeScrum",
            src: "invokeMakeScrum",
            onDone: [
              {
                target: "#home.getScrumList",
                actions: "assignCreateScrumHandlePopup",
              },
            ],
            onError: {
              target: "createScrum",
              actions: "assignCreateScrumHandlePopup",
            },
          },
        },
        end: {
          type: "final",
        },
      },
    },
    removeTicket: {
      id: "removeTicket",
      initial: "idle",
      states: {
        idle: {
          on: {
            removeTicket: {
              actions: ["removeTicketLocal", "removeRemoteTicket"],
              target: "removeRemoteTicket",
            },
          },
        },
        removeRemoteTicket: {
          invoke: {
            id: "removeRemoteTicket",
            src: "inovkeRemoveRemoteTicket",
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
    newResource: {
      id: "newResource",
      initial: "idle",
      states: {
        idle: {
          on: {
            newResource: {
              target: "createResource",
              actions: "assignNewResource",
            },
          },
        },
        createResource: {
          invoke: {
            id: "createResource",
            src: "invokeCreateResource",
            onDone: {
              target: "reloadResourceList",
            },
            onError: {
              target: "idle",
            },
          },
        },
        reloadResourceList: {
          invoke: {
            id: "resourceList",
            src: "invokeResourceList",
            onDone: {
              actions: "assignResourceList",
              target: "idle",
            },
            onError: {
              target: "idle",
            },
          },
        },
      },
    },
    newProject: {
      id: "newProject",
      initial: "idle",
      states: {
        idle: {
          on: {
            createProject: {
              target: "makeProject",
              actions: "assignNewProject",
            },
          },
        },
        makeProject: {
          invoke: {
            id: "makeProject",
            src: "invokeMakeProject",
            onDone: {
              target: "createEstimateList",
              actions: "assignNewProjectId",
            },
            onError: {
              target: "idle",
            },
          },
        },
        createEstimateList: {
          invoke: {
            id: "createEstimateList",
            src: "invokecreateEstimateList",
            onDone: {
              target: "reloadProject",
            },
            onError: {
              target: "idle",
            },
          },
        },
        reloadProject: {
          invoke: {
            id: "reloadProject",
            src: "invokeReloadProject",
            onDone: {
              target: "idle",
              actions: ["assignReloadProject", "assignSelectedProject"],
            },
            onError: {
              target: "idle",
            },
          },
        },
      },
    },
    newVersion: {
      id: "newVersion",
      initial: "idle",
      states: {
        idle: {
          on: {
            newVersion: {
              target: "createVersion",
              actions: "assignCreateVersion",
            },
          },
        },
        createVersion: {
          invoke: {
            id: "createVersion",
            src: "invokeCreateVersion",
            onDone: {
              target: "getVersionList",
            },
            onError: {
              target: "idle",
            },
          },
        },
        getVersionList: {
          invoke: {
            id: "getVersionList",
            src: "invokeGetVersionList",
            onDone: {
              actions: "assignVersionList",
              target: "idle",
            },
            onError: {
              target: "idle",
            },
          },
        },
      },
    },
    newSprint: {
      id: "newSprint",
      initial: "end",
      on: {
        createSprintPopupOpen: {
          target: "#newSprint.assignNewSprintCountry",
          actions: "enableCreateSprintPopup",
        },
        createSprintPopupClose: {
          target: "#newSprint.end",
          actions: "disableCreateSprintPopup",
        },
      },
      states: {
        assignNewSprintCountry: {
          on: {
            assignNewSprint: {
              target: "createNewSprint",
              actions: "assignNewSprint",
            },
            assignNewCountry: {
              target: "createNewCountry",
              actions: "assignNewCountry",
            },
          },
        },
        createNewSprint: {
          invoke: {
            id: "createNewSprint",
            src: "invokeCreateNewSprint",
            onDone: {
              target: "reloadSprintList",
            },
            onError: {
              target: "#newSprint.end",
              actions: "disableCreateSprintPopup",
            },
          },
        },
        reloadSprintList: {
          invoke: {
            id: "reloadSprintList",
            src: "invokeReloadSprintList",
            onDone: {
              target: "#newSprint.end",
              actions: [
                "assignReloadSprintList",
                "disableCreateSprintPopup",
                "selectSprintNull",
              ],
            },
            onError: {
              target: "#newSprint.end",
              actions: "disableCreateSprintPopup",
            },
          },
        },
        createNewCountry: {
          invoke: {
            id: "createNewCountry",
            src: "invokeCreateNewCountry",
            onDone: {
              target: "reloadCountryList",
            },
            onError: {
              target: "#newSprint.end",
            },
          },
        },
        reloadCountryList: {
          invoke: {
            id: "reloadCountryList",
            src: "invokeReloadCountryList",
            onDone: {
              target: "#newSprint.end",
              actions: "assignReloadCountryList",
            },
            onError: {
              target: "#newSprint.end",
            },
          },
        },
        end: {
          id: "end",
          type: "final",
        },
      },
    },
    newTicket: {
      id: "newTicket",
      initial: "idle",
      states: {
        idle: {
          on: {
            newTicket: {
              target: "createTicket",
              actions: "assignCreateTicket",
            },
            updateTicket: {
              target: "updateExistingTicket",
              actions: "assignUpdateTicket",
            },
            changeTicketSprint: {
              target: "updateChangeTicketSprint",
              actions: "assignChangeSprintPayload",
            },
          },
        },
        updateChangeTicketSprint: {
          invoke: {
            id: "updateChangeTicketSprint",
            src: "invokeUpdateChangeTicketSprint",
            onDone: {
              target: ["idle", "#home.getTickets"],
              actions: "clearAssignChangeSprintPayload",
            },
            onError: {
              target: "idle",
              actions: "clearAssignChangeSprintPayload",
            },
          },
        },
        updateExistingTicket: {
          invoke: {
            id: "updateTicket",
            src: "invokeUpdateTicket",
            onDone: {
              target: ["idle", "#home.getTickets"],
              actions: "clearUpdateTicket",
            },
            onError: {
              target: "idle",
              actions: "clearUpdateTicket",
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
              target: "idle",
            },
          },
        },
        addResource: {
          invoke: {
            id: "addResource",
            src: "invokeAddResource",
            onDone: {
              target: ["idle", "#home.getTickets"],
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

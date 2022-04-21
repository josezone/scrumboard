import { createMachine } from "xstate";

export const versionMachine = createMachine<any>({
  id: "main",
  type: "parallel",
  initial: "projectGroupVersionTypeGroup",
  context: {
    projectGroupList: [],
    selectedProjectGroup: undefined,
    projectList: [],
    selectedProject: undefined,
    versionList: [],
    selectedVersion: undefined,
    versionTypeList: [],
    newVersionNotes: undefined,
    countryList: [],
    defaultCountry: undefined,
    versionNotes: [],
    versionTickets: [],
  },
  states: {
    projectGroupVersionTypeGroup: {
      initial: "getProjectGroupVersionTypeList",
      states: {
        getProjectGroupVersionTypeList: {
          invoke: {
            id: "getProjectGroupVersionTypeList",
            src: "invokeGetProjectGroupVersionTypeList",
            onDone: {
              actions: "assignProjectGroupVersionTypeList",
              target: "setDefaultProjectGroup",
            },
            onError: {
              target: "end",
            },
          },
        },
        setDefaultProjectGroup: {
          always: {
            actions: "assignDefaultProjectGroup",
            target: ["#main.projectGroup.getProjectList", "end"],
          },
        },
        end: {
          type: "final",
        },
      },
    },
    projectGroup: {
      states: {
        getProjectList: {
          invoke: {
            id: "getProjectList",
            src: "invokeGetProjectList",
            onDone: {
              actions: "assignProjectList",
              target: "setDefaultProject",
            },
            onError: {
              target: "end",
            },
          },
        },
        setDefaultProject: {
          always: {
            actions: "assignDefaultProject",
            target: ["#main.countryGroup.getCountryList", "end"],
          },
        },
        end: {
          on: {
            projectGroupChanged: {
              actions: "updateDefaultProjectGroup",
              target: "getProjectList",
            },
          },
        },
      },
    },
    countryGroup: {
      states: {
        getCountryList: {
          invoke: {
            id: "getCountryList",
            src: "invokeGetCountryList",
            onDone: {
              actions: "assignCountryList",
              target: "setDefaultCountry",
            },
            onError: {
              target: "end",
            },
          },
        },
        setDefaultCountry: {
          always: {
            actions: "assignDefaultCountry",
            target: ["#main.versionGroup.getVersionList", "end"],
          },
        },
        end: {
          on: {
            projectChanged: {
              actions: "updateDefaultProject",
              target: "getCountryList",
            },
          },
        },
      },
    },
    versionGroup: {
      states: {
        getVersionList: {
          invoke: {
            id: "getVersionList",
            src: "invokeGetVersionList",
            onDone: {
              actions: "assignVersionList",
              target: "setDefaultVersion",
            },
            onError: {
              target: "end",
            },
          },
        },
        setDefaultVersion: {
          always: {
            actions: "assignDefaultVersion",
            target: ["#main.versionDataGroup.getVersionData", "end"],
          },
        },
        end: {
          on: {
            countryChanged: {
              actions: "updateDefaultCountry",
              target: "getVersionList",
            },
          },
        },
      },
    },
    versionDataGroup: {
      states: {
        getVersionData: {
          invoke: {
            id: "getVersionData",
            src: "invokeGetVersionData",
            onDone: {
              actions: "assignVersionData",
              target: "end",
            },
            onError: {
              target: "end",
            },
          },
        },
        createNewVersionNotes: {
          invoke: {
            id: "createNewVersionNotes",
            src: "invokeCreateNewVersionNotes",
            onDone: {
              target: "getVersionData",
            },
            onError: {
              target: "end",
            },
          },
        },
        end: {
          on: {
            versionChanged: {
              actions: "updateDefaultVersion",
              target: "getVersionData",
            },
            newVersionNotes: {
              actions: "assignNewVersionNotes",
              target: "createNewVersionNotes",
            },
          },
        },
      },
    },
  },
});

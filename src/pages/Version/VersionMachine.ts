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
    versionTypeList: [],
    newVersionNotes: undefined,
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
            target: ["#main.versionGroup.getVersionList", "end"],
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
    versionGroup: {
      states: {
        getVersionList: {
          invoke: {
            id: "getVersionList",
            src: "invokeGetVersionList",
            onDone: {
              actions: "assignVersionList",
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
              target: "getVersionList",
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
              target: "getVersionList",
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

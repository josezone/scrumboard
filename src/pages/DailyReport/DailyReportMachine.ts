import { createMachine } from "xstate";

export const dailyReportMachine = createMachine<any>({
  id: "main",
  type: "parallel",
  initial: "projectGroup",
  context: {
    dailyReport: undefined,
    scrumName: undefined,
    projectGroupList: undefined,
    selectedProjectGroup: undefined,
  },
  states: {
    projectGroup: {
      initial: "getProjectGroupList",
      states: {
        getProjectGroupList: {
          invoke: {
            id: "getProjectGroupList",
            src: "invokeGetProjectGroupList",
            onDone: {
              actions: "assignProjectGroupList",
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
            target: "getDailyReport",
          },
        },
        getDailyReport: {
          invoke: {
            id: "initial",
            src: "invokeGetDailyReport",
            onDone: {
              actions: "assignDailyReport",
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
    changeGroup: {
      initial: "idle",
      states: {
        idle: {
          on: {
            changeProjectGroup: {
              actions: "updateProjectGroup",
              target: "#main.projectGroup.getDailyReport",
            },
          },
        },
      },
    },
  },
});

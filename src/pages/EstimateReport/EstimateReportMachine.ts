import { createMachine } from "xstate";

export const estimateReportMachine = createMachine<any>({
  id: "main",
  type: "parallel",
  initial: "projectGroup",
  context: {
    estimateReport: undefined,
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
            target: "getEstimateReport",
          },
        },
        getEstimateReport: {
          invoke: {
            id: "initial",
            src: "invokeGetEstimateReport",
            onDone: {
              actions: "assignEstimateReport",
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
              target: "#main.projectGroup.getEstimateReport",
            },
          },
        },
      },
    },
  },
});

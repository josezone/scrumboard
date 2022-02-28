import { createMachine } from "xstate";

export const dailyReportMachine = createMachine<any>({
  id: "main",
  initial: "getDailyReport",
  context: {
    dailyReport: undefined,
    scrumName: undefined
  },
  states: {
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
});

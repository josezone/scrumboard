import { createMachine } from "xstate";

export const estimateReportMachine = createMachine<any>({
  id: "main",
  initial: "getEstimateReport",
  context: {
    estimateReport: undefined,
  },
  states: {
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
});

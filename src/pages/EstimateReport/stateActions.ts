import { assign } from "xstate";

const assignEstimateReport = assign({
  estimateReport: (context: any, event: any) => {
    return event.data.bugs;
  },
  // scrumName: (context: any, event: any) => {
  //   return event?.data?.scrum[0]?.scrum || "";
  // },
});

export const actions = {
  assignEstimateReport,
};

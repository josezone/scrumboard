import { assign } from "xstate";

const assignDailyReport = assign({
  dailyReport: (context: any, event: any) => {
    return event.data.bugs;
  },
  scrumName: (context: any, event: any) => {
    return event?.data?.scrum[0]?.scrum || "";
  },
});

export const actions = {
  assignDailyReport,
};

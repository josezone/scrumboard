import { assign } from "xstate";

const assignDailyReport = assign({
  dailyReport: (context: any, event: any) => {
    return event.data.bugs;
  },
});

export const actions = {
  assignDailyReport,
};

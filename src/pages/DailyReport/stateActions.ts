import { assign } from "xstate";
import { assignProjectGroupList, updateProjectGroup, assignDefaultProjectGroup } from "../Estimate/stateActions";

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
  updateProjectGroup,
  assignProjectGroupList,
  assignDefaultProjectGroup
};

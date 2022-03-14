import { assignResourceList } from "../Home/stateActions";
import { assign } from "xstate";

const assignNewBug = assign({
  newBug: (context: any, event: any) => {
    return event.data;
  },
});

const assignBugList = assign({
  bugList: (context: any, event: any) => {
    return event.data.bugs;
  },
});

const assignReport = assign({
  updateBugReport: (context: any, event: any) => {
    return event.data;
  },
  bugList: (context: any, event: any) => {
    return context.bugList.map((bug: any) => {
      if (bug.id === event.data.bug) {
        bug.report = event.data.report;
        return bug;
      } else {
        return bug;
      }
    });
  },
});

const assignRemoveBug = assign({
  removeBug: (context: any, event: any) => {
    return event.data;
  },
});

const assignDeleteBug = assign({
  bugList: (context: any, event: any) => {
    return context.bugList.filter((bug: any) => {
      return bug.id !== event.data.delete_bugs.returning[0].id;
    });
  },
});

const assignTicketInfo = assign({
  ticketInfo: (context: any, event: any) => {
    return event?.data?.ticket_by_pk || {};
  },
})

const assignToggleModal = assign({
  newBugModal: (context: any, event: any) => {
    return !Boolean(context.newBugModal)
  },
})

export const actions = {
  assignDeleteBug,
  assignRemoveBug,
  assignReport,
  assignNewBug,
  assignResourceList,
  assignBugList,
  assignTicketInfo,
  assignToggleModal
};

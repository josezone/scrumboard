import { assign } from "xstate";

const assignTicketList = assign({
    ticketList: (context: any, event: any) => {
        return event.data.ticket;
    },
});

const removeTicketAction = assign({
    ticketList: (context: any, event: any) => {
        return context.ticketList.filter((item: any) => item.id !== context.selectedTicketId);
    },
});

const assignEstimateList = assign({
    estimateList: (context: any, event: any) => {
        return event.data["estimation_limit"];
    },
});

export const actions = {
    assignTicketList,
    removeTicketAction,
    assignEstimateList
}
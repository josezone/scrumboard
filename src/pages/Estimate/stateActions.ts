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

export const actions = {
    assignTicketList,
    removeTicketAction
}
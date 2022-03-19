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

const assignPoints = assign({
    estimateList: (context: any, event: any) => {
        return context.estimateList.filter((estimate: any) => {
            if (estimate.id === event.data.id) {
                estimate.story = event.data.story;
            }
            return estimate;
        })
    },
    updatedPoint: (context: any, event: any) => {
        return event.data;
    },
});

export const assignProjectGroupList = assign({
    projectGroupList: (context: any, event: any) => {
        return event.data["project_group"];
    }
})

export const assignDefaultProjectGroup = assign({
    selectedProjectGroup: (context: any, event: any) => {
        return context.projectGroupList[0];
    }
})

export const updateProjectGroup = assign({
    selectedProjectGroup: (context: any, event: any) => {
        return context.projectGroupList.filter((item: any) => item.id === event.data)[0];
    }
})


export const actions = {
    assignTicketList,
    removeTicketAction,
    assignEstimateList,
    assignPoints,
    assignProjectGroupList,
    assignDefaultProjectGroup,
    updateProjectGroup
}
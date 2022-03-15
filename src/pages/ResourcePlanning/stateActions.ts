import { assign } from "xstate";

const assignResourceList = assign({
    resourceList: (context: any, event: any) => {
        return event.data.resource;
    },
});

const assignScrumList = assign({
    scrumList: (context: any, event: any) => {
        return event.data.scrum;
    },
});

const selectDefaultScrum = assign({
    scrumSelected: (context: any, event: any) => {
        if (context.scrumList.length) {
            let selectedScrum = context.scrumList.filter((scrum: any) => scrum.active);
            if (selectedScrum && selectedScrum.length) {
                return selectedScrum[0];
            }
            selectedScrum = context.scrumList.reduce(function (prev: any, current: any) {
                const newPrev = (new Date(prev.scrum)).getTime();
                const newCur = (new Date(current.scrum)).getTime();
                return (newPrev > newCur) ? prev : current
            });
            return selectedScrum
        }

        return {
            id: "",
            scrum: ""
        }
    },
});

const updateDefaultScrum = assign({
    scrumSelected: (context: any, event: any) => {
        return event.data;
    },
});

const assignProjectGroupList = assign({
    projectGroupList: (context: any, event: any) => {
        return event.data["project_group"];
    },
});

const selectDefaultProjectGroup = assign({
    projectGroup: (context: any, event: any) => {
        return context.projectGroupList[0];
    },
});

const updateDefaultProjectGroup = assign({
    projectGroup: (context: any, event: any) => {
        return event.data;
    },
});

const assignResourcePlan = assign({
    resourcePlan: (context: any, event: any) => {
        return event.data["resource_plan"];
    },
})

export const actions = {
    selectDefaultProjectGroup,
    assignResourceList,
    assignScrumList,
    assignProjectGroupList,
    updateDefaultProjectGroup,
    selectDefaultScrum,
    updateDefaultScrum,
    assignResourcePlan
}
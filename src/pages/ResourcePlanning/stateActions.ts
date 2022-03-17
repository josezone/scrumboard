import { assign } from "xstate";
import { initPlannedLeaveData } from "../../constants/constants";

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

const assignProjectList = assign({
    projectList: (context: any, event: any) => {
        return event.data.project;
    },
})

const assignScrumResourceProject = assign({
    scrumResourceProject: (context: any, event: any) => {
        return event.data["scrum_resource_project"];
    },
})

const assignPlanedLeavePopupEnable = assign({
    assignPlanedLeavePopup: (context: any, event: any) => {
        return {
            ...context.assignPlanedLeavePopup,
            [event.data]: true
        };
    },
    plannedLeaveData: () => initPlannedLeaveData
})

const assignPlanedLeavePopupDisable = assign({
    assignPlanedLeavePopup: (context: any, event: any) => {
        return false;
    },
})

const assignPlannedLeave = assign({
    plannedLeaveData: (context: any, event: any) => {
        console.log(event.data)
        return event.data
    },
})

const onDragEnd = assign({
    scrumResourceProject: (context: any, event: any) => {
        if (event.data.moveFrom !== "Unassigned" && event.data.moveTo === "Unassigned") {
            return context.scrumResourceProject.filter((item: any) => item.resource.resource !== event.data.moveItem);
        }
        if (event.data.moveFrom !== "Unassigned" && event.data.moveTo !== "Unassigned") {
            const movableItem = context.scrumResourceProject.filter((item: any) => item.resource.resource === event.data.moveItem)[0];
            const entryRemoved = context.scrumResourceProject.filter((item: any) => item.resource.resource !== event.data.moveItem);
            const destinationProject = context.projectList.filter((project: any) => project.project === event.data.moveTo)[0];
            movableItem.project = destinationProject;
            return [...entryRemoved, movableItem]
        }
        // const destinationProject = context.projectList.filter((project: any) => project.project === event.data.moveTo)[0];
        // const destinationResource = context.resourceList.filter((resource: any) => resource.resource === event.data.moveItem)[0];
        // return [...context.scrumResourceProject, { resource: destinationResource, project: destinationProject }];
    },
    removeScrumResourceProject: (context: any, event: any) => {
        if (event.data.moveFrom !== "Unassigned" && event.data.moveTo === "Unassigned") {
            const result = context.scrumResourceProject.filter((item: any) => item.resource.resource === event.data.moveItem)[0].id;
            return result;
        }
    },
    updateScrumResourceProject: (context: any, event: any) => {
        if (event.data.moveFrom !== "Unassigned" && event.data.moveTo !== "Unassigned") {
            const movableItemList = context.scrumResourceProject.filter((item: any) => item.resource.resource === event.data.moveItem);
            const destinationProject = context.projectList.filter((project: any) => project.project === event.data.moveTo);
            const result = {
                itemMoveId: movableItemList[0].id,
                projectId: destinationProject[0].id
            }
            return result;
        }
    },
    insertScrumResourceProject: (context: any, event: any) => {
        if (event.data.moveFrom === "Unassigned" && event.data.moveTo !== "Unassigned") {
            const projectId = context.projectList.filter((project: any) => project.project === event.data.moveTo)[0].id;
            const resourceId = context.resourceList.filter((resource: any) => resource.resource === event.data.moveItem)[0].id;
            const result = {
                projectId,
                resourceId
            }
            return result;
        }
    }
})

export const actions = {
    selectDefaultProjectGroup,
    assignResourceList,
    assignScrumList,
    assignProjectGroupList,
    updateDefaultProjectGroup,
    selectDefaultScrum,
    updateDefaultScrum,
    assignResourcePlan,
    assignProjectList,
    assignScrumResourceProject,
    onDragEnd,
    assignPlanedLeavePopupEnable,
    assignPlanedLeavePopupDisable,
    assignPlannedLeave
}
import { assign } from "xstate";
import groupArray from "group-array";

const assignSprintReportSuccess = assign({
    sprintReportList: (context: any, event: any) => {
        const sprints = event?.data?.scrum[0]?.sprints || [];
        return groupArray(sprints, "project.project") || {}
    },
    loading: false,
    sprintName:  (context: any, event: any) => {
        const scrum = event?.data?.scrum[0] || {};
        return scrum.scrum || null;
    },
});

const assignLoader = assign({
    loading: (context: any, event: any) => {
        return true
    },
})

const assignSprintReportFaild = assign({
    sprintReportList: (context: any, event: any) => {
        return [];
    },
    loading: false
});

export const actions = {
    assignSprintReportSuccess,
    assignLoader,
    assignSprintReportFaild
}
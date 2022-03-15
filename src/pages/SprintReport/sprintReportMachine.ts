import { createMachine } from "xstate";

export enum SprintReportMachineEvents {
    INVOKE_GET_SPRINT_REPORT = "INVOKE_GET_SPRINT_REPORT"
}


export const SprintReportMachine = createMachine<any, any, any>({
    id: "SprintReportMachine",
    initial: "idle",
    context: {
        sprintReportList: {},
        loading: true,
        sprintName: null
    },
    states: {
        idle: {
            on: {
                [SprintReportMachineEvents.INVOKE_GET_SPRINT_REPORT]: {
                    target: "GET_SPRINT_LIST",
                    actions: "assignLoader"
                }
            }
        },
        GET_SPRINT_LIST: {
            invoke: {
                src: "getSprintReport",
                onDone: {
                    target: "idle",
                    actions: "assignSprintReportSuccess"
                },
                onError: {
                    target: "idle",
                    actions: "assignSprintReportFaild"
                }
            }
        }
    }
});




import { createMachine } from "xstate";

export const SprintReportMachine = createMachine<any, any, any>({
    id: "SprintReportMachine",
    initial:"mainGroup",
    type: "parallel",
    context: {
        sprintReportList: {},
        sprintName: null,
        projectGroup: undefined,
        projectGroupList: undefined,
        scrumSelected: undefined,
        scrumList: undefined,
    },
    states: {
        changeGroup: {
            initial: "idle",
            states: {
                idle: {
                    on: {
                        changeProjectGroup: {
                            actions: "updateProjectGroup",
                            target: "#SprintReportMachine.mainGroup.scrumList",
                        },
                        changeScrum: {
                            actions: "updateDefaultScrum",
                            target: "#SprintReportMachine.mainGroup.getSprintList",
                        },
                    },
                },
            },
        },
        mainGroup: {
            initial: "idle",
            states: {
                idle: {
                    always: {
                        target: "getProjectGroupList",
                    },
                },
                getProjectGroupList: {
                    invoke: {
                        id: "getProjectGroupList",
                        src: "invokeGetProjectGroupList",
                        onDone: {
                            actions: "assignProjectGroupList",
                            target: "setDefaultProjectGroup",
                        },
                        onError: {
                            target: "end",
                        },
                    },
                },
                setDefaultProjectGroup: {
                    always: {
                        actions: "assignDefaultProjectGroup",
                        target: "scrumList",
                    },
                },
                scrumList: {
                    invoke: {
                        id: "scrumList",
                        src: "invokeGetScrumList",
                        onDone: {
                            actions: "assignScrumList",
                            target: "defaultScrum",
                        },
                        onError: {
                            target: "end",
                        },
                    },
                },
                defaultScrum: {
                    always: {
                        actions: "selectDefaultScrum",
                        target: "getSprintList",
                    },
                },
                getSprintList: {
                    invoke: {
                        src: "getSprintReport",
                        onDone: {
                            target: "end",
                            actions: "assignSprintReportSuccess",
                        },
                        onError: {
                            target: "end",
                            actions: "assignSprintReportFaild",
                        },
                    },
                },
                end: {
                    type: "final",
                },
            },
        },
    },
});

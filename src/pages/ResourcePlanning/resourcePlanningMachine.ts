import { createMachine } from "xstate";

export const resourcePlanningMachine = createMachine<any>({
    id: "main",
    type: "parallel",
    initial: "idle",
    context: {
        projectList: [],
        resourcePlan: undefined,
        projectGroup: undefined,
        projectGroupList: undefined,
        scrumSelected: undefined,
        scrumList: undefined,
        resourceList: undefined,
        scrumResourceProject: undefined
    },
    on: {
        planLeave: {
            actions: "assignPlanedLeave",
            target: "estimateActions.initPlannedLeave",
        },
        planHalfLeave: {
            actions: "assignPlanedHalfLeave",
            target: "estimateActions.initPlannedHalfLeave",
        },
        leaveTaken: {
            actions: "assignLeaveTaken",
            target: "estimateActions.initLeaveTaken",
        },
        emergencyLeave: {
            actions: "assignEmergencyLeave",
            target: "estimateActions.initUnplannedLeave",
        },
        emergencyHalfLeave: {
            actions: "assignEmergencyHalfLeave",
            target: "estimateActions.initUnplannedHalfLeave",
        },
        changeProjectGroup: {
            actions: "updateDefaultProjectGroup",
            target: [
                "getInitialData.getProjectGroupList.projectGroupChanged.firstGroup.scrumList",
                "getInitialData.getProjectGroupList.projectGroupChanged.secondGroup.getProjectList",
            ],
        },
        changeScrum: {
            actions: "updateDefaultScrum",
            target: [
                "getInitialData.getProjectGroupList.projectGroupChanged.firstGroup.scrumChanged.groupOne.getResourcePlan",
                "getInitialData.getProjectGroupList.projectGroupChanged.firstGroup.scrumChanged.groupTwo.getScrumResourceProject",
            ],
        },
    },
    states: {
        idle: {
            on: {
                always: {
                    target: [
                        "getInitialData.getResourceList",
                        "getInitialData.getProjectGroupList",
                    ],
                },
            },
        },
        getInitialData: {
            type: "parallel",
            states: {
                getResourceList: {
                    initial: "resourceList",
                    states: {
                        resourceList: {
                            invoke: {
                                id: "resourceList",
                                src: "invokeResourceList",
                                onDone: {
                                    actions: "assignResourceList",
                                    target: "end",
                                },
                                onError: {
                                    target: "end",
                                },
                            },
                        },
                        end: {
                            type: "final",
                        },
                    },
                },
                getProjectGroupList: {
                    initial: "projectGroupList",
                    states: {
                        projectGroupList: {
                            invoke: {
                                id: "projectGroupList",
                                src: "invokeProjectGroupList",
                                onDone: {
                                    actions: "assignProjectGroupList",
                                    target: "defaultProjectGroup",
                                },
                                onError: {
                                    target: "end",
                                },
                            },
                        },
                        defaultProjectGroup: {
                            always: {
                                actions: "selectDefaultProjectGroup",
                                target: [
                                    "projectGroupChanged.firstGroup.scrumList",
                                    "projectGroupChanged.secondGroup.getProjectList",
                                ],
                            },
                        },
                        projectGroupChanged: {
                            type: "parallel",
                            states: {
                                secondGroup: {
                                    states: {
                                        getProjectList: {
                                            invoke: {
                                                id: "getProjectList",
                                                src: "getProjectList",
                                                onDone: {
                                                    actions: "assignProjectList",
                                                    target: "end",
                                                },
                                                onError: {
                                                    target: "end",
                                                },
                                            },
                                        },
                                        end: {
                                            type: "final",
                                        },
                                    },
                                },
                                firstGroup: {
                                    states: {
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
                                                target: [
                                                    "scrumChanged.groupOne.getResourcePlan",
                                                    "scrumChanged.groupTwo.getScrumResourceProject",
                                                ],
                                            },
                                        },
                                        scrumChanged: {
                                            type: "parallel",
                                            states: {
                                                groupTwo: {
                                                    states: {
                                                        getScrumResourceProject: {
                                                            invoke: {
                                                                id: "getScrumResourceProject",
                                                                src: "invokeScrumResourceProject",
                                                                onDone: {
                                                                    actions: "assignScrumResourceProject",
                                                                    target: "end",
                                                                },
                                                                onError: {
                                                                    target: "end",
                                                                },
                                                            },
                                                        },
                                                        end: {
                                                            type: "final",
                                                        },
                                                    },
                                                },
                                                groupOne: {
                                                    states: {
                                                        getResourcePlan: {
                                                            invoke: {
                                                                id: "resourcePlan",
                                                                src: "invokeResourcePlan",
                                                                onDone: {
                                                                    actions: "assignResourcePlan",
                                                                    target: "end",
                                                                },
                                                                onError: {
                                                                    target: "end",
                                                                },
                                                            },
                                                        },
                                                        end: {
                                                            type: "final",
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                        end: {
                                            type: "final",
                                        },
                                    },
                                },
                            },
                        },
                        end: {
                            type: "final",
                        },
                    },
                },
            },
        },
        estimateActions: {
            type: "parallel",
            states: {
                initPlannedLeave: {
                    initial: "createPlannedLeave",
                    states: {
                        createPlannedLeave: {
                            invoke: {
                                id: "createPlannedLeave",
                                src: "invokePlannedLeave",
                                onDone: {
                                    actions: "assignPlannedLeave",
                                    target: "end",
                                },
                                onError: {
                                    target: "end",
                                },
                            },
                        },
                        end: {
                            type: "final",
                        },
                    },
                },
                initPlannedHalfLeave: {
                    initial: "createHalfPlannedLeave",
                    states: {
                        createHalfPlannedLeave: {
                            invoke: {
                                id: "createHalfPlannedLeave",
                                src: "invokeHalfPlannedLeave",
                                onDone: {
                                    actions: "assignHalfPlannedLeave",
                                    target: "end",
                                },
                                onError: {
                                    target: "end",
                                },
                            },
                        },
                        end: {
                            type: "final",
                        },
                    },
                },
                initLeaveTaken: {
                    initial: "createLeaveTaken",
                    states: {
                        createLeaveTaken: {
                            invoke: {
                                id: "createLeaveTaken",
                                src: "invokeLeaveTaken",
                                onDone: {
                                    actions: "assignLeaveTaken",
                                    target: "end",
                                },
                                onError: {
                                    target: "end",
                                },
                            },
                        },
                        end: {
                            type: "final",
                        },
                    },
                },
                initUnplannedLeave: {
                    initial: "createUnplannedLeave",
                    states: {
                        createUnplannedLeave: {
                            invoke: {
                                id: "createUnplannedLeave",
                                src: "invokeUnplannedLeave",
                                onDone: {
                                    actions: "assignUnplannedLeave",
                                    target: "end",
                                },
                                onError: {
                                    target: "end",
                                },
                            },
                        },
                        end: {
                            type: "final",
                        },
                    },
                },
                initUnplannedHalfLeave: {
                    initial: "createHalfUnplannedLeave",
                    states: {
                        createHalfUnplannedLeave: {
                            invoke: {
                                id: "createHalfUnplannedLeave",
                                src: "invokeHalfUnplannedLeave",
                                onDone: {
                                    actions: "assignHalfUnplannedLeave",
                                    target: "end",
                                },
                                onError: {
                                    target: "end",
                                },
                            },
                        },
                        end: {
                            type: "final",
                        },
                    },
                },
            },
        },
    },
});

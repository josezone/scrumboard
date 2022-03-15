import { createMachine } from "xstate";

export const resourcePlanningMachine = createMachine<any>({
    id: "main",
    type: "parallel",
    initial: "idle",
    on: {
        planLeave: {
            actions: "assignPlanedLeave",
            target: "estimateActions.initPlannedLeave.createPlannedLeave",
        },
        planHalfLeave: {
            actions: "assignPlanedHalfLeave",
            target: "estimateActions.initPlannedHalfLeave.createHalfPlannedLeave",
        },
        leaveTaken: {
            actions: "assignLeaveTaken",
            target: "estimateActions.initLeaveTaken.createLeaveTaken",
        },
        emergencyLeave: {
            actions: "assignEmergencyLeave",
            target: "estimateActions.initUnplannedLeave.createUnplannedLeave",
        },
        emergencyHalfLeave: {
            actions: "assignEmergencyHalfLeave",
            target: "estimateActions.initUnplannedHalfLeave.createHalfUnplannedLeave",
        },
    },
    states: {
        idle: {
            on: {
                always: {
                    target: [
                        "getInitialData.getResourceList",
                        "getInitialData.getScrumList",
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
                getScrumList: {
                    initial: "scrumList",
                    states: {
                        scrumList: {
                            invoke: {
                                id: "scrumList",
                                src: "invokeGetScrumList",
                                onDone: {
                                    actions: ["assignScrumList", "selectDefaultScrum"],
                                    target: "getResourcePlan",
                                },
                                onError: {
                                    target: "end",
                                },
                            },
                        },
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
        estimateActions: {
            type: "parallel",
            states: {
                initPlannedLeave: {
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

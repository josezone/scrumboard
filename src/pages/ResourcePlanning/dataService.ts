import { gql } from "graphql-request";
import { useMutation } from "react-query";

function useInvokeResourceList(graphQLClient: any) {
    return useMutation(() => {
        return graphQLClient.request(gql`
                    query MyQuery {
                        resource(where: {status: {_eq: true}}) {
                            id
                            resource
                            resource_type {
                            id
                            resource_type
                            }
                        }
                    }
              `);
    });
}

function useInvokeGetScrumList(graphQLClient: any) {
    return useMutation((projectGroupId: number) => {
        return graphQLClient.request(gql`
                    query MyQuery {
                        scrum(order_by: {scrum: desc}, where: {project_group_id: {_eq: ${projectGroupId}}}) {
                            id
                            active
                            scrum
                        }
                    }
              `);
    });
}

function useInvokeProjectGroupList(graphQLClient: any) {
    return useMutation(() => {
        return graphQLClient.request(gql`
            query MyQuery {
                project_group {
                    name
                    id
                }
            }
        `);
    });
}


function useInvokeResourcePlan(graphQLClient: any) {
    return useMutation((scrumId) => {
        return graphQLClient.request(gql`
            query MyQuery {
                resource_plan(where: {scrum_id: {_eq: ${scrumId}}}) {
                    id
                    planned_leave
                    planned_half_day
                    leave_taken
                    unplanned_half_day
                    unplanned_leave
                    resource {
                        id
                        resource
                        resource_type {
                            id
                            resource_type
                        }
                        scrum_resource_projects {
                            project {
                                id
                                project
                            }
                        }
                    }
                }
            }
        `);
    });
}

function useGetProjectList(graphQLClient: any) {
    return useMutation((projectGroupId: number) => {
        return graphQLClient.request(gql`
        query MyQuery {
                project(where: {project_group_id: {_eq: ${projectGroupId}}}) {
                    id
                    project
                }
            }
        `);
    });
}

function useInvokeScrumResourceProject(graphQLClient: any) {
    return useMutation((scrumId) => {
        return graphQLClient.request(gql`
            query MyQuery {
                scrum_resource_project(where: {scrum_id: {_eq: ${scrumId}}}) {
                    id
                    story
                    project {
                        id
                        project
                    }
                    resource {
                        id
                        resource
                    }
                }
            }

        `);
    });
}

function useInvokeRemoveScrumResourceProject(graphQLClient: any) {
    return useMutation((removeScrumResourceProjectId: number) => {
        return graphQLClient.request(gql`
            mutation MyMutation {
                delete_scrum_resource_project(where: {id: {_eq: "${removeScrumResourceProjectId}"}}) {
                    returning {
                        id
                    }
                }
            }
        `);
    });
}

function useInvokeInsertScrumResourceProject(graphQLClient: any) {
    return useMutation(({ projectId, resourceId, scrumId }: { projectId: number, resourceId: number, scrumId: number }) => {
        return graphQLClient.request(gql`
        mutation MyMutation {
            insert_scrum_resource_project(objects: {project_id: ${projectId}, resource_id: ${resourceId}, scrum_id: ${scrumId}}) {
                    returning {
                        id
                    }
                }
            }
        `);
    });
}

function useInvokeUpdateScrumResourceProject(graphQLClient: any) {
    return useMutation(({ projectId, itemMoveId }: any) => {
        return graphQLClient.request(gql`
        mutation MyMutation {
            update_scrum_resource_project(where: {id: {_eq: "${itemMoveId}"}}, _set: {project_id: ${projectId}}) {
                    returning {
                        id
                    }
                }
            }
        `);
    });
}

function useInvokePlannedLeave(graphQLClient: any) {
    return useMutation(({ leaveDate, resource, scrumId }: any) => {
        return graphQLClient.request(gql`
        mutation MyMutation {
            insert_resource_plan(objects: {planned_leave: "${leaveDate.toISOString()}", user_id: ${resource}, scrum_id: ${scrumId}}) {
                    returning {
                        id
                    }
                }
            }
        `);
    });
}

function useInvokeUnplannedLeave(graphQLClient: any) {
    return useMutation(({ leaveDate, resource, scrumId }: any) => {
        return graphQLClient.request(gql`
        mutation MyMutation {
            insert_resource_plan(objects: {unplanned_leave: "${leaveDate.toISOString()}", user_id: ${resource}, scrum_id: ${scrumId}}) {
                    returning {
                        id
                    }
                }
            }
        `);
    });
}

function useInvokeHalfUnplannedLeave(graphQLClient: any) {
    return useMutation(({ planId, val }: any) => {
        return graphQLClient.request(gql`
        mutation MyMutation {
            update_resource_plan(where: {id: {_eq: "${planId}"}}, _set: {unplanned_half_day: ${val}}) {
                    returning {
                        id
                    }
                }
            }
        `);
    });
}

function useInvokeHalfPlannedLeave(graphQLClient: any) {
    return useMutation(({ planId, val }: any) => {
        return graphQLClient.request(gql`
        mutation MyMutation {
            update_resource_plan(where: {id: {_eq: "${planId}"}}, _set: {planned_half_day: ${val}}) {
                    returning {
                        id
                    }
                }
            }
        `);
    });
}

function useInvokeLeaveTaken(graphQLClient: any) {
    return useMutation(({ planId, val }: any) => {
        return graphQLClient.request(gql`
        mutation MyMutation {
            update_resource_plan(where: {id: {_eq: "${planId}"}}, _set: {leave_taken: ${val}}) {
                returning {
                        id
                    }
                }
            }
        `);
    });
}

function useInvokeAlterStoryPoint(graphQLClient: any) {
    return useMutation(({ storyPoint, id }: any) => {
        return graphQLClient.request(gql`
        mutation MyMutation {
            update_scrum_resource_project(where: {id: {_eq: "${id}"}}, _set: {story: ${storyPoint}}) {
                    returning {
                        id
                    }
                }
            }
        `);
    });
}

export const useServices = (props: any) => {

    const { mutateAsync: invokeResourceList } = useInvokeResourceList(
        props.graphQLClient
    );

    const { mutateAsync: invokeGetScrumList } = useInvokeGetScrumList(
        props.graphQLClient
    );

    const { mutateAsync: invokeProjectGroupList } = useInvokeProjectGroupList(
        props.graphQLClient
    );

    const { mutateAsync: invokeResourcePlan } = useInvokeResourcePlan(
        props.graphQLClient
    );

    const { mutateAsync: getProjectList } = useGetProjectList(
        props.graphQLClient
    );

    const { mutateAsync: invokeScrumResourceProject } = useInvokeScrumResourceProject(
        props.graphQLClient
    );

    const { mutateAsync: invokeRemoveScrumResourceProject } = useInvokeRemoveScrumResourceProject(
        props.graphQLClient
    );

    const { mutateAsync: invokeInsertScrumResourceProject } = useInvokeInsertScrumResourceProject(
        props.graphQLClient
    );
    const { mutateAsync: invokePlannedLeave } = useInvokePlannedLeave(
        props.graphQLClient
    );

    const { mutateAsync: invokeUnplannedLeave } = useInvokeUnplannedLeave(
        props.graphQLClient
    );

    const { mutateAsync: invokeHalfUnplannedLeave } = useInvokeHalfUnplannedLeave(
        props.graphQLClient
    );

    const { mutateAsync: invokeUpdateScrumResourceProject } = useInvokeUpdateScrumResourceProject(
        props.graphQLClient
    );

    const { mutateAsync: invokeHalfPlannedLeave } = useInvokeHalfPlannedLeave(
        props.graphQLClient
    );

    const { mutateAsync: invokeLeaveTaken } = useInvokeLeaveTaken(
        props.graphQLClient
    );

    const { mutateAsync: invokeAlterStoryPoint } = useInvokeAlterStoryPoint(
        props.graphQLClient
    );

    return {
        invokeResourceList: () => invokeResourceList(),
        invokeGetScrumList: (context: any) => invokeGetScrumList(context.projectGroup.id),
        invokeProjectGroupList: () => invokeProjectGroupList(),
        invokeResourcePlan: (context: any) => invokeResourcePlan(context.scrumSelected.id),
        getProjectList: (context: any) => getProjectList(context.projectGroup.id),
        invokeScrumResourceProject: (context: any) => invokeScrumResourceProject(context.scrumSelected.id),
        invokeRemoveScrumResourceProject: (context: any) => invokeRemoveScrumResourceProject(context.removeScrumResourceProject),
        invokeInsertScrumResourceProject: (context: any) => invokeInsertScrumResourceProject({
            projectId: context.insertScrumResourceProject.projectId,
            resourceId: context.insertScrumResourceProject.resourceId,
            scrumId: context.scrumSelected.id
        }),
        invokeUpdateScrumResourceProject: (context: any) => invokeUpdateScrumResourceProject({
            projectId: context.updateScrumResourceProject.projectId,
            itemMoveId: context.updateScrumResourceProject.itemMoveId,
        }),
        invokePlannedLeave: (context: any) => invokePlannedLeave({ ...context.plannedLeaveData }),
        invokeUnplannedLeave: (context: any) => invokeUnplannedLeave({ ...context.unplannedLeaveData }),
        invokeHalfPlannedLeave: (context: any) => invokeHalfPlannedLeave({ ...context.halfPlanData }),
        invokeHalfUnplannedLeave: (context: any) => invokeHalfUnplannedLeave({ ...context.halfUnplannedData }),
        invokeLeaveTaken: (context: any) => invokeLeaveTaken({ ...context.leaveTakenData }),
        invokeAlterStoryPoint: (context: any) => invokeAlterStoryPoint({ ...context.storyPointUpdateData }),
    }
}
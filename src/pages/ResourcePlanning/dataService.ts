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

function useInvokeCreateResourcePlan(graphQLClient: any) {
    return useMutation((scrumId) => {
        return graphQLClient.request(gql`
                `);
    });
}

function useInvokePlannedLeave(graphQLClient: any) {
    return useMutation(() => {
        return graphQLClient.request(gql`
              `);
    });
}

function useInvokeHalfPlannedLeave(graphQLClient: any) {
    return useMutation(() => {
        return graphQLClient.request(gql`
              `);
    });
}

function useInvokeLeaveTaken(graphQLClient: any) {
    return useMutation(() => {
        return graphQLClient.request(gql`
              `);
    });
}

function useInvokeUnplannedLeave(graphQLClient: any) {
    return useMutation(() => {
        return graphQLClient.request(gql`
              `);
    });
}

function useInvokeHalfUnplannedLeave(graphQLClient: any) {
    return useMutation(() => {
        return graphQLClient.request(gql`
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

    const { mutateAsync: invokeUpdateScrumResourceProject } = useInvokeUpdateScrumResourceProject(
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
    }
}
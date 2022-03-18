import { gql } from "graphql-request";
import { useMutation } from "react-query";

function useInvokeRemoveTicket(graphQLClient: any) {
    return useMutation(({ ticketId }: any) => {
        return graphQLClient.request(gql`
            mutation MyMutation {
                update_ticket(where: {id: {_eq: ${ticketId}}}, _set: {estimation: false}) {
                    returning {
                        id
                    }
                }
            }
        `);
    });
}

function useEstimateDate(graphQLClient: any) {
    return useMutation(() => {
        return graphQLClient.request(gql`
            query MyQuery {
                estimation_limit(distinct_on: estimate_date) {
                estimate_date
                }
            }
        `);
    });
}


function useEstimateLimit(graphQLClient: any) {
    return useMutation(() => {
        return graphQLClient.request(gql`
            query MyQuery {
                estimation_limit {
                    id
                    story
                    resource_type {
                        id
                        resource_type
                    }
                    project {
                        id
                        project
                    }
                }
            }
        `);
    });
}

function useInvokeGetTicketsList(graphQLClient: any) {
    return useMutation((projectGroup) => {
        return graphQLClient.request(gql`
           query MyQuery {
            ticket(where: {estimation: {_eq: true}, sprint: {project: {project_group_id: {_eq: ${projectGroup}}}}}) {
                    be_spill
                    be_story
                    fe_spill
                    fe_story
                    id
                    qa_spill
                    qa_story
                    spill
                    ticket
                    priority {
                    colorCode
                    id
                    priority
                    }
                    scope {
                    id
                    scope
                    }
                    sprint {
                    id
                    sprint
                    project {
                        id
                        project
                    }
                    country {
                        country
                        id
                    }
                    }
                    version {
                    id
                    version
                    }
                    status {
                    id
                    status
                    }
                    ticket_resources {
                    story
                    resource {
                        resource
                        id
                    }
                    }
                }
            }
      `);
    });
}

export function useInvokeUpdatePoints(graphQLClient: any) {
    return useMutation(({ id, story }: any) => {
        return graphQLClient.request(gql`
            mutation MyMutation {
                update_estimation_limit(where: {id: {_eq: ${id}}}, _set: {story: ${story}}) {
                    returning {
                        id
                    }
                }
            }
        `);
    });
}

function useInvokeGetProjectGroupList(graphQLClient: any) {
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

export const useServices = (props: any) => {
    const { mutateAsync: invokeGetProjectGroupList } = useInvokeGetProjectGroupList(
        props.graphQLClient
    );
    const { mutateAsync: invokeUpdatePoints } = useInvokeUpdatePoints(
        props.graphQLClient
    );
    const { mutateAsync: invokeGetTicketList } = useInvokeGetTicketsList(
        props.graphQLClient
    );
    const { mutateAsync: invokeRemoveTicket } = useInvokeRemoveTicket(
        props.graphQLClient
    );
    const { mutateAsync: invokeEstimateLimit } = useEstimateLimit(
        props.graphQLClient
    );

    const { mutateAsync: invokeEstimateDate } = useEstimateDate(
        props.graphQLClient
    );

    return {
        invokeGetProjectGroupList: () => invokeGetProjectGroupList(),
        invokeGetTicketList: (context: any) => invokeGetTicketList(context.selectedProjectGroup.id),
        invokeRemoveTicket: (context: any) => invokeRemoveTicket({ ticketId: context.selectedTicketId }),
        invokeGetEstimateList: () => invokeEstimateLimit(),
        invokeEstimateDate: () => invokeEstimateDate(),
        invokeUpdatePoints: (context: any) => invokeUpdatePoints(context.updatedPoint),
    }
}
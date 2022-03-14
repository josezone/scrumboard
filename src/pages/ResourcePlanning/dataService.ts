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
    return useMutation(() => {
        return graphQLClient.request(gql`
                    query MyQuery {
                        scrum(order_by: {scrum: desc}) {
                            id
                            active
                            scrum
                        }
                    }
              `);
    });
}

function useInvokeResourcePlan(graphQLClient: any) {
    return useMutation(() => {
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

    return {
        invokeResourceList: () => invokeResourceList(),
        invokeGetScrumList: () => invokeGetScrumList()
    }
}
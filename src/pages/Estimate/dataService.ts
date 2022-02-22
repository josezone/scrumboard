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

function useInvokeGetTicketsList(graphQLClient: any) {
    return useMutation(() => {
        return graphQLClient.request(gql`
            query MyQuery {
                ticket(where: {estimation: {_eq:true}}) {
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

export const useServices = (props: any) => {
    const { mutateAsync: invokeGetTicketList } = useInvokeGetTicketsList(
        props.graphQLClient
    );
    const { mutateAsync: invokeRemoveTicket } = useInvokeRemoveTicket(
        props.graphQLClient
    );

    return {
        invokeGetTicketList: () => invokeGetTicketList(),
        invokeRemoveTicket: (context: any) => invokeRemoveTicket({ ticketId: context.selectedTicketId }),
    }
}
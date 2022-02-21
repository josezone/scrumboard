import { gql } from "graphql-request";
import { useMutation } from "react-query";

export function useInvokeRemoveTicket(graphQLClient: any) {
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

export function useInvokeGetTicketsList(graphQLClient: any) {
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
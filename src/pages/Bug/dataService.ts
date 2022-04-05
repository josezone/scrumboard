import { gql } from "graphql-request";
import { useMutation } from "react-query";

export function useInvokeNewBug(graphQLClient: any) {
  return useMutation(
    ({
      bugType,
      bug,
      evidence,
      impact,
      report,
      resource_id,
      spilled,
      ticket_id,
      beSpill,
      feSpill,
      qaSpill
    }: any) => {
      if (bugType) {
        return graphQLClient.request(gql`
            mutation MyMutation {
              insert_bugs(objects: {ticket_id: "${ticket_id}", resource_id: ${resource_id}, estimate_bug: "${bug}"}) {
                returning {
                  id
                }
              }
            }
        `);
      }
      return graphQLClient.request(gql`
            mutation MyMutation {
                insert_bugs(objects: {bug: "${bug}", evidence: "${evidence}", impact: "${impact}", report: ${report}, resource_id: ${resource_id}, spilled: ${spilled}, ticket_id: ${ticket_id}, qa_spill: ${qaSpill}, be_spill: ${beSpill}, fe_spill: ${feSpill}}) {
                    returning {
                        id
                    }
                }
            }
        `);
    }
  );
}

export function useInvokeGetList(graphQLClient: any) {
  return useMutation(({ bugType, ticket_id }: any) => {
    return graphQLClient.request(gql`
        query MyQuery {
          bugs(where: {ticket_id: {_eq: ${ticket_id}}, bug: {_is_null: ${bugType === null ? false : true}}}) {
            bug
            date
            evidence
            id
            impact
            report
            resource {
              id
              resource
            }
            spilled
            ticket {
              ticket
              id
            }
            qa_spill
            be_spill
            fe_spill
            estimate_bug
          }
        }
      `);
  });
}

export function useInvokeUpdateReport(graphQLClient: any) {
  return useMutation(({ bug, report }: any) => {
    return graphQLClient.request(gql`
            mutation MyMutation {
                update_bugs(where: { id: { _eq: ${bug} } }, _set: { report: ${report} }) {
                    returning {
                        id
                    }
                }
            }
        `);
  });
}

export function useInvokeDeleteBug(graphQLClient: any) {
  return useMutation(({ id }: any) => {
    return graphQLClient.request(gql`
            mutation MyMutation {
                delete_bugs(where: { id: { _eq: ${id} } }) {
                    returning {
                        id
                    }
                }
            }
        `);
  });
}

export function useInvokeGetTicket(graphQLClient: any) {
  return useMutation((variable: any) => {
    return graphQLClient.request(gql`
          query getTicket($ticketId: bigint!){
            ticket_by_pk(id:$ticketId){
              id,
              ticket
            }
          }
        `, variable);
  });
}
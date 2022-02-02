import { gql } from "graphql-request";
import { useMutation } from "react-query";

export function useInvokeNewBug(graphQLClient: any) {
  return useMutation(
    ({
      bug,
      evidence,
      impact,
      report,
      resource_id,
      spilled,
      ticket_id,
    }: any) => {
      return graphQLClient.request(gql`
            mutation MyMutation {
                insert_bugs(objects: {bug: ${bug}, evidence: "${evidence}", impact: ${impact}, report: ${report}, resource_id: ${resource_id}, spilled: ${spilled}, ticket_id: ${ticket_id}}) {
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
  return useMutation(({ ticket_id }: any) => {
    return graphQLClient.request(gql`
        query MyQuery {
          bugs(where: { ticket_id: { _eq: ${ticket_id} } }) {
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

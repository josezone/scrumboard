import { gql } from "graphql-request";
import { useMutation } from "react-query";

export function useInvokeGetEstimateReport(graphQLClient: any) {
  return useMutation(() => {
    return graphQLClient.request(gql`
      query MyQuery {
        bugs(
          where: {
            estimate_bug: { _neq: "null" }
            ticket: { estimation: { _eq: true } }
          }
        ) {
          estimate_bug
          ticket {
            ticket
            id
            sprint {
              project {
                id
                project
              }
              sprint
              id
            }
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

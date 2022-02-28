import { gql } from "graphql-request";
import { useMutation } from "react-query";

export function useInvokeGetDailyReport(graphQLClient: any) {
  return useMutation(() => {
    return graphQLClient.request(gql`
      query MyQuery {
        scrum(where: { active: { _eq: true } }){
          scrum
        }

        bugs(
          where: {
            report: { _eq: true }
            ticket: { sprint: { scrum: { active: { _eq: true } } } }
          }
        ) {
          ticket {
            ticket
            id
            sprint {
              project {
                project
                id
              }
              sprint
              id
            }
          }
          bug
          date
          evidence
          id
          impact
          report
          spilled
          resource {
            resource
            id
          }
        }
      }
    `);
  });
}

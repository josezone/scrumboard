import { gql } from "graphql-request";
import { useMutation } from "react-query";

export function useGetSprintReport(graphQLClient: any) {
    return useMutation(({ ticketId, statusId }: any) => {
      return graphQLClient.request(gql`
      {
        scrum(where: {active: {_eq: true}}) {
          scrum
          sprints {
            sprint
            project{
              id
              project
            }
            tickets {
              ticket
              qa_story
              fe_story
              be_story
              qa_spill
              fe_spill
              be_spill
              spill
              bugs(where: {report: {_eq: true}}) {
                bug
                date
                report
              }
            }
          }
        }
      }
      `);
    });
  }
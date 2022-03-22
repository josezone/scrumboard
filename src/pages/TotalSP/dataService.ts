import { gql } from "graphql-request";
import { useMutation } from "react-query";

export function useGetScrumList(graphQLClient: any) {
  return useMutation((year: number) => {
    return graphQLClient.request(gql`
      query MyQuery {
          scrum(where: {scrum: {_gte: "${year}-01-01", _lte: "${year}-12-31"}}) {
            scrum
            id
            active
          }
        }
      `);
  });
}

export function useGetTicketList(graphQLClient: any) {
  return useMutation((scrum: number) => {
    return graphQLClient.request(gql`
      query MyQuery {
        ticket(where: {sprint: {scrum_id: {_eq: ${scrum}}}},order_by: {sprint: {project: {project: asc}}}) {
          fe_story
          be_story
          qa_story
          sprint {
            project {
              id
              project
            }
          }
        }
      }
        `);
  });
}


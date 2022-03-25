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
  return useMutation(({ scrum, projectGroup }: any) => {
    return graphQLClient.request(gql`
      query MyQuery {
        ticket(where: {sprint: {scrum_id: {_eq: ${scrum}}, project: {project_group_id: {_eq: ${projectGroup}}}}}, order_by: {sprint: {project: {project: asc}}}) {
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

export function useGetProjectGroups(graphQLClient: any) {
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

export function useGetResourcePlanningList(graphQLClient: any) {
  return useMutation(({ scrum, projectGroup }: any) => {
    return graphQLClient.request(gql`
      query MyQuery {
        scrum_resource_project(
          where: { scrum: { project_group_id: { _eq: ${scrum}}, id: { _eq: ${projectGroup} } } }
          order_by: { project: { project: asc } }
        ) {
          story
          resource {
            resource_type {
              resource_type
            }
          }
          project {
            project
          }
        }
      }
    `);
  });
}

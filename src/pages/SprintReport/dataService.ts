import { gql } from "graphql-request";
import { useMutation } from "react-query";
import { useInvokeGetProjectGroupList } from "../Estimate/dataService";
import { useInvokeGetScrumList } from "../ResourcePlanning/dataService";

export function useGetSprintReport(graphQLClient: any) {
  return useMutation(({ projectGroupId, scrumId }: any) => {
    return graphQLClient.request(gql`
      {
        scrum(where: {active: {_eq: true}, project_group_id: {_eq: ${projectGroupId}}, id: {_eq: ${scrumId}}}) {
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
              link
              status {
                status
              }
              bugs(where: {report: {_eq: true}}) {
                bug
                date
                report
                spilled
              }
            }
          }
        }
      }
      `);
  });
}

export const useServices = (props: any) => {
  const { mutateAsync: getSprintReport } = useGetSprintReport(
    props.graphQLClient
  );

  const { mutateAsync: invokeGetProjectGroupList } = useInvokeGetProjectGroupList(
    props.graphQLClient
  );

  const { mutateAsync: invokeGetScrumList } = useInvokeGetScrumList(
    props.graphQLClient
  );

  return {
    invokeGetProjectGroupList: () => invokeGetProjectGroupList(),
    invokeGetScrumList: (context: any) => invokeGetScrumList(context.selectedProjectGroup.id),
    getSprintReport: (context: any) => getSprintReport({ projectGroupId: context.selectedProjectGroup.id, scrumId: context.scrumSelected.id })
  }
}
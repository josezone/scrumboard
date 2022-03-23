import { gql } from "graphql-request";
import { useMutation } from "react-query";
import { useInvokeGetProjectGroupList } from "../Estimate/dataService";

function useInvokeGetEstimateReport(graphQLClient: any) {
  return useMutation((projectGroup: number) => {
    return graphQLClient.request(gql`
      query MyQuery {
        bugs(
          where: {
            estimate_bug: {
              _neq: "null"
              }, ticket: {
                estimation: {
                  _eq: true
                  }, 
                sprint: {
                  project: {
                    project_group_id: {
                      _eq: ${projectGroup}
                      }
                    }
                  }
                }
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

export const useServices = (props: any) => {

  const { mutateAsync: invokeGetEstimateReport } = useInvokeGetEstimateReport(
    props.graphQLClient
  );

  const { mutateAsync: invokeGetProjectGroupList } = useInvokeGetProjectGroupList(
    props.graphQLClient
  );


  return {
    invokeGetProjectGroupList: () => invokeGetProjectGroupList(),
    invokeGetEstimateReport: (context: any) => invokeGetEstimateReport(context.selectedProjectGroup.id),
  }
}
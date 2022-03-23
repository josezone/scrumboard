import { gql } from "graphql-request";
import { useMutation } from "react-query";
import { useInvokeGetProjectGroupList } from "../Estimate/dataService";

export function useInvokeGetDailyReport(graphQLClient: any) {
  return useMutation((projectGroup:any) => {
    return graphQLClient.request(gql`
      query MyQuery {
        scrum(where: { active: { _eq: true } }){
          scrum
        }
        bugs(
          where: {
            report: {
              _eq: true
              }, 
            ticket: {
              sprint: {
                scrum: {
                  active: {
                    _eq: true
                  }
                }, 
              project: {
                project_group_id: {
                  _eq: ${projectGroup}
                }
              }
            }
          }
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

export const useServices = (props: any) => {

  const { mutateAsync: invokeGetDailyReport } = useInvokeGetDailyReport(
    props.graphQLClient
  );

  const { mutateAsync: invokeGetProjectGroupList } = useInvokeGetProjectGroupList(
    props.graphQLClient
  );


  return {
    invokeGetProjectGroupList: () => invokeGetProjectGroupList(),
    invokeGetDailyReport: (context: any) => invokeGetDailyReport(context.selectedProjectGroup.id),
  }
}
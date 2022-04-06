import { gql } from "graphql-request";
import { useMutation } from "react-query";

function useInvokeGetProjectGroupVersionTypeList(graphQLClient: any) {
  return useMutation(() => {
    return graphQLClient.request(gql`
      query MyQuery {
        project_group {
          name
          id
        }
        version_notes_type(where: { status: { _eq: true } }) {
          type
          id
        }
      }
    `);
  });
}

function useInvokeGetProjectList(graphQLClient: any) {
  return useMutation((selectedProjectGroup: any) => {
    return graphQLClient.request(gql`
      query MyQuery {
        project(where: { project_group_id: { _eq: ${selectedProjectGroup} } }) {
          id
          project
        }
      }
    `);
  });
}

function useInvokeGetVersionList(graphQLClient: any) {
  return useMutation((selectedProject: any) => {
    return graphQLClient.request(gql`
      query MyQuery {
        version(where: { project_id: { _eq: ${selectedProject} } }) {
          version
          id
          version_notes {
            action_date
            action_done
            id
            link
            notes
            version_notes_type {
              id
              type
            }
          }
          tickets {
            id
            ticket
          }
        }
      }
    `);
  });
}

function useInvokeCreateNewVersionNotes(graphQLClient: any) {
  return useMutation(
    ({
      actionDate,
      actionDone,
      link,
      notes,
      versionId,
      versionNotesTypeId,
    }: any) => {
      return graphQLClient.request(gql`
        mutation MyMutation {
            insert_version_notes(objects: {action_date: "${actionDate}", action_done: ${actionDone}, link: "${link}", notes: "${notes}", version_id: ${versionId}, version_notes_type_id: ${versionNotesTypeId}}) {
                returning {
                id
                }
            }
        }
      `);
    }
  );
}

export const useServices = (props: any) => {
  const { mutateAsync: invokeGetProjectGroupVersionTypeList } =
    useInvokeGetProjectGroupVersionTypeList(props.graphQLClient);

  const { mutateAsync: invokeGetProjectList } = useInvokeGetProjectList(
    props.graphQLClient
  );

  const { mutateAsync: invokeGetVersionList } = useInvokeGetVersionList(
    props.graphQLClient
  );

  const { mutateAsync: invokeCreateNewVersionNotes } =
    useInvokeCreateNewVersionNotes(props.graphQLClient);

  return {
    invokeGetProjectGroupVersionTypeList: () =>
      invokeGetProjectGroupVersionTypeList(),
    invokeGetProjectList: (context: any) =>
      invokeGetProjectList(context.selectedProjectGroup.id),
    invokeGetVersionList: (context: any) =>
      invokeGetVersionList(context.selectedProject.id),
    invokeCreateNewVersionNotes: (context: any) =>
      invokeCreateNewVersionNotes(context.newVersionNotes),
  };
};

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
    if (!selectedProjectGroup) {
      return Promise.resolve({ project: [] });
    }
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

function useInvokeGetCountryList(graphQLClient: any) {
  return useMutation((selectedProject: any) => {
    if (!selectedProject) {
      return Promise.resolve({ country: [] });
    }
    return graphQLClient.request(gql`
      query MyQuery {
        country(where: { sprints: { project_id: { _eq: ${selectedProject} } } }) {
          country
          id
        }
      }
    `);
  });
}

function useInvokeGetVersionList(graphQLClient: any) {
  return useMutation((selectedCountry: any) => {
    if (!selectedCountry) {
      return Promise.resolve({ version: [] });
    }
    return graphQLClient.request(gql`
      query MyQuery {
        version(where: {country_id: {_eq: ${selectedCountry}}}) {
          version
          id
        }
      }
    `);
  });
}

function useInvokeGetVersionData(graphQLClient: any) {
  return useMutation((selectedVersion: any) => {
    if (!selectedVersion) {
      return Promise.resolve({ version_notes: [], ticket: [] });
    }
    return graphQLClient.request(gql`
      query MyQuery {
        version_notes(where: { version_id: { _eq: ${selectedVersion} } }) {
          link
          notes
          action_date
          action_done
          id
          version_notes_type {
            type
            id
          }
        }
        ticket(where: { version_id: { _eq: ${selectedVersion} } }) {
          id
          link
          ticket
          start_date
          status {
            status
            id
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

  const { mutateAsync: invokeGetCountryList } = useInvokeGetCountryList(
    props.graphQLClient
  );

  const { mutateAsync: invokeGetVersionList } = useInvokeGetVersionList(
    props.graphQLClient
  );

  const { mutateAsync: invokeCreateNewVersionNotes } =
    useInvokeCreateNewVersionNotes(props.graphQLClient);

  const { mutateAsync: invokeGetVersionData } = useInvokeGetVersionData(
    props.graphQLClient
  );

  return {
    invokeGetProjectGroupVersionTypeList: () =>
      invokeGetProjectGroupVersionTypeList(),
    invokeGetProjectList: (context: any) =>
      invokeGetProjectList(context.selectedProjectGroup?.id),
    invokeGetCountryList: (context: any) =>
      invokeGetCountryList(context.selectedProject?.id),
    invokeGetVersionList: (context: any) =>
      invokeGetVersionList(context.defaultCountry?.id),
    invokeCreateNewVersionNotes: (context: any) =>
      invokeCreateNewVersionNotes(context.newVersionNotes),
    invokeGetVersionData: (context: any) =>
      invokeGetVersionData(context.selectedVersion?.id),
  };
};

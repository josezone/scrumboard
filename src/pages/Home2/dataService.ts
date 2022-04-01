import { gql } from "graphql-request";
import { useMutation } from "react-query";
import { useInvokeGetProjectGroupList } from "../Estimate/dataService";

function stringGen(len: number) {
  let text = "";
  const charset = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < len; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  return text;
}

function useInvokeGetTicketsList(graphQLClient: any) {
  return useMutation((sprintId: number) => {
    if (!sprintId) {
      return Promise.resolve([]);
    }
    return graphQLClient.request(gql`
        query MyQuery {
          ticket(where: {sprint_id: {_eq: ${sprintId}}}) {
            be_spill
            be_story
            fe_spill
            fe_story
            id
            qa_spill
            qa_story
            spill
            ticket
            priority {
              colorCode
              id
              priority
            }
            scope {
              id
              scope
            }
            sprint {
              id
              sprint
            }
            version {
              id
              version
            }
            status {
              id
              status
            }
            ticket_resources {
              id
              story
              resource {
                resource
                id
                resource_type {
                  id
                  resource_type
                }
              }
            }
            estimation,
            link
          }
        }
    `);
  });
}

function useInvokeGetSprintstatusCountryScopeResourcePriorityResourcetype(
  graphQLClient: any
) {
  return useMutation(() => {
    return graphQLClient.request(gql`
      query MyQuery {
        status {
          id
          status
        }
        country {
          country
          id
        }
        scope {
          id
          scope
        }
        priority {
          id
          priority
        }
        resource_type {
          resource_type
          id
        }
        resource(where: { status: { _eq: true } }) {
          id
          resource
          resource_type {
            id
            resource_type
          }
        }
      }
    `);
  });
}

function useInvokeGetProjectAndScrumList(graphQLClient: any) {
  return useMutation((projectGroupId: number) => {
    if (!projectGroupId) {
      return Promise.resolve([]);
    }
    return graphQLClient.request(gql`
      query MyQuery {
        project(where: { project_group_id: { _eq: ${projectGroupId} } }) {
          id
          project
        }
        scrum(where: { project_group_id: { _eq: ${projectGroupId} } }) {
          id
          scrum
        }
      }
    `);
  });
}

function useInvokeGetSprintList(graphQLClient: any) {
  return useMutation(({ projectId, scrumId }: any) => {
    if (!projectId || !scrumId) {
      return Promise.resolve([]);
    }
    return graphQLClient.request(gql`
      query MyQuery {
        sprint(where: { scrum_id: { _eq: ${scrumId} }, project_id: { _eq: ${projectId} } }) {
          id
          sprint
          version {
            id
            version
          }
          country {
            id
            country
          }
        }
      }
    `);
  });
}

function useInvokeRemoteStatusUpdate(graphQLClient: any) {
  return useMutation(({ ticketId, statusId }: any) => {
    return graphQLClient.request(gql`
      mutation MyMutation {
        update_ticket(where: { id: { _eq: ${ticketId} } }, _set: { status_id: ${statusId} }) {
          returning {
            id
          }
        }
      }
    `);
  });
}

function useInovkeRemoveRemoteTicket(graphQLClient: any) {
  return useMutation(({ ticketId }: any) => {
    return graphQLClient.request(gql`
      mutation MyMutation {
        delete_ticket(where: { id: { _eq: "${ticketId}" } }) {
          returning {
            id
          }
        }
      }
    `);
  });
}

function useInvokeCreateNewTickets(graphQLClient: any) {
  return useMutation(
    ({
      ticket,
      sprintId,
      scopeId,
      versionId,
      priorityId,
      statusId,
      spill,
      beStory,
      feStory,
      qaStory,
      beSpill,
      feSpill,
      qaSpill,
      link,
    }: any) => {
      return graphQLClient.request(gql`
      mutation MyMutation {
        insert_ticket(objects: {ticket: "${ticket}", link: "${link}", sprint_id: ${sprintId}, scope_id: ${scopeId}, version_id: ${versionId}, priority_id: ${priorityId}, status_id: ${statusId}, spill:${spill}, fe_story: ${feStory}, fe_spill: ${feSpill}, be_story: ${beStory}, be_spill: ${beSpill}, qa_story: ${qaStory}, qa_spill: ${qaSpill}}) {
          returning {
            id
          }
        }
      }
    `);
    }
  );
}

function getResourceList(resourceList: any, ticketId: string) {
  const insertArray = resourceList.map((resource: any) => {
    return `{ticket_id: ${ticketId}, story: ${resource.story}, resource_id: ${resource.id}}`;
  });
  return insertArray.join(",");
}

function useInvokeTicketResource(graphQLClient: any) {
  return useMutation(({ ticketId, resources }: any) => {
    const query = gql`
      mutation MyMutation {
        insert_ticket_resource(objects: [${getResourceList(
          resources,
          ticketId
        )}]) {
          returning {
            id
          }
        }
      }
    `;
    return graphQLClient.request(query);
  });
}

function useInvokeUpdateTicket(graphQLClient: any) {
  return useMutation(
    ({
      ticketId,
      beStory,
      feStory,
      qaStory,
      ticket,
      scopeId,
      priorityId,
      link,
    }: any) => {
      return graphQLClient.request(gql`
    mutation MyMutation {
      update_ticket(where: {id: {_eq: "${ticketId}"}}, _set: {${
        beStory ? "be_story: " + beStory + "," : ""
      } ${feStory ? "fe_story: " + feStory + "," : ""} ${
        qaStory ? "qa_story: " + qaStory + "," : ""
      } ticket: "${ticket}", scope_id: ${scopeId}, priority_id: ${priorityId}, link: "${link}"}) {
        returning {
            id
          }
        }
      }
    `);
    }
  );
}

function getDeleteData(deleteRes: any) {
  return deleteRes.map(
    (item: any) =>
      stringGen(3) +
      `:delete_ticket_resource(where: {id: {_eq: "${item.id}"}}) {
                      returning {
                        id
                      }
                    }`
  );
}

function useInvokeDeleteResourceTicket(graphQLClient: any) {
  return useMutation(({ deleteRes }: any) => {
    if (!deleteRes || !deleteRes.length) {
      return Promise.resolve("");
    }
    return graphQLClient.request(gql`
      mutation MyMutation {
        ${getDeleteData(deleteRes)}
      }
    `);
  });
}

function getUpdateData(updateRes: any) {
  return updateRes.map(
    (item: any) =>
      stringGen(3) +
      `:update_ticket_resource(where: {id: {_eq: "${item.ticketResourceId}"}}, _set: {story: "${item.story}"}) {
                      returning {
                        id
                      }
                    }`
  );
}

function useInvokeUpdateResourceTicket(graphQLClient: any) {
  return useMutation(({ updateRes }: any) => {
    if (!updateRes || !updateRes.length) {
      return Promise.resolve("");
    }
    return graphQLClient.request(gql`
      mutation MyMutation {
        ${getUpdateData(updateRes)}
      }
    `);
  });
}

function useInvokeAddResourceTicket(graphQLClient: any) {
  return useMutation(({ ticketId, newResources }: any) => {
    if (!newResources || !newResources.length) {
      return Promise.resolve("");
    }
    const query = gql`
      mutation MyMutation {
        insert_ticket_resource(objects: [${getResourceList(
          newResources,
          ticketId
        )}]) {
          returning {
            id
          }
        }
      }
    `;
    return graphQLClient.request(query);
  });
}

function useInvokeGetVersionList(graphQLClient: any) {
  return useMutation(({ project, country }: any) => {
    return graphQLClient.request(gql`
      query MyQuery {
        version(where: { country_id: { _eq: ${country} }, project_id: { _eq: ${project} } }) {
          version
          id
          sprints {
            sprint
            id
          }
        }
      }
    `);
  });
}

function useInvokeCreateNewSprint(graphQLClient: any) {
  return useMutation(
    ({ sprint, country, version, projectId, scrumId }: any) => {
      return graphQLClient.request(gql`
    mutation MyMutation {
      insert_sprint(objects: {country_id: ${country}, verison_id: ${version}, sprint: "${sprint}", scrum_id: ${scrumId}, project_id: ${projectId}}) {
          returning {
            id
          }
        }
      }
    `);
    }
  );
}

function useInvokeUpdateSprint(graphQLClient: any) {
  return useMutation(({ sprint, country, version, sprintId }: any) => {
    return graphQLClient.request(gql`
    mutation MyMutation {
      update_sprint(where: {id: {_eq: ${sprintId}}}, _set: {sprint: "${sprint}", country_id: ${country}, verison_id: ${version}}) {
          returning {
            id
          }
        }
      }
    `);
  });
}

export const useServices = (props: any) => {
  const {
    mutateAsync: invokeGetSprintstatusCountryScopeResourcePriorityResourcetype,
  } = useInvokeGetSprintstatusCountryScopeResourcePriorityResourcetype(
    props.graphQLClient
  );

  const { mutateAsync: invokeGetProjectGroupList } =
    useInvokeGetProjectGroupList(props.graphQLClient);

  const { mutateAsync: invokeGetProjectAndScrumList } =
    useInvokeGetProjectAndScrumList(props.graphQLClient);

  const { mutateAsync: invokeGetSprintList } = useInvokeGetSprintList(
    props.graphQLClient
  );

  const { mutateAsync: invokeGetTicketList } = useInvokeGetTicketsList(
    props.graphQLClient
  );

  const { mutateAsync: invokeRemoteStatusUpdate } = useInvokeRemoteStatusUpdate(
    props.graphQLClient
  );

  const { mutateAsync: inovkeRemoveRemoteTicket } = useInovkeRemoveRemoteTicket(
    props.graphQLClient
  );

  const { mutateAsync: invokeCreateNewTickets } = useInvokeCreateNewTickets(
    props.graphQLClient
  );

  const { mutateAsync: invokeTicketResource } = useInvokeTicketResource(
    props.graphQLClient
  );

  const { mutateAsync: invokeUpdateTicket } = useInvokeUpdateTicket(
    props.graphQLClient
  );

  const { mutateAsync: invokeUpdateResourceTicket } =
    useInvokeUpdateResourceTicket(props.graphQLClient);

  const { mutateAsync: invokeDeleteResourceTicket } =
    useInvokeDeleteResourceTicket(props.graphQLClient);

  const { mutateAsync: invokeAddResourceTicket } = useInvokeAddResourceTicket(
    props.graphQLClient
  );

  const { mutateAsync: invokeGetVersionList } = useInvokeGetVersionList(
    props.graphQLClient
  );
  const { mutateAsync: invokeCreateNewSprint } = useInvokeCreateNewSprint(
    props.graphQLClient
  );

  const { mutateAsync: invokeUpdateSprint } = useInvokeUpdateSprint(
    props.graphQLClient
  );

  return {
    invokeGetSprintstatusCountryScopeResourcePriorityResourcetype: () =>
      invokeGetSprintstatusCountryScopeResourcePriorityResourcetype(),
    invokeGetProjectGroupList: () => invokeGetProjectGroupList(),
    invokeGetProjectAndScrumList: (context: any) =>
      invokeGetProjectAndScrumList(context.projectGroupSelected?.id),
    invokeGetSprintList: (context: any) =>
      invokeGetSprintList({
        projectId: context.projectSelected?.id,
        scrumId: context.scrumSelected?.id,
      }),
    invokeGetTicketList: (context: any) =>
      invokeGetTicketList(context.sprintSelected?.id),
    invokeRemoteStatusUpdate: (context: any) =>
      invokeRemoteStatusUpdate({
        ticketId: context.remoteStatusUpdateData.ticket,
        statusId: context.remoteStatusUpdateData.status,
      }),
    inovkeRemoveRemoteTicket: (context: any) =>
      inovkeRemoveRemoteTicket({ ticketId: context.removeTicketId }),
    invokeCreateNewTickets: (context: any) =>
      invokeCreateNewTickets({ ...context.newTicket.ticket }),
    invokeAddResource: (context: any) =>
      invokeTicketResource({
        ticketId: context.newTicketId,
        resources: context.newTicket?.resources,
      }),
    invokeUpdateTicket: (context: any) =>
      invokeUpdateTicket({
        ticketId: context.updateTicket.ticket.id,
        beStory: context.updateTicket.ticket.beStory,
        feStory: context.updateTicket.ticket.feStory,
        qaStory: context.updateTicket.ticket.qaStory,
        ticket: context.updateTicket.ticket.ticket,
        scopeId: context.updateTicket.ticket.scopeId,
        priorityId: context.updateTicket.ticket.priorityId,
        link: context.updateTicket.ticket.link,
      }),
    invokeDeleteResourceTicket: (context: any) =>
      invokeDeleteResourceTicket({
        deleteRes: context.updateTicket.deleteResource,
      }),
    invokeUpdateResourceTicket: (context: any) =>
      invokeUpdateResourceTicket({
        updateRes: context.updateTicket.updateResource,
      }),
    invokeAddResourceTicket: (context: any) =>
      invokeAddResourceTicket({
        ticketId: context.updateTicket.ticket.id,
        newResources: context.updateTicket.newResource,
      }),
    invokeGetVersionList: (context: any) =>
      invokeGetVersionList({
        project: context.getVersion.project,
        country: context.getVersion.country,
      }),
    invokeCreateNewSprint: (context: any) =>
      invokeCreateNewSprint({
        ...context.newSprint,
        projectId: context.projectSelected?.id,
        scrumId: context.scrumSelected?.id,
      }),
    invokeUpdateSprint: (context: any) =>
      invokeUpdateSprint({
        ...context.updateSprint,
      }),
  };
};

import { gql } from "graphql-request";
import { useMutation } from "react-query";

export function useInvokeGetTicketsList(graphQLClient: any) {
  return useMutation(({ sprintId }: { [key: string]: number }) => {
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
              story
              resource {
                resource
                id
              }
            }
            estimation,
            link
          }
        }
    `);
  });
}

export function useGetProjectGroupList(graphQLClient: any) {
  return useMutation(() => {
    return graphQLClient.request(gql`
      query GetProjectGroup {
        project_group {
          id
          name
        }
      }
    `);
  });
}

export function useGetScrumList(graphQLClient: any) {
  return useMutation(
    ({ year, selectedProjectGroup }: { [key: string]: any }) => {
      return graphQLClient.request(gql`
    query getScrumList {
        scrum(where: {scrum: {_gte: "${year}-01-01", _lte: "${year}-12-31"}, project_group_id: {_eq: ${selectedProjectGroup.id}}}) {
          scrum
          id
          active
        }
      }
    `);
    }
  );
}

export function useInvokeGetSprintList(graphQLClient: any) {
  return useMutation(({ scrumId }: { [key: string]: number }) => {
    if (!scrumId) {
      return Promise.resolve([]);
    }
    return graphQLClient.request(gql`
      query GetSprint {
        sprint(where: { scrum_id: { _eq: ${scrumId} } }) {
          sprint
          id
          country {
            id
            country
          }
          version {
            id
            version
          }
        }
      }
    `);
  });
}

export function useInvokeReloadSprintList(graphQLClient: any) {
  return useMutation(({ scrumId }: { [key: string]: number }) => {
    if (!scrumId) {
      return Promise.resolve([]);
    }
    return graphQLClient.request(gql`
        query MyQuery {
            sprint(where: {scrum_id: {_eq: ${scrumId}}}) {
                sprint
                id
                country{
                    id
                    country
                }
            }
        }
    `);
  });
}

export function useInvokeGetSprintStatusList(graphQLClient: any) {
  return useMutation(() => {
    return graphQLClient.request(gql`
      query MyQuery {
        status {
          status
          id
        }
      }
    `);
  });
}

export function useGetCountryList(graphQLClient: any) {
  return useMutation(() => {
    return graphQLClient.request(gql`
      query MyQuery {
        country {
          country
          id
        }
      }
    `);
  });
}

export function useInvokeReloadCountryList(graphQLClient: any) {
  return useMutation(() => {
    return graphQLClient.request(gql`
      query MyQuery {
        country {
          country
          id
        }
      }
    `);
  });
}

export function useGetProjectList(graphQLClient: any) {
  return useMutation(({ selectedProjectGroupId }: any) => {
    return graphQLClient.request(gql`
      query GetProjects {
        project_group(where: {id: {_eq: ${selectedProjectGroupId}}}) {
          projects {
            project
            id
          }
        }
      }
    `);
  });
}

export function useInvokeReloadProject(graphQLClient: any) {
  return useMutation(() => {
    return graphQLClient.request(gql`
      query getProjects {
        project(where: { project_group_id: { _eq: 2 } }) {
          project
          id
        }
      }
    `);
  });
}

export function useInvokePriorityList(graphQLClient: any) {
  return useMutation(() => {
    return graphQLClient.request(gql`
      query MyQuery {
        priority {
          colorCode
          id
          priority
        }
      }
    `);
  });
}

export function useInvokeActivate(graphQLClient: any) {
  return useMutation(({ activateId, projectGroupId }: any) => {
    return graphQLClient.request(gql`
      mutation MyMutation {
        u1: update_scrum(where: { active: { _eq: ${true} }, project_group_id: { _eq: ${projectGroupId}} }, _set: { active: false }) {
          returning {
            id
          }
        }
        u2: update_scrum(where: { id: { _eq: ${activateId} } }, _set: { active: true }) {
          returning {
            id
          }
        }
      }
    `);
  });
}

export function useInvokeMakeScrum(graphQLClient: any) {
  return useMutation(({ scrum, project_group_id }: any) => {
    return graphQLClient.request(gql`
      mutation createScrum {
        insert_scrum(objects: {scrum: "${scrum}", active: false, status: true, project_group_id: ${project_group_id}}) {
          returning {
            id
          }
        }
      }
    `);
  });
}

export function useInvokeMakeProjectGroup(graphQLClient: any) {
  return useMutation(({ newProjectGroup }: any) => {
    return graphQLClient.request(gql`
      mutation createNewProjectGroup {
        insert_project_group(objects: { name: ${newProjectGroup} }) {
          returning {
            id
          }
        }
      }
    `);
  });
}

export function useInvokeMakeProject(graphQLClient: any) {
  return useMutation(({ project, project_group_id }: any) => {
    return graphQLClient.request(gql`
      mutation createProject {
        insert_project(objects: {project: "${project}", status: true, project_group_id: ${project_group_id}}) {
          returning {
            id
          }
        }
      }
    `);
  });
}

export function useInvokeCreateNewSprint(graphQLClient: any) {
  return useMutation(
    ({ sprint, projectId, scrumId, countryId, verisonId }: any) => {
      return graphQLClient.request(gql`
      mutation MyMutation {
        insert_sprint(objects: {sprint: "${sprint}", project_id: ${projectId}, scrum_id: ${scrumId}, country_id:${countryId}, verison_id: ${verisonId}}) {
          returning {
            id
          }
        }
      }
    `);
    }
  );
}

export function useInvokeCreateNewCountry(graphQLClient: any) {
  return useMutation(({ country }: any) => {
    return graphQLClient.request(gql`
      mutation MyMutation {
        insert_country(objects: {country: "${country}" status:true}) {
          returning {
            id
          }
        }
      }
    `);
  });
}

export function useInvokeRemoteStatusUpdate(graphQLClient: any) {
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

export function useInvokeScopeList(graphQLClient: any) {
  return useMutation(() => {
    return graphQLClient.request(gql`
      query MyQuery {
        scope {
          scope
          id
        }
      }
    `);
  });
}

export function useInvokeResourceList(graphQLClient: any) {
  return useMutation(() => {
    return graphQLClient.request(gql`
      query MyQuery {
        resource {
          resource
          id
          resource_type {
            resource_type
            id
          }
        }
      }
    `);
  });
}

export function useInvokeGetVersionList(graphQLClient: any) {
  return useMutation(({ countryId, projectId }: any) => {
    return graphQLClient.request(gql`
      query MyQuery {
        version(where: { country_id: { _eq: ${
          countryId || 0
        } }, project_id: { _eq: ${projectId || 0} } }) {
          id
          version
        }
      }
    `);
  });
}

export function useInvokeCreateVersion(graphQLClient: any) {
  return useMutation(({ version, countryId, projectId }: any) => {
    return graphQLClient.request(gql`
      mutation MyMutation {
        insert_version(objects: {version: "${version}", country_id: ${countryId}, project_id: ${projectId}}) {
          returning {
            id
          }
        }
      }
    `);
  });
}

export function useInvokeCreateNewTickets(graphQLClient: any) {
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

export function useInvokeUpdateTicket(graphQLClient: any) {
  return useMutation(
    ({
      ticket,
      sprintId,
      scopeId,
      versionId,
      priorityId,
      spill,
      beStory,
      feStory,
      qaStory,
      beSpill,
      feSpill,
      qaSpill,
      ticket_id,
    }: any) => {
      return graphQLClient.request(gql`
      mutation MyMutation {
        update_ticket_by_pk(pk_columns: {id: ${ticket_id} }, _set: {ticket: "${ticket}", sprint_id: ${sprintId}, scope_id: ${scopeId}, version_id: ${versionId}, priority_id: ${priorityId}, spill:${spill}, fe_story: ${feStory}, fe_spill: ${feSpill}, be_story: ${beStory}, be_spill: ${beSpill}, qa_story: ${qaStory}, qa_spill: ${qaSpill}}) {
            id
        }
      }
    `);
    }
  );
}

export function useGetSprintListForMovingSprint(graphQLClient: any) {
  return useMutation((variables: any) => {
    if (!variables.countryId || !variables.currentSprintId) {
      return Promise.resolve([]);
    }

    const query = gql`
      query getSprints(
        $countryId: Int!
        $projectId: Int!
        $currentSprintId: Int!
      ) {
        sprint(
          where: {
            country_id: { _eq: $countryId }
            project_id: { _eq: $projectId }
            id: { _neq: $currentSprintId }
          }
        ) {
          id
          sprint
          scrum_id
          country {
            country
          }
        }
      }
    `;
    return graphQLClient.request(query, variables);
  });
}

export function useChangeSprintTicket(graphQLClient: any) {
  return useMutation((variables: any) => {
    const query = gql`
    mutation updateTicket($ticketId: bigint!, $sprintId: Int!, $beSpill: numeric, $feSpill: numeric, $qaSpill: numeric, $spill: Boolean) {
      update_ticket(where: {id: {_eq: $ticketId }}, _set: { sprint_id: $sprintId, be_spill: $beSpill, fe_spill: $feSpill, qa_spill: $qaSpill, spill: $spill  }){
        returning{
          id

        }
      }
    `;
    return graphQLClient.request(query, variables);
  });
}

function estimateList(projectId: any, resourceTypeList: any) {
  return resourceTypeList.map((item: any) => {
    return `{project_id: ${projectId}, resource_type_id: ${item.id}}`;
  });
}

export function useInvokecreateEstimateList(graphQLClient: any) {
  return useMutation(({ projectId, resourceTypeList }: any) => {
    return graphQLClient.request(gql`
      mutation MyMutation {
        insert_estimation_limit(objects: [${estimateList(
          projectId,
          resourceTypeList
        )}]) {
          returning {
            id
          }
        }
      }
    `);
  });
}

function getResourceList(resourceList: any, ticketId: string) {
  const insertArray = resourceList.map((resource: any) => {
    return `{ticket_id: ${ticketId}, story: ${resource.storyPoints}, resource_id: ${resource.resourceId}}`;
  });
  return insertArray.join(",");
}

export function useInvokeTicketResource(graphQLClient: any) {
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

export function useInovkeRemoveRemoteTicket(graphQLClient: any) {
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

export function useInvokeResouceTypeList(graphQLClient: any) {
  return useMutation(() => {
    return graphQLClient.request(gql`
      query MyQuery {
        resource_type {
          resource_type
          id
        }
      }
    `);
  });
}

export function useInvokeCreateResource(graphQLClient: any) {
  return useMutation(({ resource, resourceType }: any) => {
    return graphQLClient.request(gql`
      mutation MyMutation {
        insert_resource(objects: {resource: "${resource}", resource_type_id: ${resourceType}, status: true}) {
          returning {
            id
          }
        }
      }
    `);
  });
}

export function useInvokeChangeEstimate(graphQLClient: any) {
  return useMutation(({ ticketId, estimate }: any) => {
    return graphQLClient.request(gql`
    mutation MyMutation {
      update_ticket(where: {id: {_eq: "${ticketId}"}}, _set: {estimation: ${estimate}}) {
          returning {
            id
          }
        }
      }
    `);
  });
}

export function useInvokeUpdateSprint(graphQLClient: any) {
  return useMutation(({ sprintId, sprint, country }: any) => {
    return graphQLClient.request(gql`
      mutation MyMutation {
        update_sprint(
          where: { id: { _eq: "${sprintId}" } }
          _set: { sprint: "${sprint}", country_id: "${country}" }
        ) {
          returning {
           sprint
           id
            country{
              id
             country  
          }
          }
        }
      }
    `);
  });
}

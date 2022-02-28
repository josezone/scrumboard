import { gql } from "graphql-request";
import { useMutation } from "react-query";

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

export function useInvokeChangeResourceStatus(graphQLClient: any) {
  return useMutation(({ resourceId, status }: any) => {
    return graphQLClient.request(gql`
        mutation MyMutation {
          update_resource_by_pk(pk_columns: {id: ${resourceId}}, _set: {status: ${status}}) {
            id
          }
        }
        `);
  });
}

export function useInvokeUpdateResource(graphQLClient: any) {
  return useMutation(({ resourceId, name, resourceTypeId }: any) => {
    return graphQLClient.request(gql`mutation MyMutation {
        update_resource_by_pk(pk_columns: {id: ${resourceId}}, _set: {resource: ${name}, resource_type_id: ${resourceTypeId}}) {
          id
          resource
          resource_type_id
          status
        }
      }`);
  });
}

export function useInvokeGetResourceList(graphQLClient: any) {
  // debugger;
  return useMutation(() => {
    // debugger;
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

export function useInvokeResourceTypeList(graphQLClient: any) {
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
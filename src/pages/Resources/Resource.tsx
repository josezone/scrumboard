import {
  useInvokeChangeResourceStatus,
  useInvokeUpdateResource,
  useInvokeCreateResource,
  useInvokeGetResourceList,
  useInvokeResourceTypeList,
} from "./dataService";
import { useMachine } from "@xstate/react";
import { resourceMachine } from "./resourceMachine";
import { actions } from "./stateActions";
import ResourceList from "./resourceList";

function Resources(props: any) {
  const { mutateAsync: invokeGetResourceList } = useInvokeGetResourceList(
    props.graphQLClient
  );
  const { mutateAsync: invokeResourceTypeList } = useInvokeResourceTypeList(
    props.graphQLClient
  );
  const { mutateAsync: invokeUpdateResource } = useInvokeUpdateResource(
    props.graphQLClient
  );
  const { mutateAsync: invokeNewResource } = useInvokeCreateResource(
    props.graphQLClient
  );
  const { mutateAsync: invokeChangeResourceStatus } =
    useInvokeChangeResourceStatus(props.graphQLClient);

  const [state, send] = useMachine(resourceMachine, {
    actions,
    services: {
      invokeGetResourceList: () => {
          return invokeGetResourceList()},
      invokeResourceTypeList: () => invokeResourceTypeList(),
      invokeUpdateResource: (context: any) =>
        invokeUpdateResource({ ...context.updateResource }),
      invokeNewResource: (context: any) =>
        invokeNewResource({ ...context?.newResource }),
      invokeChangeResourceStatus: (context: any) =>
        invokeChangeResourceStatus({ ...context?.changingResource }),
    },
  });
  return <ResourceList contents={state?.context?.resourceList} send={send} context={state?.context}></ResourceList>;
}

export default Resources;

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
import { ResourceListStyle } from "./resourceList.style";
import ResourceTable from "./ResourceTable";

function Resources(props: any) {
    debugger;
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
        //   debugger;
          return invokeGetResourceList()},
      invokeResourceTypeList: () => invokeResourceTypeList(),
      invokeUpdateResource: (context: any) =>
        invokeUpdateResource({ ...context.updateResource }),
      invokeNewResource: (context: any) =>
        invokeNewResource({ ...context?.newResource }),
      invokeChangeResourceStatus: (context: any) =>
        invokeChangeResourceStatus({ resourceId: context.changingResourceId }),
    },
  });
  console.log(state);
  return <ResourceTable contents={state.context.resourceList}></ResourceTable>;
}

export default Resources;

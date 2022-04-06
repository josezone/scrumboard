import { useMachine } from "@xstate/react";
import { versionMachine } from "./VersionMachine";
import { actions } from "./stateActions";
import { useServices } from "./dataService";

function Version(props: any) {
  props.graphQLClient.setHeader(
    "Authorization",
    "Basic " + localStorage.getItem("data")
  );

  const services = useServices(props);
  const [state, send] = useMachine(versionMachine, { actions, services });

  return <div>version</div>;
}

export default Version;

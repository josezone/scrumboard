import { useMachine } from "@xstate/react";
import { versionMachine } from "./VersionMachine";
import { actions } from "./stateActions";
import { useServices } from "./dataService";
import VersionEntry from "../../components/version/versionEntry";

function Version(props: any) {
  props.graphQLClient.setHeader(
    "Authorization",
    "Basic " + localStorage.getItem("data")
  );

  const services = useServices(props);
  const [state, send] = useMachine(versionMachine, { actions, services });

  return <VersionEntry {...state.context} send={send} />;
}

export default Version;

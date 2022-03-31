import { useMachine } from "@xstate/react";
import { homeMachine } from "./homeMachine";
import { useServices } from "./dataService";
import { actions } from "./stateActions";
import HomeComponent from "../../components/home/Home";

function DailyReport(props: any) {
  props.graphQLClient.setHeader(
    "Authorization",
    "Basic " + localStorage.getItem("data")
  );
  const services = useServices(props);

  const [state, send] = useMachine(homeMachine, {
    actions,
    services,
  });
  return (
    <div>
      <HomeComponent {...state.context} send={send} />
    </div>
  );
}

export default DailyReport;

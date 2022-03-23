import { useMachine } from "@xstate/react";
import ReportComponent from "../../components/Report";
import { useServices } from "./dataService";
import { estimateReportMachine } from "./EstimateReportMachine";
import { actions } from "./stateActions";

function EstimateReport(props: any) {
  props.graphQLClient.setHeader(
    "Authorization",
    "Basic " + localStorage.getItem("data")
  );

  const services = useServices(props);

  const [state, send] = useMachine(estimateReportMachine, {
    actions,
    services
  });

  return (
    <ReportComponent
      // {...state.context}
      // isEstimate={true}
      {...state.context}
      send={send}
      reportItems={state.context.estimateReport}
      title={"Estimate Report"}
    />
  );
}

export default EstimateReport;

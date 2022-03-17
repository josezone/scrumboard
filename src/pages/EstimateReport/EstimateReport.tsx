import { useMachine } from "@xstate/react";
import ReportComponent from "../../components/Report";
import { estimateReportMachine } from "./EstimateReportMachine";
import { useInvokeGetEstimateReport } from "./dataService";
import { actions } from "./stateActions";

function EstimateReport(props: any) {
  props.graphQLClient.setHeader(
    "Authorization",
    "Basic " + localStorage.getItem("data")
  );

  const { mutateAsync: invokeGetEstimateReport } = useInvokeGetEstimateReport(
    props.graphQLClient
  );

  const [state, send] = useMachine(estimateReportMachine, {
    actions,
    services: {
      invokeGetEstimateReport: () => invokeGetEstimateReport(),
    },
  });

  return (
    <ReportComponent
      // {...state.context}
      // isEstimate={true}
      reportItems={state.context.estimateReport}
      title={"Estimate Report"}
    />
  );
}

export default EstimateReport;

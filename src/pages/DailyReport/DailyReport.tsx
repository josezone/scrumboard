import { useMachine } from "@xstate/react";
import DailyReportComponent from "../../components/dailyReport";
import { dailyReportMachine } from "./DailyReportMachine";
import { useInvokeGetDailyReport } from "./dataService";
import { actions } from "./stateActions";

function DailyReport(props: any) {
  props.graphQLClient.setHeader(
    "Authorization",
    "Basic " + localStorage.getItem("data")
  );
  
  const { mutateAsync: invokeGetDailyReport } = useInvokeGetDailyReport(
    props.graphQLClient
  );

  const [state, send] = useMachine(dailyReportMachine, {
    actions,
    services: {
      invokeGetDailyReport: () => invokeGetDailyReport(),
    },
  });

  return <DailyReportComponent {...state.context}/>;
}

export default DailyReport;

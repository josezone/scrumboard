import { useMachine } from "@xstate/react";
import DailyReportComponent from "../../components/dailyReport/DailyReport";
import { dailyReportMachine } from "./DailyReportMachine";
import { useInvokeGetDailyReport } from "./dataService";
import { actions } from "./stateActions";

function DailyReport(props: any) {
  const { mutateAsync: invokeGetDailyReport } = useInvokeGetDailyReport(
    props.graphQLClient
  );

  const [state, send] = useMachine(dailyReportMachine, {
    actions,
    services: {
      invokeGetDailyReport: () => invokeGetDailyReport(),
    },
  });

  console.log(state.context)
  return <DailyReportComponent {...state.context}/>;
}

export default DailyReport;

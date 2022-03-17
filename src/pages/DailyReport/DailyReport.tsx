import { useMachine } from "@xstate/react";
import DailyReportComponent from "../../components/Report";
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

  const dailyReportTitle = `Daily Report for Scrum: ${
    state?.context?.scrumName?.split("T")[0]
  }`;

  return (
    <DailyReportComponent
      // {...state.context}
      reportItems={state.context.dailyReport}
      title={dailyReportTitle}
    />
  );
}

export default DailyReport;

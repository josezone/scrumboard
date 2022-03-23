import { useMachine } from "@xstate/react";
import DailyReportComponent from "../../components/Report";
import { dailyReportMachine } from "./DailyReportMachine";
import { useServices } from "./dataService";
import { actions } from "./stateActions";

function DailyReport(props: any) {
  props.graphQLClient.setHeader(
    "Authorization",
    "Basic " + localStorage.getItem("data")
  );
  const services = useServices(props);

  const [state, send] = useMachine(dailyReportMachine, {
    actions,
    services
  });

  const dailyReportTitle = `Daily Report for Scrum: ${state?.context?.scrumName?.split("T")[0]
    }`;

  return (
    <DailyReportComponent
      // {...state.context}
      {...state.context}
      send={send}
      reportItems={state.context.dailyReport}
      title={dailyReportTitle}
    />
  );
}

export default DailyReport;

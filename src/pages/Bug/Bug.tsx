import { useParams } from "react-router-dom";
import { bugMachine } from "./bugMachine";
import {
  useInvokeDeleteBug,
  useInvokeGetList,
  useInvokeNewBug,
  useInvokeUpdateReport,
} from "./dataService";
import { useMachine } from "@xstate/react";
import { actions } from "./stateActions";
import BugList from "../../components/bugList/BugList";
import { useInvokeResourceList } from "../Home/dataService";

function Bug(props: any) {
  const { id } = useParams<"id">();

  const { mutateAsync: invokeNewBug } = useInvokeNewBug(props.graphQLClient);

  const { mutateAsync: invokeGetList } = useInvokeGetList(props.graphQLClient);

  const { mutateAsync: invokeResourceList } = useInvokeResourceList(
    props.graphQLClient
  );

  const { mutateAsync: invokeUpdateReport } = useInvokeUpdateReport(
    props.graphQLClient
  );

  const { mutateAsync: invokeDeleteBug } = useInvokeDeleteBug(
    props.graphQLClient
  );

  const [state, send] = useMachine(bugMachine, {
    actions,
    services: {
      invokeResourceList: () => invokeResourceList(),
      invokeNewBug: (context: any) =>
        invokeNewBug({
          bug: context.newBug.bug,
          evidence: context.newBug.evidence,
          impact: context.newBug.impact ? context.newBug.impact : null,
          report: context.newBug.report ? true : false,
          resource_id: context.newBug.resource,
          spilled: context.newBug.spilled ? true : false,
          ticket_id: id,
        }),
      invokeGetList: (context: any) => invokeGetList({ ticket_id: id }),
      invokeUpdateReport: (context: any) =>
        invokeUpdateReport({
          bug: context.updateBugReport.bug,
          report: context.updateBugReport.report,
        }),
      invokeDeleteBug: (context: any) =>
        invokeDeleteBug({
          id: context.removeBug,
        }),
    },
  });

  return <BugList {...state.context} send={send} />;
}

export default Bug;

import { useParams, useSearchParams } from "react-router-dom";
import { bugMachine } from "./bugMachine";
import {
  useInvokeDeleteBug,
  useInvokeGetList,
  useInvokeNewBug,
  useInvokeUpdateReport,
  useInvokeGetTicket,
  useInvokeUpdateAddtoSPR
} from "./dataService";
import { useMachine } from "@xstate/react";
import { actions } from "./stateActions";
import BugList from "../../components/bugList/BugList";
import { useInvokeResourceList } from "../Home/dataService";

function Bug(props: any) {
  const { id } = useParams<"id">();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  props.graphQLClient.setHeader(
    "Authorization",
    "Basic " + localStorage.getItem("data")
  );

  const { mutateAsync: invokeGetTicket } = useInvokeGetTicket(
    props.graphQLClient
  );

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

  const { mutateAsync: invokeupdateAddtoSPR } = useInvokeUpdateAddtoSPR(
    props.graphQLClient
  );

  const [state, send] = useMachine(bugMachine, {
    actions,
    services: {
      invokeGetTicket: (context: any) =>
        invokeGetTicket({ ticketId: id ? parseInt(id) : null }),
      invokeResourceList: () => invokeResourceList(),
      invokeNewBug: (context: any) =>
        invokeNewBug({
          bugType: type,
          bug: context.newBug.bug,
          evidence: context.newBug.evidence,
          impact: context.newBug.impact ? context.newBug.impact : null,
          report: context.newBug.report ? true : false,
          resource_id: context.newBug.resource,
          spilled: context.newBug.spill ? true : false,
          ticket_id: id,
          ...context.newBug,
        }),
      invokeGetList: (context: any) =>
        invokeGetList({ bugType: type, ticket_id: id }),
      invokeUpdateReport: (context: any) =>
        invokeUpdateReport({
          bug: context.updateBugReport.bug,
          report: context.updateBugReport.report,
        }),
      invokeDeleteBug: (context: any) =>
        invokeDeleteBug({
          id: context.removeBug,
        }),
        invokeupdateAddtoSPR: (context: any) =>
        invokeupdateAddtoSPR({
          bug: context.updateAddToSPR.bug,
          report: context.updateAddToSPR.report,
        }),
    },
  });

  return <BugList {...state.context} send={send} bugType={type} />;
}

export default Bug;

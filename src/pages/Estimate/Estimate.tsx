import { useMachine } from "@xstate/react";
import { useInvokeGetTicketsList, useInvokeRemoveTicket } from "./dataService";
import { estimateMachine } from "./estimateMachine";
import { actions } from "./stateActions";

function Estimate(props: any) {
    props.graphQLClient.setHeader(
        "Authorization",
        "Basic " + localStorage.getItem("data")
    );

    const { mutateAsync: invokeGetTicketList } = useInvokeGetTicketsList(
        props.graphQLClient
    );
    const { mutateAsync: invokeRemoveTicket } = useInvokeRemoveTicket(
        props.graphQLClient
    );

    const [state, send] = useMachine(estimateMachine, {
        actions,
        services: {
            invokeGetTicketList: () => invokeGetTicketList(),
            invokeRemoveTicket: (context: any) => invokeRemoveTicket({ ticketId: context.selectedTicketId }),
        }
    });

    return (
        <div>
            hello
        </div>
    )
}

export default Estimate;

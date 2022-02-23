import { useMachine } from "@xstate/react";
import EstimateGraph from "../../components/estimateGraph/EstimateGraph";
import { useServices } from "./dataService";
import { estimateMachine } from "./estimateMachine";
import { actions } from "./stateActions";

function Estimate(props: any) {
    props.graphQLClient.setHeader(
        "Authorization",
        "Basic " + localStorage.getItem("data")
    );

    const services = useServices(props);
    const [state, send] = useMachine(estimateMachine, { actions, services });
    return (
        <div>
            <EstimateGraph {...state.context} send={send}/>
        </div>
    )
}

export default Estimate;

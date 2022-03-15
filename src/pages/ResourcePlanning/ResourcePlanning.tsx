import { useMachine } from "@xstate/react";
import { useServices } from "./dataService";
import { resourcePlanningMachine } from "./resourcePlanningMachine";
import { actions } from "./stateActions";

function ResourcePlanning(props: any) {
    props.graphQLClient.setHeader(
        "Authorization",
        "Basic " + localStorage.getItem("data")
    );
    const services = useServices(props);
    const [state, send] = useMachine(resourcePlanningMachine, { actions, services })
    return (
        <div>ResourcePlanning</div>
    )
}

export default ResourcePlanning;
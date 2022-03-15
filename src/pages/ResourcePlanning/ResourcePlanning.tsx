import { useMachine } from "@xstate/react";
import ResourcePlanningTable from "../../components/resourcePlanning/ResourcePlaning";
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
        <ResourcePlanningTable  {...state.context} send={send}/>
    )
}

export default ResourcePlanning;
import { Fragment } from "react";

import { useMachine } from "@xstate/react";
import ResourcePlanningTable from "../../components/resourcePlanning/ResourcePlaning";
import { useServices } from "./dataService";
import { resourcePlanningMachine } from "./resourcePlanningMachine";
import { actions } from "./stateActions";
import { guards } from "./guardService";

function ResourcePlanning(props: any) {
    props.graphQLClient.setHeader(
        "Authorization",
        "Basic " + localStorage.getItem("data")
    );
    const services = useServices(props);
    const [state, send] = useMachine(resourcePlanningMachine, { actions, services, guards })

    return (
        <Fragment>
            <ResourcePlanningTable  {...state.context} send={send} />
        </Fragment>
    )
}

export default ResourcePlanning;
import { Fragment, useState } from "react";

import { useMachine } from "@xstate/react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { actions } from "./stateActions";
import { estimateMachine } from "./estimateMachine";
import { useServices } from "./dataService";

import EstimateGraph from "../../components/estimateGraph/EstimateGraph";
import EstimateReport from "../EstimateReport/EstimateReport";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function Estimate(props: any) {
  props.graphQLClient.setHeader(
    "Authorization",
    "Basic " + localStorage.getItem("data")
  );

  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const services = useServices(props);
  const [state, send] = useMachine(estimateMachine, { actions, services });
  return (
    <Fragment>
      <Tabs value={value} onChange={handleChange} className="tabBar">
        <Tab label="Estimate" />
        <Tab label="Report" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <EstimateGraph {...state.context} send={send} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EstimateReport graphQLClient={props.graphQLClient} />
      </TabPanel>

      <div></div>
    </Fragment>
  );
}

export default Estimate;

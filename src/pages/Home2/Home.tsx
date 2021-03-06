import { useMachine } from "@xstate/react";
import { homeMachine } from "./homeMachine";
import { getQuery, useServices } from "./dataService";
import { actions } from "./stateActions";
import HomeComponent from "../../components/home/Home";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Resources from "../Resources/Resource";
import { useEffect, useState } from "react";
import { createClient } from "graphql-ws";

const client = createClient({
  url: (process.env.REACT_APP_API_URL as string).replace("http", "ws"),
  connectionParams: async () => {
    return {
      headers: {
        Authorization: "Basic " + localStorage.getItem("data"),
      },
    };
  },
});

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

function DailyReport(props: any) {
  props.graphQLClient.setHeader(
    "Authorization",
    "Basic " + localStorage.getItem("data")
  );
  const [value, setValue] = useState(0);

  const services = useServices(props);

  const [state, send] = useMachine(homeMachine, {
    actions,
    services,
  });

  useEffect(() => {
    let unsubscribe: any;
    if (state.context.sprintSelected?.id) {
      unsubscribe = getQuery(state.context.sprintSelected.id, client, send);
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [state.context.sprintSelected?.id]);

  const handleChange = (event: any, newValue: any) => {
    if (newValue === 0) {
      send({ type: "resourceList" });
    }
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange} className="tabBar">
        <Tab label="Scrum" />
        <Tab label="Resources" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <HomeComponent {...state.context} send={send} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Resources graphQLClient={props.graphQLClient}></Resources>
      </TabPanel>
    </>
  );
}

export default DailyReport;

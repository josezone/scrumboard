import { Fragment, useState } from "react";

import DailyReport from "../DailyReport/DailyReport";
import SprintReport from "../SprintReport/sprintReport";
import TotalSP from "../TotalSP/TotalSP";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

function TabPanel(props: any) {

  props.graphQLClient.setHeader(
    "Authorization",
    "Basic " + localStorage.getItem("data")
  );

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

function Report(props: any) {
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  return (
    <Fragment>
      <Tabs value={value} onChange={handleChange} className="tabBar">
        <Tab label="Total SP" />
        <Tab label="Daily Report" />
        <Tab label="Sprint Report" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TotalSP graphQLClient={props.graphQLClient} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DailyReport graphQLClient={props.graphQLClient} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SprintReport graphQLClient={props.graphQLClient} />
      </TabPanel>
    </Fragment>
  );
}

export default Report;

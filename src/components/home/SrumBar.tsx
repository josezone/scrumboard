import TopBar from "./TopBar";

import AppBar from "../../components/appBar/AppBar";
import Box from "@mui/material/Box";
import ItemSelect from "../../components/itemSelect/ItemSelect";
import BoltIcon from "@mui/icons-material/Bolt";
import IconButton from "@mui/material/IconButton";

export function dateConvert(val: string) {
  if (!val) {
    return val;
  }
  return (
    new Date(val).toLocaleString("default", {
      month: "long",
    }) +
    " " +
    new Date(val).getDate()
  );
}

function ScrumBar(props: any) {
  const scrumItems: Array<any> = props.scrumList?.map((scrum: any) => ({
    key: scrum?.id,
    value: scrum?.id,
    label: dateConvert(scrum.scrum),
  }));

  const sprintItem = props.sprintList?.map((sprint: any) => ({
    key: sprint?.id,
    value: sprint?.id,
    label: sprint.sprint,
  }));

  const handleScrumChange = (event: any) => {
    const data = props.scrumList?.filter((scrum: any) => {
      return parseInt(event.target.value) === scrum.id;
    })[0];
    props.send({ type: "scrumChanged", data });
  };

  const handleSprintChange = (event: any) => {
    const data = props.sprintList?.filter(
      (sprint: any) => parseInt(event.target.value) === sprint.id
    )[0];
    props.send({ type: "sprintChanged", data });
  };

  const activateScrum = () => {
    props.send({ type: "activateScrum" });
  };

  return (
    <div>
      <TopBar {...props} />
      <AppBar>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <ItemSelect
            items={scrumItems}
            defaultItem={props.scrumSelected?.id}
            onChange={handleScrumChange}
            name="Scrum"
            id="selectScrumNative"
            showList={props.scrumSelected?.id && true}
          ></ItemSelect>
          {props.scrumSelected && !props.scrumSelected.active && (
            <IconButton color="primary" onClick={activateScrum}>
              <BoltIcon />
            </IconButton>
          )}
          <ItemSelect
            items={sprintItem}
            defaultItem={props.sprintSelected?.id}
            onChange={handleSprintChange}
            name="Sprint"
            id="selectSprintNative"
            showList={
              props.sprintSelected?.id &&
              props.sprintList &&
              props.sprintList?.length &&
              true
            }
          ></ItemSelect>
        </Box>
      </AppBar>
    </div>
  );
}

export default ScrumBar;

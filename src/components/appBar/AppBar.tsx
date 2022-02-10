import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import ItemSelect from "../itemSelect/ItemSelect";

type yearItem = { key: number; value: number; label: number };
type scrumItem = { key: number; value: number; label: number };

function AppBarHeader(props: any) {
  const year = new Date().getFullYear();
  const yearItems: Array<yearItem> = [
    { key: year, value: year, label: year },
    { key: year - 1, value: year - 1, label: year - 1 },
  ];

  const scrumItems: Array<scrumItem> = props.scrumList?.map((scrum: any) => {
    const date =
      new Date(scrum.scrum).toLocaleString("default", {
        month: "long",
      }) +
      " " +
      new Date(scrum.scrum).getDate();
    return {
      key: scrum?.id,
      value: scrum?.id,
      label: date,
    };
  });

  const onYearChange = (event: any) => {
    props.send({ type: "yearChanged", prop: event.target.value });
  };

  const onScrumChange = (event: any) => {
    const selectedObjList = props.scrumList.filter(
      (obj: any) => obj.id === Number(event.target.value)
    );
    let selectedObj = {};
    if (selectedObjList.length) {
      selectedObj = selectedObjList[0];
    }
    props.send({ type: "scrumChanged", prop: selectedObj });
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {props.selectedScrum &&
              props.scrumList &&
              props.scrumList.length && (
                <ItemSelect
                  items={scrumItems}
                  defaultItem={props.selectedScrum.id}
                  onChange={onScrumChange}
                  name="Scrum"
                  id="selectNative"
                />
              )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <ItemSelect
              items={yearItems}
              defaultItem={year.toString()}
              onChange={onYearChange}
              name="Year"
              id="selectYearNative"
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppBarHeader;

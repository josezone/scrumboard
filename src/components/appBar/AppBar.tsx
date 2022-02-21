import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import ItemSelect from "../itemSelect/ItemSelect";
import AddNew from "../addNewAppBar/addNewAppBar";
import HomeSelection from "../homeSelection/HomeSelection";

import { AppBarWrapper } from "./AppBar.style";

type yearItem = { key: number; value: number; label: number };
type scrumItem = { key: number; value: number; label: number };
type sprintItem = { key: number; value: number; label: string };

function AppBarHeader(props: any) {
  const [projectModal, setProjectModal] = useState<boolean>(false);

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
  const sprintItems: Array<sprintItem> = props.sprintList?.map(
    (sprint: any) => {
      return {
        key: sprint?.id,
        value: sprint?.id,
        label: sprint.sprint,
      };
    }
  );

  const projectItems: Array<any> = props.projectList?.map((project: any) => {
    return {
      key: project.id,
      value: project?.id,
      label: project.project,
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
  const onSprintChange = (event: any) => {
    const selectedSprintNew = props?.sprintList?.filter(
      (sprint: any) => sprint.id === Number(event.target.value)
    );
    if (selectedSprintNew.length) {
      props.send({ type: "sprintChanged", prop: selectedSprintNew[0] });
    }
  };
  const onProjectChanged = (event: any) => {
    const project = props?.projectList?.filter(
      (project: any) => project.id === Number(event.target.value)
    );
    if (project.length) {
      props.send({ type: "projectChanged", prop: project[0] });
    }
  };

  const openCreateScrum = () => {
    props.send({ type: "createScrumPopupOpen" });
  };
  const openCreateSprint = () => {
    props.send({ type: "createSprintPopupOpen" });
  };
  const handleProjectModal = (): void => {
    setProjectModal((m) => !m);
  };
  return (
    <AppBarWrapper>
      <AppBar position="static">
        <Container maxWidth={false}>
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              {/* {props.selectedScrum &&
                props.scrumList &&
                props.scrumList.length && ( */}
              <ItemSelect
                items={scrumItems}
                defaultItem={props.selectedScrum?.id}
                onChange={onScrumChange}
                name="Scrum"
                id="selectScrumNative"
                showList={
                  props.selectedScrum &&
                  props.scrumList &&
                  props.scrumList.length &&
                  true
                }
              >
                <AddNew addNew={openCreateScrum}></AddNew>
              </ItemSelect>
              {/* )} */}

              {props.selectedProject && (
                <ItemSelect
                  items={sprintItems}
                  defaultItem={props.selectedSprint?.id}
                  onChange={onSprintChange}
                  name="Sprint"
                  id="selectSprintNative"
                  showList={
                    props.selectedSprint &&
                    props.sprintList &&
                    props.sprintList.length &&
                    true
                  }
                >
                  <AddNew addNew={openCreateSprint}></AddNew>
                </ItemSelect>
              )}

              {/* {props.selectedProject && ( */}
              <ItemSelect
                items={projectItems}
                defaultItem={props.selectedProject?.id}
                onChange={onProjectChanged}
                name="Project"
                id="selectProjectNative"
                showList={
                  props.selectedProject &&
                  props.projectList &&
                  props.projectList.length &&
                  true
                }
              >
                <AddNew addNew={handleProjectModal}></AddNew>
              </ItemSelect>
              {/* )} */}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <ItemSelect
                items={yearItems}
                defaultItem={year.toString()}
                onChange={onYearChange}
                name="Year"
                id="selectYearNative"
                showList={true}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <HomeSelection
        {...props}
        projectModal={projectModal}
        handleProjectModal={handleProjectModal}
      ></HomeSelection>
    </AppBarWrapper>
  );
}
export default AppBarHeader;

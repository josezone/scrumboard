import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import EditIcon from "@mui/icons-material/Edit";

import ItemSelect from "../itemSelect/ItemSelect";
import AddNew from "../addNewAppBar/addNewAppBar";
import HomeSelection from "../homeSelection/HomeSelection";

import { AppBarWrapper, EditIconWrapper } from "./AppBar.style";
import ScrumSelection from "../homeSelection/ScrumSelection";
import SprintSelection from "../homeSelection/SprintSelection";
import ProjectGroupSelection from "../homeSelection/projectGroupSelection";

type yearItem = { key: number; value: number; label: number };
type scrumItem = { key: number; value: number; label: number };
type sprintItem = { key: number; value: number; label: string };

function AppBarHeader(props: any) {
  const [projectModal, setProjectModal] = useState<boolean>(false);
  const [projectGroupModal, setProjectGroupModal] = useState<boolean>(false);
  const [editSprint, setEditSprint] = useState(false);

  const handleSprintEdit = (): void => {
    setEditSprint((m) => !m);
  };

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

  const projectGroups: Array<any> = props.projectGroupList?.map((projectGroup: any) => {
    return {
      key: projectGroup.id,
      value: projectGroup?.id,
      label: projectGroup.name,
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

  const onProjectGroupChanged = (event: any) => {
    const projectGroup = props?.projectGroupList?.filter(
      (projectGroup: any) => projectGroup.id === Number(event.target.value)
    );
    if (projectGroup.length) {
      props.send({ type: "projectGroupChanged", prop: projectGroup[0] });
    }
  };

  const onCountryChanged = (event: any) => {
    const countries = props?.countryList?.filter(
      (country: any) => country.id === Number(event.target.value)
    );
    if (countries.length) {
      props.send({ type: "countryChanged", prop: countries[0] });
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

  const handleProjectGroupModal = (): void => {
    setProjectGroupModal((m) => !m);
  }

  return (
    <AppBarWrapper>
      <AppBar position="static">
        <Container maxWidth={false}>
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: "flex" }}>

              <ItemSelect
                items={projectGroups}
                defaultItem={props.selectedProjectGroup?.id}
                onChange={onProjectGroupChanged}
                name="Project Group"
                id="selectProjectGroup"
                showList={
                  props.selectedProjectGroup &&
                  props.projectGroupList &&
                  props.projectGroupList.length
                }
              >
                <AddNew addNew={() => setProjectGroupModal(true)}></AddNew>
              </ItemSelect>

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
                <EditIconWrapper>
                  <EditIcon
                    color="primary"
                    onClick={handleSprintEdit}
                  ></EditIcon>
                </EditIconWrapper>
                <AddNew addNew={openCreateSprint}></AddNew>
              </ItemSelect>

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
      <ProjectGroupSelection {...props} projectGroupModal={projectGroupModal} handleProjectGroupModal={handleProjectGroupModal}/>
      <ScrumSelection {...props}></ScrumSelection>
      <SprintSelection
        {...props}
        editMode={editSprint}
        handleEditMode={handleSprintEdit}
        onProjectChanged={onProjectChanged}
        onCountryChanged={onCountryChanged}
      ></SprintSelection>
    </AppBarWrapper>
  );
}
export default AppBarHeader;

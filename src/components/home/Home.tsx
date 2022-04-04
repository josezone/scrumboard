import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import EditRoadIcon from "@mui/icons-material/EditRoad";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { useState } from "react";
import ModalComponent from "../modal/modal";
import NewSprint from "./NewSprint";
import NewTicket from "./NewTicket";
import NewVersion from "./NewVersion";
import ScrumBoard from "./ScrumBoard";
import ScrumItem from "./ScrumItem";
import ScrumBar from "./SrumBar";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NewScrum from "./NewScrum";

function HomeComponent(props: any) {
  const [open, setOpen] = useState(false);
  const [openSprint, setOpenSprint] = useState(false);
  const [openTicket, setOpenTicket] = useState(false);
  const [openEditSprint, setOpenEditSprint] = useState(false);
  const [openVersion, setOpenVersion] = useState(false);
  const [openScrum, setOpenScrum] = useState(false);

  const toggleOpen = () => setOpen((s) => !s);
  const toggleOpenSprint = () => setOpenSprint((s) => !s);
  const toggleOpenEditSprint = () => setOpenEditSprint((s) => !s);
  const toggleOpenTicket = () => setOpenTicket((s) => !s);
  const toggleOpenVersion = () => setOpenVersion((s) => !s);
  const toggleOpenScrum = () => setOpenScrum((s) => !s);

  const actions = [
    {
      icon: <CalendarMonthIcon onClick={toggleOpenScrum} />,
      name: "New Scrum",
    },
    { icon: <AddTaskIcon onClick={toggleOpenVersion} />, name: "New Version" },
    { icon: <NewspaperIcon onClick={toggleOpenSprint} />, name: "New Sprint" },
    {
      icon: <CreateNewFolderIcon onClick={toggleOpenTicket} />,
      name: "New Ticket",
    },
    {
      icon: <EditRoadIcon onClick={toggleOpenEditSprint} />,
      name: "Edit Sprint",
    },
  ];

  return (
    <div>
      <ScrumBar {...props} />
      <ScrumBoard {...props} ScrumItem={ScrumItem} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip create"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={toggleOpen}
        onOpen={toggleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={toggleOpen}
          />
        ))}
      </SpeedDial>
      <ModalComponent
        open={openTicket}
        handleClose={toggleOpenTicket}
        title="New Ticket"
        componentsProps={{ data: props }}
      >
        <NewTicket toggleOpenTicket={toggleOpenTicket} />
      </ModalComponent>

      <ModalComponent
        open={openEditSprint}
        handleClose={toggleOpenEditSprint}
        title="Edit Sprint"
        componentsProps={{ data: props }}
      >
        <NewSprint toggleOpenTicket={toggleOpenEditSprint} editMode={true} />
      </ModalComponent>

      <ModalComponent
        open={openSprint}
        handleClose={toggleOpenSprint}
        title="New Sprint"
        componentsProps={{ data: props }}
      >
        <NewSprint toggleOpenTicket={toggleOpenSprint} />
      </ModalComponent>

      <ModalComponent
        open={openVersion}
        handleClose={toggleOpenVersion}
        title="New Version"
        componentsProps={{ data: props }}
      >
        <NewVersion toggleOpenVersion={toggleOpenVersion} />
      </ModalComponent>

      <ModalComponent
        open={openScrum}
        handleClose={toggleOpenScrum}
        title="New Scrum"
        componentsProps={{ data: props }}
      >
        <NewScrum toggleOpenScrum={toggleOpenScrum} />
      </ModalComponent>
    </div>
  );
}

export default HomeComponent;

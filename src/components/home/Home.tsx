import ScrumBar from "./SrumBar";
import ScrumBoard from "./ScrumBoard";
import ScrumItem from "./ScrumItem";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useState } from "react";

import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import NewTicket from "./NewTicket";
import ModalComponent from "../modal/modal";
import NewSprint from "./NewSprint";

function HomeComponent(props: any) {
  const [open, setOpen] = useState(false);
  const [openSprint, setOpenSprint] = useState(false);
  const [openTicket, setOpenTicket] = useState(false);
  const toggleOpen = () => setOpen((s) => !s);
  const toggleOpenSprint = () => setOpenSprint((s) => !s);
  const toggleOpenTicket = () => setOpenTicket((s) => !s);
  const actions = [
    { icon: <NewspaperIcon onClick={toggleOpenSprint} />, name: "New Sprint" },
    {
      icon: <CreateNewFolderIcon onClick={toggleOpenTicket} />,
      name: "New Ticket",
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
        open={openSprint}
        handleClose={toggleOpenSprint}
        title="New Sprint"
        componentsProps={{ data: props }}
      >
        <NewSprint toggleOpenTicket={toggleOpenSprint} />
      </ModalComponent>
    </div>
  );
}

export default HomeComponent;

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import ModalComponent from "../modal/modal";
import NewNote from "./newNote";
import { VersionEntryStyle } from "./versionEntry.style";
import VersionList from "./versionList";

function VersionEntry(props: any) {
  const [openNewNote, setOpenNewNote] = useState(false);

  const toggleOpenNewNote = () => setOpenNewNote((s) => !s);

  const dropDownChange = (type: string, itemList: string) => (event: any) => {
    const defaultValue = props[itemList].filter(
      (item: any) => item.id === event.target.value
    )[0];
    props.send({ type, data: defaultValue });
  };

  return (
    <VersionEntryStyle>
      {props.selectedProjectGroup?.id && (
        <Select
          value={props.selectedProjectGroup?.id}
          label="Project Group"
          onChange={dropDownChange("projectGroupChanged", "projectGroupList")}
        >
          {props.projectGroupList.map((projectGroup: any) => (
            <MenuItem key={projectGroup.name} value={projectGroup.id}>
              {projectGroup.name}
            </MenuItem>
          ))}
        </Select>
      )}

      {props.selectedProject?.id && (
        <Select
          value={props.selectedProject?.id}
          label="Project"
          onChange={dropDownChange("projectChanged", "projectList")}
        >
          {props.projectList.map((project: any) => (
            <MenuItem key={project.project} value={project.id}>
              {project.project}
            </MenuItem>
          ))}
        </Select>
      )}

      {props.defaultCountry?.id && (
        <Select
          value={props.defaultCountry?.id}
          label="Country"
          onChange={dropDownChange("countryChanged", "countryList")}
        >
          {props.countryList.map((country: any) => (
            <MenuItem key={country.country} value={country.id}>
              {country.country}
            </MenuItem>
          ))}
        </Select>
      )}

      {props.selectedVersion?.id && (
        <Select
          value={props.selectedVersion?.id}
          label="Version"
          onChange={dropDownChange("versionChanged", "versionList")}
        >
          {props.versionList.map((version: any) => (
            <MenuItem key={version.version} value={version.id}>
              {version.version}
            </MenuItem>
          ))}
        </Select>
      )}

      <ModalComponent
        open={openNewNote}
        handleClose={toggleOpenNewNote}
        title="New Note"
        componentsProps={{ data: props }}
      >
        <NewNote {...props} />
      </ModalComponent>

      <VersionList {...props} />
      <Fab variant="extended" className="addButton" onClick={toggleOpenNewNote}>
        <AddIcon sx={{ mr: 1 }} />
        Add Notes
      </Fab>
    </VersionEntryStyle>
  );
}

export default VersionEntry;

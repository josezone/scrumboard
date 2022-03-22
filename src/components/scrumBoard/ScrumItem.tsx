import { DndItemStyled } from "./DndItem.style";
import EditIcon from "@mui/icons-material/Edit";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import BugReportIcon from "@mui/icons-material/BugReport";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useState } from "react";
import ModalComponent from "../modal/modal";
import EditTicket from "./EditTicket";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Checkbox from '@mui/material/Checkbox';

function storyPoint(props: any) {
  const el = [];
  if (props.scope.scope.includes("FE")) {
    let story;
    if (props.spill) {
      story = props.fe_spill;
    } else {
      story = props.fe_story;
    }
    el.push(
      <div key="FE">
        <span>FE:</span>
        {story}
      </div>
    );
  }
  if (props.scope.scope.includes("BE")) {
    let story;
    if (props.spill) {
      story = props.be_spill;
    } else {
      story = props.be_story;
    }
    el.push(
      <div key="BE">
        <span>BE:</span>
        {story}
      </div>
    );
  }
  if (props.scope.scope.includes("QA")) {
    let story;
    if (props.spill) {
      story = props.qa_spill;
    } else {
      story = props.qa_story;
    }
    el.push(
      <div key="QA">
        <span>QA:</span>
        {story}
      </div>
    );
  }
  return <div className="storyPoints">{el}</div>;
}

function ScrumItem(props: any) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (buttonAction: any) => () => {
    setAnchorEl(null);
    if (buttonAction) {
      buttonAction();
    }
  };

  const navigate = useNavigate();
  const [editModal, setEditModal] = useState<boolean>(false);

  function removeClicked() {
    props.removeItem(
      props.droppableIndx,
      props.draggableIndx,
      props.id as number
    );
  }

  function issueClicked() {
    navigate(`/issue/${props.id}`);
  }

  const toggleModal = (): void => {
    setEditModal(m => !m);
  }

  const estimateClicked = () => {
    props.restProps.send({ type: "toggleEstimate", prop: { id: props.id, estimation: props.estimation ? false : true } });
  }

  const navigateToTicket = () => {
    if (!props.link) return;
    window.open(props.link, "_blank")
  }

  function menuList() {
    return (
      <div className="menuList">
        <IconButton
          id="long-button"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose(null)}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: '20ch',
            },
          }}
        >
          <MenuItem onClick={handleClose(toggleModal)}>
            <IconButton >
              <EditIcon />
            </IconButton>
            Edit
          </MenuItem>

          <MenuItem onClick={handleClose(removeClicked)}>
            <IconButton>
              <PlaylistRemoveIcon />
            </IconButton>
            Delete
          </MenuItem>

          <MenuItem onClick={handleClose(estimateClicked)}>
            <Checkbox checked={props.estimation} />
            Estimate
          </MenuItem>

        </Menu>
      </div>
    );
  }

  return (
    <DndItemStyled>
      <EditTicket {...props} editModal={editModal} handleClose={toggleModal} />
      <div
        className={
          props.priority.priority === "Critical"
            ? "priorityCritical"
            : props.priority.priority === "High"
              ? "priorityHigh"
              : props.priority.priority === "Normal"
                ? "priorityNormal"
                : "priorityLow"
        }
      >
        <div className="editContainer">
          <IconButton onClick={issueClicked}>
            <BugReportIcon />
          </IconButton>
          {menuList()}
        </div>
        <div className="dndItem">
          <div className="ticketContainer">
            <div className="ticketNumberStyle" onClick={navigateToTicket}>{props.ticket}</div>
            <div>{props.scope.scope}</div>
          </div>
          <div className="ticketVersion">
            <div>
              <span>ver:</span>
              {props.version.version}
            </div>
          </div>
          <div>{storyPoint(props)}</div>
          <div className="resourceWrap">
            {props.ticket_resources &&
              props.ticket_resources?.map((item: any, index: any) => {
                return (
                  <div key={index} className="borderItem">
                    {item.resource.resource}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </DndItemStyled>
  );
}

export default ScrumItem;

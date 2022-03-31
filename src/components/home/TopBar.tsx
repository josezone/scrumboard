import { useState } from "react";
import { TopBarStyled } from "./TopBar.style";

function TopBar(props: any) {
  const [selectProjectGroup, setSelectProjectGroup] = useState(false);
  const [selectProject, setSelectProject] = useState(false);

  const toggleProjectGroupSelect = () => {
    setSelectProjectGroup((m) => !m);
    if (selectProject) {
      toggleProjectSelect();
    }
  };

  const toggleProjectSelect = () => {
    setSelectProject((m) => !m);
    if (selectProjectGroup) {
      toggleProjectGroupSelect();
    }
  };

  const updateProjectGroup = (projectGroup: any) => () => {
    props.send({ type: "projectGroupChanged", data: projectGroup });
    toggleProjectGroupSelect();
  };

  const updateProject = (project: any) => () => {
    props.send({ type: "projectChanged", data: project });
    toggleProjectSelect();
  };

  return (
    <TopBarStyled>
      <div className="projectGroup">
        <div>
          {!selectProjectGroup && (
            <div onClick={toggleProjectGroupSelect} className="selected">
              {props?.projectGroupSelected?.name?.toLowerCase()}
            </div>
          )}
          {selectProjectGroup &&
            props.projectGroupList?.map((projectGroup: any) => {
              return (
                <div
                  key={projectGroup.name}
                  onClick={updateProjectGroup(projectGroup)}
                  className="selected"
                >
                  {projectGroup?.name?.toLowerCase()}
                </div>
              );
            })}
        </div>
        <div>{">"}</div>
        <div>
          {!selectProject && (
            <div onClick={toggleProjectSelect} className="selected">
              {props?.projectSelected?.project?.toLowerCase()}
            </div>
          )}
          {selectProject &&
            props.projectList?.map((project: any) => {
              return (
                <div
                  key={project.name}
                  onClick={updateProject(project)}
                  className="selected"
                >
                  {project?.project?.toLowerCase()}
                </div>
              );
            })}
        </div>
      </div>
    </TopBarStyled>
  );
}

export default TopBar;

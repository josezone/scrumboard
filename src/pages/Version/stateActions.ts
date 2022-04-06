import { assign } from "xstate";

const assignProjectGroupVersionTypeList = assign({
  projectGroupList: (context: any, event: any) => {
    return event.data["project_group"];
  },
  versionTypeList: (context: any, event: any) => {
    return event.data["version_notes_type"];
  },
});

const assignDefaultProjectGroup = assign({
  selectedProjectGroup: (context: any, event: any) => {
    return context.projectGroupList.sort((a: any, b: any) => a.id - b.id)[0];
  },
});

const assignProjectList = assign({
  projectList: (context: any, event: any) => {
    return event.data.project;
  },
});

const assignDefaultProject = assign({
  selectedProject: (context: any, event: any) => {
    return context.projectList.sort((a: any, b: any) => a.id - b.id)[0];
  },
});

const assignVersionList = assign({
  versionList: (context: any, event: any) => {
    return event.data.version;
  },
});

const updateDefaultProjectGroup = assign({
  selectedProjectGroup: (context: any, event: any) => {
    return event.data;
  },
});

const updateDefaultProject = assign({
  selectedProject: (context: any, event: any) => {
    return event.data;
  },
});

const assignNewVersionNotes = assign({
  newVersionNotes: (context: any, event: any) => {
    return event.data;
  },
});

export const actions = {
  assignProjectGroupVersionTypeList,
  assignDefaultProjectGroup,
  assignProjectList,
  assignDefaultProject,
  assignVersionList,
  updateDefaultProjectGroup,
  updateDefaultProject,
  assignNewVersionNotes,
};

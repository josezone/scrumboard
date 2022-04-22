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

const assignCountryList = assign({
  countryList: (context: any, event: any) => {
    return event.data.country;
  },
});

const assignProjectList = assign({
  projectList: (context: any, event: any) => {
    return event.data.project;
  },
});

const assignDefaultCountry = assign({
  defaultCountry: (context: any, event: any) => {
    return context.countryList.sort((a: any, b: any) => a.id - b.id)[0];
  },
});

const assignDefaultVersion = assign({
  selectedVersion: (context: any, event: any) => {
    return context.versionList.sort((a: any, b: any) => b.id - a.id)[0];
  },
});

const updateDefaultVersion = assign({
  selectedVersion: (context: any, event: any) => {
    return event.data;
  },
  versionNotes: () => [],
  versionTickets: () => [],
});

const updateDefaultCountry = assign({
  defaultCountry: (context: any, event: any) => {
    return event.data;
  },
  versionList: () => [],
  selectedVersion: () => undefined,
  versionNotes: () => [],
  versionTickets: () => [],
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
  projectList: () => [],
  selectedProject: () => undefined,
  versionList: () => [],
  selectedVersion: () => undefined,
  countryList: () => [],
  defaultCountry: () => undefined,
  versionNotes: () => [],
  versionTickets: () => [],
});

const updateDefaultProject = assign({
  selectedProject: (context: any, event: any) => {
    return event.data;
  },
  versionList: () => [],
  selectedVersion: () => undefined,
  countryList: () => [],
  defaultCountry: () => undefined,
  versionNotes: () => [],
  versionTickets: () => [],
});

const assignVersionData = assign({
  versionNotes: (context: any, event: any) => {
    return event.data.version_notes;
  },
  versionTickets: (context: any, event: any) => {
    return event.data.ticket;
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
  assignCountryList,
  assignDefaultCountry,
  updateDefaultCountry,
  assignDefaultVersion,
  assignVersionData,
  updateDefaultVersion,
};

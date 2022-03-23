import { assign } from "xstate";

const assignResourceModalToggle = assign({
  resourceModal: (context: any, event: any) => {
    return !context.resourceModal;
  },
});

const assignUpdateResourceModalToggle = assign({
  updateResourceModal: (context: any, event: any) => {
    return !context.updateResourceModal;
  },
});

const assignResourceTypeList = assign({
  resourceTypeList: (context: any, event: any) => {
    return event.data.resource_type;
  },
});

const assignResourceList = assign({
  resourceList: (context: any, event: any) => {
    return event.data.resource;
  },
});

const assignNewResource = assign({
  newResource: (context: any, event: any) => {
    return event.data;
  },
});

const assignUpdateResource = assign({
  updateResource: (context: any, event: any) => {
    return event.data;
  },
});

const assignChangingResource = assign({
  changingResource: (context: any, event: any) => {
    return event.data;
  },
});

const clearChangingResource = assign({
  changingResource: (context: any, event: any) => {
    return {};
  },
});

const clearUpdateResource = assign({
  updateResource: (context: any, event: any) => {
    return {};
  },
});
export const actions = {
  assignUpdateResourceModalToggle,
  assignResourceModalToggle,
  assignChangingResource,
  clearChangingResource,
  assignResourceTypeList,
  assignUpdateResource,
  clearUpdateResource,
  assignResourceList,
  assignNewResource,
};

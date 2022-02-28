import { assign } from "xstate";

const assignResourceModalToggle = assign({
  resourceModal: (context: any, event: any) => {
    return !context.resourceModal;
  },
});

const assignResourceUpdateModalToggle = assign({
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
      debugger;
    return event.data.resource;
  },
});

const assignNewResource = assign({
  newResource: (context: any, event: any) => {
    return event.data;
  },
});

export const actions = {
  assignResourceUpdateModalToggle,
  assignResourceModalToggle,
  assignResourceTypeList,
  assignResourceList,
  assignNewResource
};

import { createMachine } from "xstate";

export const resourceMachine = createMachine<any>({
  id: "main",
  initial: "getResourceList",
  context: {
    newResource: undefined,
    resourceList: [],
    removeResource: undefined,
    resourceType: [],
    resourceModal: false,
    changingResource: undefined,
    updateResource: undefined,
    updateResourceModal: false,
  },
  states: {
    idle: {
      on: {
        createResource: {
          actions: "assignResourceModalToggle",
          target: "createResource",
        },
        updateResource: {
          actions: "assignUpdateResourceModalToggle",
          target: "updateResource",
        },
        changeResourceStatus: {
          actions: "assignChangingResource",
          target: "changeResourceStatus",
        },
      },
    },
    getResourceList: {
      invoke: {
        id: "getResourceList",
        src: "invokeGetResourceList",
        onDone: {
          actions: "assignResourceList",
          target: "resourceType",
        },
        onError: {
          target: "resourceType",
        },
      },
    },
    resourceType: {
      invoke: {
        id: "resourceType",
        src: "invokeResourceTypeList",
        onDone: {
          actions: "assignResourceTypeList",
          target: "idle",
        },
        onError: {
          target: "idle",
        },
      },
    },
    updateResource: {
      initial: "idle",
      states: {
        idle: {
          on: {
            submit: {
              actions: "assignUpdateResource",
              target: "updateResource",
            },
            closeModal: {
              actions: "assignUpdateResourceModalToggle",
              target: "#main.idle",
            },
          },
        },
        updateResource: {
          invoke: {
            id: "updateResource",
            src: "invokeUpdateResource",
            onDone: {
              actions: [
                "assignUpdateResourceModalToggle",
                "clearUpdateResource",
              ],
              target: "#main.getResourceList",
            },
            onError: {
              target: "#main.idle",
            },
          },
        },
      },
    },
    createResource: {
      initial: "idle",
      states: {
        idle: {
          on: {
            submit: {
              actions: "assignNewResource",
              target: "newResource",
            },
            closeModal: {
              actions: "assignResourceModalToggle",
              target: "#main.idle",
            },
          },
        },
        newResource: {
          invoke: {
            id: "newResource",
            src: "invokeNewResource",
            onDone: {
              actions: ["assignResourceModalToggle", "clearNewResource"],
              target: "#main.getResourceList",
            },
            onError: {
              target: "#main.idle",
            },
          },
        },
      },
    },
    changeResourceStatus: {
      invoke: {
        id: "changeResourceStatus",
        src: "invokeChangeResourceStatus",
        onDone: {
          actions: "clearChangingResource",
          target: "#main.getResourceList",
        },
        onError: {
          target: "idle",
        },
      },
    },
  },
});

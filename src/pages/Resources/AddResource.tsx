import { Fragment, useEffect } from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import ModalComponent from "../../components/modal/modal";
import { ModalWrapper, AddResourceWrapper } from "./addResource.style";
import { ModalActionContainer } from "../../components/modal/modal.style";
// import { send } from "process";

const schema = yup
  .object({
    resource: yup.string().required(),
    resourceType: yup.string().required(),
  })
  .required();

function AddResources(props: any) {
  const {
    reset,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { editMode = false, context, resourceId } = props;

  const editResource =
    resourceId && editMode
      ? context?.resourceList?.find((x: any) => x.id === resourceId)
      : undefined;

  useEffect(() => {
    if (editMode) {
      setValue("resourceType",editResource?.resource_type?.id);
      setValue("resource", editResource?.resource);
    } else {
      setValue("resource", "");
      setValue("resourceType","");
    }
  }, [editMode, editResource, context?.updateResourceModal]);

  const onSubmit = (e: any) => {
    handleSubmit((data: any) => {
      reset();
      editMode && (data["resourceId"] = editResource.id);
      props.send({ type: "submit", data: data });
    })(e);
  };

  const resourceModalToggle = (): void => {
    props.send({ type: "closeModal" });
    reset();
  };

  return (
    <Fragment>
      {!editMode && (
        <AddResourceWrapper>
          <Button
            variant="contained"
            onClick={() => {
              props.send({ type: "createResource" });
            }}
          >
            Add Resource
          </Button>
        </AddResourceWrapper>
      )}

      <ModalComponent
        open={editMode ? context?.updateResourceModal : context?.resourceModal}
        handleClose={resourceModalToggle}
        title={editMode ? "Update Resource" : "Add Resource"}
      >
        <ModalWrapper>
          <form onSubmit={onSubmit}>
            <div>
              <InputLabel variant="standard" id="sprintInputTitle">
                Resource
              </InputLabel>
              <Controller
                name="resource"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="newResource"
                    error={errors.resource ? true : false}
                    helperText={errors?.resource?.message}
                  />
                )}
              />
            </div>
            <div>
              <InputLabel variant="standard">Resource Type</InputLabel>
              <Controller
                name="resourceType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="newResource"
                    error={errors.resourceType ? true : false}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {context?.resourceTypeList?.map((resourceType: any) => {
                      return (
                        <MenuItem
                          value={resourceType.id}
                          key={resourceType.resource_type}
                        >
                          {resourceType.resource_type}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
            </div>

            <ModalActionContainer>
              <Button onClick={resourceModalToggle}>Cancel</Button>
              <Button type="submit">{editMode ? "Update" : "Create"}</Button>
            </ModalActionContainer>
          </form>
        </ModalWrapper>
      </ModalComponent>
    </Fragment>
  );
}

export default AddResources;

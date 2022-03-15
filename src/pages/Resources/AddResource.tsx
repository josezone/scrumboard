import { Fragment } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ModalComponent from "../../components/modal/modal";
import * as yup from "yup";
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
  const { editMode, context } = props;
  const [resourceType, setResourceType] = useState("");
  const {
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (e: any) => {
    handleSubmit((data: any) => {
      reset();
      e.target.reset();
      setResourceType("");
      props.send({ type: "submit", data: data });
    })(e);
  };

  const resourceModalToggle = (): void => {
    props.send({ type: "closeModal" });
    reset();
    setResourceType("");
  };

  return (
    <Fragment>
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

      <ModalComponent
        open={context?.resourceModal}
        handleClose={resourceModalToggle}
        title={"Add Resource"}
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
                    value={resourceType}
                    onChange={(e: any) => {
                      setResourceType(e.target.value);
                      field.onChange(e);
                    }}
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
              <Button type="submit">Create</Button>
            </ModalActionContainer>
          </form>
        </ModalWrapper>
      </ModalComponent>
    </Fragment>
  );
}

export default AddResources;

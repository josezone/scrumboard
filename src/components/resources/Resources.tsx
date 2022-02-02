import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { ResourceStyle } from "./rsource.style";

const schema = yup
  .object({
    resource: yup.string().required(),
    resourceType: yup.string().required(),
  })
  .required();

function Resources(props: any) {
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
      props.send({ type: "newResource", prop: data });
    })(e);
  };

  return (
    <ResourceStyle>
      <form onSubmit={onSubmit}>
        <Controller
          name="resource"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="New Resource"
              variant="standard"
              className="newResource"
              error={errors.resource ? true : false}
              helperText={errors?.resource?.message}
            />
          )}
        />

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
              error={errors.country ? true : false}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {props?.resourceTypeList?.map((resourceType: any) => {
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

        <Fab size="small" color="primary" type="submit">
          <AddIcon />
        </Fab>
      </form>
      {props?.resourceList?.map((resource: any) => (
        <div>
          <div>{resource.resource}</div>
          <div>{resource.resource_type.resource_type}</div>
        </div>
      ))}
    </ResourceStyle>
  );
}

export default Resources;

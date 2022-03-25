import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import ModalComponent from "../modal/modal";
import { ProjectSelectionStyle } from "./projectSelection.style";
import { useState } from "react";

const schema = yup
  .object({
    projectGroup: yup.string().min(1).required(),
  })
  .required();

function ProjectGroupSelection(props: any) {
  const {
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [projectGroup, setProjectGorup] = useState<string>('')

  const onSubmit = (data: any) => {
    reset();
    setProjectGorup('');
    props.handleProjectGroupModal();
    props.send({ type: "createProjectGroup", prop: data.projectGroup.toString() });
  };

  return (
    <ModalComponent
      title="Create Project Group"
      handleClose={props.handleProjectGroupModal}
      open={props.projectGroupModal}
    >
      <ProjectSelectionStyle>
        <div className="projectContainer">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="projectGroup"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="New Project Group"
                  variant="standard"
                  className="newProj"
                  value={projectGroup}
                  onChange={e => {
                    field.onChange(e);
                    setProjectGorup(e.target.value);
                  }}
                  error={errors.projectGroup ? true : false}
                  helperText={errors?.projectGroup?.message}
                />
              )}
            />
            <Fab size="small" color="primary" type="submit">
              <AddIcon />
            </Fab>
          </form>
        </div>
      </ProjectSelectionStyle>
    </ModalComponent>
  );
}

export default ProjectGroupSelection;

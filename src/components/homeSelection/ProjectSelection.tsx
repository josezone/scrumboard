import { useState } from "react";

import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import ModalComponent from "../modal/modal";
import { ProjectSelectionStyle } from "./projectSelection.style";

const schema = yup
  .object({
    project: yup.string().required(),
  })
  .required();

function ProjectSelection(props: any) {
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
      props.send({ type: "createProject", prop: data.project });
    })(e);
    props.handleProjectModal();
  };

  return (
    <ModalComponent
      title="Create Project"
      handleClose={props.handleProjectModal}
      open={props.projectModal}
    >
      <ProjectSelectionStyle>
        <div className="projectContainer">
          <form onSubmit={onSubmit}>
            <Controller
              name="project"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="New Project"
                  variant="standard"
                  className="newProj"
                  error={errors.project ? true : false}
                  helperText={errors?.project?.message}
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

export default ProjectSelection;

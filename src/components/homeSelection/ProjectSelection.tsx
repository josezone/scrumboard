import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
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

  const projectUpdated = (project: any) => (event: any) => {
    props.send({ type: "projectChanged", prop: project });
  };

  const onSubmit = (e: any) => {
    handleSubmit((data: any) => {
      reset();
      e.target.reset();
      props.send({ type: "createProject", prop: data.project });
    })(e);
  };

  return (
    <ProjectSelectionStyle>
        <div className="projectContainer">
        {props.selectedProject && (<ButtonGroup>
            {props.projectList.map((project: any) => {
              return (
                <Button
                  variant={
                    props.selectedProject.id === project.id
                      ? "contained"
                      : "outlined"
                  }
                  onClick={projectUpdated(project)}
                  key={"project" + project.project}
                  className="projectButton"
                >
                  {project.project}
                </Button>
              );
            })}
          </ButtonGroup>)}
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
  );
}

export default ProjectSelection;

import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import Fab from "@mui/material/Fab";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { BugListStyle } from "./bugList.style";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const schema = yup
  .object({
    bug: yup.string().required(),
    report: yup.boolean(),
    evidence: yup.string(),
    impact: yup.string().required(),
    spilled: yup.boolean(),
    resource: yup.string().required(),
  })
  .required();

function BugList(props: any) {
  const [resource, setResource] = useState("");
  const [issue, setIssue] = useState("");
  const [impact, setImpact] = useState("");
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
      setResource("");
      setIssue("");
      setImpact("");
      props.send({ type: "createBug", data });
    })(e);
  };

  const reportChanged = (bug: any) => (event: any) => {
    props.send({
      type: "changeReport",
      data: { bug: bug.id, report: event.target.checked },
    });
  };

  const deleteClicked = (bug: any) => (event: any) => {
    props.send({ type: "removeBug", data: bug.id });
  };

  return (
    <BugListStyle>
      <form onSubmit={onSubmit}>
        <Controller
          name="report"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} />}
              label="Report"
              className="report"
            />
          )}
        />

        <Controller
          name="bug"
          control={control}
          render={({ field }) => (
            <TextareaAutosize
              {...field}
              minRows={3}
              placeholder="Issue"
              value={issue}
              onChange={(e: any) => {
                field.onChange(e.target.value);
                setIssue(e.target.value);
              }}
            />
          )}
        />

        <Controller
          name="evidence"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="evidence"
              variant="standard"
              className="evidence"
              error={errors.evidence ? true : false}
              helperText={errors?.evidence?.message}
            />
          )}
        />

        <Controller
          name="impact"
          control={control}
          render={({ field }) => (
            <TextareaAutosize
              {...field}
              minRows={3}
              placeholder="impact"
              className="impact"
              value={impact}
              onChange={(e: any) => {
                field.onChange(e.target.value);
                setImpact(e.target.value);
              }}
            />
          )}
        />

        <Controller
          name="spilled"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} />}
              label="Spilled"
              className="spilled"
            />
          )}
        />

        <Controller
          name="resource"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              value={resource}
              onChange={(e: any) => {
                setResource(e.target.value);
                field.onChange(e);
              }}
              className="resource"
              error={errors.country ? true : false}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {props?.resourceList?.map((resource: any) => {
                return (
                  <MenuItem value={resource.id} key={resource.resource}>
                    {resource.resource}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        />

        <Fab size="small" color="primary" type="submit" className="submit">
          <AddIcon />
        </Fab>
      </form>
      <div>
        {props?.bugList?.map((bug: any) => {
          return (
            <div key={bug.id}>
              <div className="bugDate">
                {new Date(bug.date).toLocaleString("default", {
                  month: "long",
                }) +
                  " " +
                  new Date(bug.date).getDate()}
              </div>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={bug.report}
                    onChange={reportChanged(bug)}
                  />
                }
                label="Report"
                className="bugReport"
              />

              <TextareaAutosize
                minRows={3}
                placeholder="Issue"
                value={bug.bug}
                disabled
              />
              <TextField
                label="evidence"
                variant="standard"
                className="evidence"
                value={bug.evidence}
                disabled
              />
              <TextareaAutosize
                minRows={3}
                placeholder="impact"
                className="impact"
                value={bug.impact}
                disabled
              />
              <FormControlLabel
                control={<Checkbox defaultChecked={bug.spilled} disabled />}
                label="Spilled"
                className="spilled"
              />
              <Select
                value={bug.resource.id}
                className="resource"
                error={errors.country ? true : false}
                disabled
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {props?.resourceList?.map((resource: any) => {
                  return (
                    <MenuItem value={resource.id} key={resource.resource}>
                      {resource.resource}
                    </MenuItem>
                  );
                })}
              </Select>
              <DeleteForeverIcon onClick={deleteClicked(bug)} />
            </div>
          );
        })}
      </div>
    </BugListStyle>
  );
}

export default BugList;

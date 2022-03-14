import { FC, useState, useEffect } from "react";
import ModalComponent from "../modal/modal";
import { AddBugStyled, AddBugFormWrapper } from "./bugList.style";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Button, Checkbox, FormControlLabel, Switch, TextField } from "@mui/material";
import Select from "../select/select";

interface IAddBug {
    resourceList: Array<any>;
    onSubmit: (data: any) => void,
    send: (data: any) => void,
    modalVisible: boolean
}

const validationSchema = yup
    .object()
    .shape(
        {
            bug: yup.string().required().label("Issue"),
            resource: yup.number().required().label("Resource")
        }
    )


const AddEstimateBug: FC<IAddBug> = (props) => {
    const { resourceList } = props;
    const initialValues = {
        bug: "",
        resource: null,
    }

    const formOptions = { resolver: yupResolver(validationSchema), defaultValues: initialValues };
    const { control, formState, watch, handleSubmit, setError, reset } = useForm(formOptions);

    useEffect(() => {
        if (!props.modalVisible) {
            reset()
        }
    }, [props.modalVisible])


    const getErrorMSg = (key: string): string | null => {
        return formState.errors[key]?.message || null
    }

    const onSubmit = (data: any) => {
        props.onSubmit(data);
    }

    const handleToggleModal = () => {
        props.send({ type: "addBugModalToggle" });
    }

    return (
        <AddBugStyled>
            <div className="ButtonContainer" >
                <Button variant="contained" onClick={handleToggleModal}>Report Bug</Button>
            </div>
            <ModalComponent open={props.modalVisible} handleClose={handleToggleModal} title="Report Bug">

                <AddBugFormWrapper onSubmit={handleSubmit(onSubmit)} >
                    <Controller
                        name="bug"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                id="outlined-textarea"
                                label="Issue"
                                placeholder="Placeholder"
                                multiline
                                minRows={3}
                                fullWidth
                                {...field}
                                helperText={getErrorMSg("bug")}
                                error={Boolean(getErrorMSg("bug"))}
                            />
                        )}
                    />

                    <Controller
                        name="resource"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Reporter"
                                options={resourceList?.map((r) => ({ label: r.resource, value: r.id }))}
                                helperText={getErrorMSg("resource")}
                                error={Boolean(getErrorMSg("resource"))}
                            />
                        )}
                    />

                    <div>
                        <Button type="submit" className="SubmitBtn" variant="contained" >Submit</Button>
                        <Button className="SubmitBtn" variant="text" onClick={handleToggleModal} >Cancel</Button>
                    </div>
                </AddBugFormWrapper>
            </ModalComponent>
        </AddBugStyled>
    )
}

export default AddEstimateBug;
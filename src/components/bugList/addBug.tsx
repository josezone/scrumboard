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
            spill: yup.boolean().required(),
            report: yup.boolean().required(),
            bug: yup.string().required().label("Issue"),
            evidence: yup.string().required().label("Evidence"),
            impact: yup.string().required().label("Impact"),
            resource: yup.number().required().label("Resource"),
            beSpill: yup.number().nullable(true).when(['feSpill', 'qaSpill', "spill"], {
                is: (feSpill: any, qaSpill: any, spill: boolean) => spill && feSpill === null && qaSpill === null,
                then: yup.number().nullable(true).required('QA Spill / FE Spill / BE Spill any one of the fields are required')
            }),
            feSpill: yup.number().nullable(true).when(['beSpill', 'qaSpill', "spill"], {
                is: (beSpill: any, qaSpill: any, spill: boolean) => spill && beSpill === null && qaSpill === null,
                then: yup.number().nullable(true).required('QA Spill / FE Spill / BE Spill any one of the fields are required')
            }),
            qaSpill: yup.number().nullable(true).when(['feSpill', 'beSpill', "spill"], {
                is: (feSpill: any, beSpill: any, spill: boolean) => spill && feSpill === null && beSpill === null,
                then: yup.number().nullable(true).required('QA Spill / FE Spill / BE Spill any one of the fields are required')
            })
        },
        [["feSpill", "beSpill"], ["feSpill", "qaSpill"], ["beSpill", "qaSpill"]]
    )


const AddBug: FC<IAddBug> = (props) => {
    const { resourceList } = props;
    const initialValues = {
        spill: false,
        report: false,
        bug: "",
        evidence: "",
        resource: null,
        beSpill: null,
        feSpill: null,
        qaSpill: null
    }

    const formOptions = { resolver: yupResolver(validationSchema), defaultValues: initialValues  };
    const { control, formState, watch, handleSubmit, setError, reset } = useForm(formOptions);
    const spill = watch("spill");
    const storyPoints = Boolean(watch("feSpill") || watch("beSpill") || watch("qaSpill"))

    useEffect(() => {
        if(storyPoints){
            const errorOptions = { message: "" }
            setError("feSpill", errorOptions )
            setError("beSpill", errorOptions)
            setError("qaSpill", errorOptions)
        }
    }, [storyPoints])

    useEffect(()=>{
        if(!props.modalVisible){
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
        props.send({ type: "addBugModalToggle"});
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
                        name="evidence"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                id="outlined-textarea"
                                label="Evidence"
                                placeholder="Evidence"
                                fullWidth
                                {...field}
                                helperText={getErrorMSg("evidence")}
                                error={Boolean(getErrorMSg("evidence"))}
                            />
                        )}
                    />

                    <Controller
                        name="impact"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                id="outlined-textarea"
                                label="Impact"
                                placeholder="Impact"
                                multiline
                                minRows={3}
                                fullWidth
                                {...field}
                                helperText={getErrorMSg("impact")}
                                error={Boolean(getErrorMSg("impact"))}
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

                    <Controller
                        name="spill"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                {...field}
                                className="slipContainer"
                                control={<Switch checked={Boolean(field.value)} />}
                                label="Spill"
                            />)
                        }
                    />

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

                    {spill && <Controller
                        name="beSpill"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="number"
                                id="standard-basic"
                                label="BE Spill Story Points"
                                variant="outlined"
                                fullWidth
                                helperText={getErrorMSg("beSpill")}
                                error={Boolean(getErrorMSg("beSpill"))}
                            />
                        )}
                    />}

                    {spill && <Controller
                        name="feSpill"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="number"
                                id="standard-basic"
                                label="FE Spill Story Points"
                                variant="outlined"
                                fullWidth
                                helperText={getErrorMSg("feSpill")}
                                error={Boolean(getErrorMSg("feSpill"))}
                            />
                        )}
                    />}


                    {spill && <Controller
                        name="qaSpill"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="number"
                                id="standard-basic"
                                label="QA Spill Story Points"
                                variant="outlined"
                                fullWidth
                                helperText={getErrorMSg("qaSpill")}
                                error={Boolean(getErrorMSg("qaSpill"))}
                            />
                        )}
                    />}


                    <div>
                        <Button type="submit" className="SubmitBtn" variant="contained" >Submit</Button>
                        <Button className="SubmitBtn" variant="text" onClick={handleToggleModal} >Cancel</Button>
                    </div>
                </AddBugFormWrapper>
            </ModalComponent>
        </AddBugStyled>
    )
}

export default AddBug;
import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { off } from "process";
import { FC, useState, useEffect } from "react";
import ModalComponent from "../modal/modal";
import Select from "../select/select";
import { MoveTicketStyled, MoveTicketStyledWrapper } from "./NewTicket.style";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface IMoveTicket {
    sprintList: Array<sprints>,
    initialValues: any,
    onSubmit: (data: any) => void
}

type sprints = {
    sprint: string,
    id: number,
    scrum_id: number,
    country: any
}

const validationSchema = yup
    .object()
    .shape(
        {
            ticketId: yup.number().required().label("Ticket Id"),
            sprintId: yup.number().required().nullable().label("Sprint"),
            spill: yup.boolean().required(),
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



const MoveTicket: FC<IMoveTicket> = (props) => {
    const formOptions = { resolver: yupResolver(validationSchema), defaultValues: props?.initialValues };
    const { control, handleSubmit, formState, watch, setValue, setError } = useForm(formOptions);
    const [modal, setModal] = useState<boolean>(false);
    const [sprintList, setSprintList] = useState<Array<any>>([]);
    const spill = watch("spill");
    const storyPoints = Boolean(watch("feSpill") || watch("beSpill") || watch("qaSpill"))

    useEffect(() => {
        if (JSON.stringify(sprintList) !== JSON.stringify(props.sprintList)) {
            const sprints = props?.sprintList?.map((spr) => ({ ...spr, label: spr.sprint, value: spr.id, }));
            setSprintList(sprints);
        }
    }, [JSON.stringify(props.sprintList)])

    useEffect(() => {
        if(storyPoints){
            const errorOptions = { message: "" }
            setError("feSpill", errorOptions )
            setError("beSpill", errorOptions)
            setError("qaSpill", errorOptions)
        }
    }, [storyPoints])


    const handleToggleModal = () => {
        setModal(m => !m);
    }

    const getErrorMSg = (key: string): string | null => {
        return formState.errors[key]?.message || null
    }

    const handleFormSubmit = (data: any) => {
        props.onSubmit(data)
    }

    if(!Boolean(sprintList.length))return <></>;

    return (
        <MoveTicketStyledWrapper>
            <Button variant="contained" onClick={handleToggleModal} >Change Sprint</Button>
            <ModalComponent handleClose={handleToggleModal} title="Change Sprint" open={modal} >
                <MoveTicketStyled>
                    <form onSubmit={handleSubmit(handleFormSubmit)}  >
                        <Controller
                            name="sprintId"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Select Sprint *"
                                    options={sprintList}
                                    helperText={getErrorMSg("sprintId")}
                                    error={Boolean(getErrorMSg("sprintId"))}
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
                            <Button type="submit" className="SubmitBtn" variant="contained" >Move</Button>
                            <Button  className="SubmitBtn" variant="text" onClick={handleToggleModal} >Cancel</Button>
                        </div>
                    </form>
                </MoveTicketStyled>
            </ModalComponent>
        </MoveTicketStyledWrapper>
    )
}

export default MoveTicket;
import { FC } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import { default as SelectComponent, SelectProps } from '@mui/material/Select';
import { FormHelperText } from '@mui/material';

interface ISelect extends SelectProps {
    formControlProps?: FormControlProps,
    options: Array<Options>,
    helperText?: string | null
}

type Options = {
    value: string,
    label: string
}

const Select: FC<ISelect> = (props) => {
    const { formControlProps = {}, helperText, options, ...rest } = props;

    return (
        <FormControl fullWidth {...formControlProps} >
            <InputLabel id="demo-simple-select-label">{rest.label}</InputLabel>
            <SelectComponent
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...rest}
            >
                {options?.map((o) => (
                    <MenuItem value={o.value}>{o.label}</MenuItem>
                ))}
            </SelectComponent>
            <FormHelperText sx={{ color: "red" }} >
                {helperText}
            </FormHelperText>

        </FormControl>
    );
}

export default Select;

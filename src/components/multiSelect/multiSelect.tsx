import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface IMultipleSelect extends SelectProps{
    options: Array<Payload>,
    value?: string[],
    handleChange?: (payload: Array<Payload>, e?: SelectChangeEvent<any>) => void,
    label: string,
    helperText?: string
}

type Payload = {
    value: string,
    id?: string | number
}


const MultipleSelect: FC<IMultipleSelect> = (props) => {
  const { handleChange, value, label, options, helperText, ...rest } = props;
  const [values, setValues] = useState<string[]>(props?.value || []);
  
  
  const handleOptionChange = (event: SelectChangeEvent<typeof values>) => {
    const { target: { value } } = event;
    let finalValues: string[];
    if(typeof value === 'string'){
         // On autofill we get a stringified value.
        finalValues =  value.split(',')
    }else {
        finalValues = value;
    }

    const allValues = finalValues.map((v) => {
        const findOption = props?.options?.find((opt) => opt.value === v);
        return findOption || { value: v }
    })
    if(handleChange)handleChange(allValues, event);    
    setValues(finalValues);
  };


  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={values}
          
          onChange={handleOptionChange}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected: any) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value: string) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          {...rest as any}
        >
          {props?.options?.map((opt) => (
            <MenuItem
              key={opt.id}
              value={opt.value}
            >
              {opt.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default MultipleSelect;
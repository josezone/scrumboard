import { ReactChild, ReactChildren } from "react";

import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

import { ItemDiv, LabelWrapper, SelectWrapper } from "./ItemSelect.style";

interface IitemSelect {
  items: Array<any>;
  defaultItem: string;
  onChange: any;
  name: string;
  id: string;
  children?: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}

function ItemSelect(props: IitemSelect) {
  const { items, defaultItem, onChange, name, id } = props;
  return (
    <ItemDiv>
      <LabelWrapper>
        <InputLabel variant="standard" htmlFor={name} className="label_color">
          {name}
        </InputLabel>
        {props.children}
      </LabelWrapper>
     
      <SelectWrapper>
        <NativeSelect
          defaultValue={defaultItem}
          onChange={onChange}
          inputProps={{
            name: name,
            id: id,
          }}
          className="label_color"
        >
          {items.map((item) => {
            return (
              <option value={item.value} key={item.key}>
                {item.label}
              </option>
            );
          })}
        </NativeSelect>
      </SelectWrapper>
    </ItemDiv>
  );
}

export default ItemSelect;

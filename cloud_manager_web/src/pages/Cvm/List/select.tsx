import React, { memo, useState } from "react";
import { Select, SelectOptions, SelectValue } from "tdesign-react";


export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
    content?: React.ReactNode;
}


export interface SelectorProps {
    selectors: SelectOption[];
    value: string;
    onChange: (value: SelectValue) => void
}



const Selector: React.FC<SelectorProps> = (props: SelectorProps) => {
    const { selectors } = props;
    return (
        <Select
            value={props.value}
            onChange={props.onChange}
            style={{ width: '100%' }}
            clearable
            options={selectors}
        >
        </Select>
    )
}


export default memo(Selector);

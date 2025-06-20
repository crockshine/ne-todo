import React from 'react';
import s from "./Tag.module.css"
import {Checkbox} from "@/components/ui/checkbox";
import { ITab} from "@/mocks/tags";
import {colorRecord} from "@/mocks/colors";

interface IProps extends ITab {
    activeTabs: number[];
    onCheckedChange: (tabId: number, state: boolean) => void;
}

const Tag = ({id, name, value, color, activeTabs, onCheckedChange}: IProps) => {
    const isChecked = activeTabs.includes(id)
    const tagStyles =
        isChecked
        ? {backgroundColor: colorRecord[color]}
        : {backgroundColor: 'var(--card-foreground)'};

    const checkboxStyles =
        isChecked
        ? {backgroundColor: 'white', color: colorRecord[color]}
        : {backgroundColor: colorRecord[color]};

    return (
        <label
            htmlFor={value}
            style={tagStyles}
            className={s.tagWrapper}
        >
            <Checkbox
                id={value}
                name={name}
                value={value}
                checked={isChecked}
                onCheckedChange={st => onCheckedChange(id, !!st) }
                style={checkboxStyles}
                className={s.checkbox}
            />
                {
                    value
                }
        </label>
    );
};

export default Tag;
import React from 'react';
import s from "./Tag.module.css"
import {Checkbox} from "@/components/ui/checkbox";
import {ITab} from "@/components/shared/TagList/TagList";

interface IProps extends ITab {
    activeTabs: string[];
    onCheckedChange: (tabValue: string, state: boolean) => void;
}

const Tag = ({name, value, color, activeTabs, onCheckedChange}: IProps) => {
    const isChecked = activeTabs.includes(value)
    const tagStyles =
        isChecked
        ? {backgroundColor: color}
        : {backgroundColor: 'var(--card-foreground)'};

    const checkboxStyles =
        isChecked
        ? {backgroundColor: 'white', color: color}
        : {backgroundColor: color};

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
                onCheckedChange={st => onCheckedChange(value, !!st) }
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
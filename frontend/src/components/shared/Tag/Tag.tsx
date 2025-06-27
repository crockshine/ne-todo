import React from 'react';
import s from "./Tag.module.css"
import {Checkbox} from "@/components/ui/checkbox";
import { TTag} from "@/mocks/tags";
import {colorRecord} from "@/mocks/colors";

interface IProps extends TTag {
    isActive: boolean;
    onCheckedChange: (tabId: number, state: boolean) => void;
}

const Tag = ({id, value, color, isActive, onCheckedChange}: IProps) => {
    const tagStyles =
        isActive
            ? {backgroundColor: colorRecord[color]}
            : {backgroundColor: 'var(--card-foreground)'};

    const checkboxStyles =
        isActive
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
                checked={isActive}
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
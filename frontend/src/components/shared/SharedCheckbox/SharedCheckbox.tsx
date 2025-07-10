import React from 'react';
import s from './SharedCheckbox.module.css'
import {Checkbox} from "@/components/ui/checkbox";
import {cn} from '@/lib/utils';
import {IUITag} from "@/types/checkbox.interface";
import {colorMap} from "@/mocks/colorMap";

export interface ISharedCheckboxProps extends Omit<IUITag, 'value'> {
    isActive: boolean;
    onCheckedChange: (tabId: string, state: boolean) => void;

    children?: React.ReactNode;
    className?: string;
}

const SharedCheckbox = (
    {id, isLoading, isError,  color, isActive,className, onCheckedChange, children}: ISharedCheckboxProps) => {
    const clr = colorMap[color];

    const tagStyles =
        isActive
            ? {backgroundColor: clr}
            : {backgroundColor: 'var(--card-foreground)'};

    const checkboxStyles =
        isActive
            ? {backgroundColor: 'var(--card-foreground)', color: clr}
            : {backgroundColor: clr};


    return (
        <label
            htmlFor={id}
            style={tagStyles}
            className={cn(
                s.tagWrapper,
                className,
                isLoading && [s.loading, s.disabled],
                isError && [s.error, s.disabled]
            )}
        >
            <Checkbox
                disabled={isLoading || isError}
                id={id}
                checked={isActive}
                onCheckedChange={st => onCheckedChange(id, !!st)}
                style={checkboxStyles}
                className={s.checkbox}
            />
            {
                children
            }
        </label>
    );
};

export default SharedCheckbox;
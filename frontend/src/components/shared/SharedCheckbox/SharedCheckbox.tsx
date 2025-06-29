import React from 'react';
import s from './SharedCheckbox.module.css'
import {Checkbox} from "@/components/ui/checkbox";
import {cn} from '@/lib/utils';

export interface ISharedCheckboxProps {
    id: string;
    color: string; // hex
    isActive: boolean;
    onCheckedChange: (tabId: string, state: boolean) => void;

    children?: React.ReactNode;
    className?: string;

    isLoading?: boolean;
    isError?: boolean;
}

const SharedCheckbox = (
    {id, isLoading, isError,  color, isActive,className, onCheckedChange, children}: ISharedCheckboxProps) => {
    const tagStyles =
        isActive
            ? {backgroundColor: color}
            : {backgroundColor: 'var(--card-foreground)'};

    const checkboxStyles =
        isActive
            ? {backgroundColor: 'var(--card-foreground)', color: color}
            : {backgroundColor: color};


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
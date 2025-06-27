import React from 'react';
import s from "./Tag.module.css"
import {Checkbox} from "@/components/ui/checkbox";
import { TTag} from "@/mocks/tags";
import {colorRecord} from "@/mocks/colors";
import { cn } from '@/lib/utils';
import {RotateCcw} from "lucide-react";
import {useUser} from "@/hooks/useUser";

interface IProps extends TTag {
    isActive: boolean;
    onCheckedChange: (tabId: number, state: boolean) => void;
}

const Tag = ({id, isLoading, isError, value, color, isActive, onCheckedChange}: IProps) => {
    const user = useUser()

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
            htmlFor={id}
            style={tagStyles}
            className={cn(
                s.tagWrapper,
                isLoading && [s.loading, s.disabled],
                isError && [s.error, s.disabled]
            )}
        >
            <Checkbox
                disabled={isLoading || isError}
                id={id}
                checked={isActive}
                onCheckedChange={st => onCheckedChange(id, !!st) }
                style={checkboxStyles}
                className={s.checkbox}
            />
                {
                    value
                }

            {isError && <RotateCcw className={s.refetch} onClick={() => user?.retryAddTag(id)}/>}
        </label>
    );
};

export default Tag;
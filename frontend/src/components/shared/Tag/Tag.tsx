import React from 'react';
import s from './Tag.module.css'
import SharedCheckbox, {ISharedCheckboxProps} from "@/components/shared/SharedCheckbox/SharedCheckbox";
import SquareButton from "@/components/shared/SquareButton/SquareButton";
import {RotateCcw, Trash2} from "lucide-react";
import {cn} from "@/lib/utils";

interface ICheckboxProps extends ISharedCheckboxProps {
    value: string;
}

interface ITagProps {
    checkboxProps: ICheckboxProps,
    onRetry: (id: string) => void;
    onDelete: (id: string, isError?: boolean) => void;
}

const Tag = ({checkboxProps, onRetry, onDelete}: ITagProps) => {
    return (
        <SharedCheckbox {...checkboxProps} >
            <div className={s.container}>
                <span>{checkboxProps.value}</span>

                <div className={s.btnContainer}>
                    <SquareButton
                        className={cn(!checkboxProps.isError && s.deleteBtn)}
                        onClick={() => onDelete(checkboxProps.id, checkboxProps.isError)}
                        icon={<Trash2/>}
                        variant={checkboxProps.isError ? 'destructive' : 'secondary'}
                    />
                    {checkboxProps.isError &&
                        <SquareButton
                            onClick={() => onRetry(checkboxProps.id)}
                            icon={<RotateCcw />}
                            variant="destructive"/>
                    }
                </div>
            </div>

        </SharedCheckbox>
    );
};

export default Tag;
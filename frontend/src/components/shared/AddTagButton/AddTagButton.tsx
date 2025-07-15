import React from 'react';
import s from './AddTagButton.module.css'
import SquareButton from "@/components/shared/SquareButton/SquareButton";

interface IIconButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}

const AddTagButton = ({icon, label, onClick}: IIconButtonProps) => {
    return (
        <div className={s.wrapper} onClick={onClick}>
            <SquareButton icon={icon} variant={'secondary'}/>
            <span className={s.label}>
                {label}
            </span>
        </div>
    );
};

export default AddTagButton;
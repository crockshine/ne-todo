import React from 'react';
import s from './IconButton.module.css'
import { Button } from '@/components/ui/button';

interface IIconButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}

const IconButton = ({icon, label, onClick}: IIconButtonProps) => {
    return (
        <Button className={s.wrapper} variant={"secondary"} onClick={onClick} type="button">
            <div className={s.iconBlock}>
                {icon}
            </div>
            <span className={s.label}>
                {label}
            </span>
        </Button>
    );
};

export default IconButton;
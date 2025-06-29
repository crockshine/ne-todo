import React from 'react';
import s from './SquareButton.module.css'
import {Button, ButtonProps} from "@/components/ui/button";
import {cn} from "@/lib/utils";

export interface IBadgeProps extends ButtonProps{
    icon: React.ReactNode;
    onClick: () => void;
}

const SquareButton = ({icon, onClick, className, ...props}: IBadgeProps) => {
    return (
        <Button className={cn(s.container, className)} onClick={onClick} {...props}>
            {icon}
        </Button>
    );
};

export default SquareButton;
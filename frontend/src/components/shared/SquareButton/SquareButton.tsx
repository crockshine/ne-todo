import React from 'react';
import s from './SquareButton.module.css'
import {Button, ButtonProps} from "@/components/ui/button";
import {cn} from "@/lib/utils";

export interface IBadgeProps extends ButtonProps{
    icon: React.ReactNode;
}

const SquareButton = ({icon, className, ...props}: IBadgeProps) => {
    return (
        <Button className={cn(s.container, className)}  {...props}>
            {icon}
        </Button>
    );
};

export default SquareButton;
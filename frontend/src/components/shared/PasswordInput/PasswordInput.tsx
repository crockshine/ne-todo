import React, {InputHTMLAttributes, useState} from 'react';
import s from './PasswordInput.module.css'
import {Input} from "@/components/ui/input";
import SquareButton from "@/components/shared/SquareButton/SquareButton";
import {Eye, EyeOff} from "lucide-react";
import {cn} from "@/lib/utils";


const PasswordInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
    const [isShow, setIsShow] = useState<boolean>(false);

    return (
        <div className={cn(s.wrapper, 'p-1 h-9')}>
            <Input
                {...props}
                type={isShow ? 'text' : 'password'}
                className={'p-0 px-2'}
            />
            <SquareButton
                icon={isShow ? <Eye /> : <EyeOff />}
                type={'button'}
                variant={'secondary'}
                onMouseDown={() => setIsShow(true)}
                onMouseUp={() => setIsShow(false)}
            />
        </div>
    );
};

export default PasswordInput;
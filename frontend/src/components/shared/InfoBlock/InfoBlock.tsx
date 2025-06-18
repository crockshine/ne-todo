import React from 'react';
import s from './InfoBlock.module.css'

interface IInfoBlockProps {
    label: string;
    children: React.ReactNode
}

const InfoBlock = ({label, children}: IInfoBlockProps) => {
    return (
        <div className={s.wrapper}>
            <span>{label}</span>
            {children}
        </div>
    );
};

export default InfoBlock;
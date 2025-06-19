import React from 'react';
import s from './InfoBlock.module.css'

interface IInfoBlockProps {
    label?: string;
    error?: string;
    children: React.ReactNode
}

const InfoBlock = ({label, error, children}: IInfoBlockProps) => {
    return (
        <div className={s.wrapper}>
                <p>{label}</p>
            {children}
            <span className={s.error}>{error}</span>
        </div>
    );
};

export default InfoBlock;
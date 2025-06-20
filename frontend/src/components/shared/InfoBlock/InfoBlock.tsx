import React, {memo} from 'react';
import s from './InfoBlock.module.css'

interface IInfoBlockProps {
    label?: string;
    error?: string;
    children: React.ReactNode
}

const InfoBlock = ({label, error, children}: IInfoBlockProps) => {
    return (
        <div className={s.wrapper}>
            {label && <p>{label}</p>}
            {children}
            {error && <span className={s.error}>{error}</span>}
        </div>
    );
};

export default memo(InfoBlock);
import React, {memo} from 'react';
import s from './InfoBlock.module.css'
import {cn} from "@/lib/utils";

export type InfoBlockVariants = 'default' | 'small'

interface IInfoBlockProps {
    label?: string;
    error?: string;
    children: React.ReactNode,
    variant?: InfoBlockVariants;
}

const InfoBlock = ({label, error, children, variant = 'default'}: IInfoBlockProps) => {
    const labelVariant = (l: string) =>
        variant === 'default'
            ? <span>{l}</span>
            : <small>{l}</small>

    const labelStyle = () =>
        variant === 'default'
            ? s.defaultLabel
            : s.smallLabel

    const errorStyle = () =>
        variant === 'small'
            && s.smallError

    return (
        <label className={cn(s.wrapper, labelStyle())} htmlFor={label}>
            {label && labelVariant(label)}
            {children}
            {error && <span className={cn(s.error, errorStyle())}>{error}</span>}
        </label>
    );
};

export default memo(InfoBlock);
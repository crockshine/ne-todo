import React from 'react';
import s from './GradientLayout.module.css'

const GradientLayout = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.g1}/>
            <div className={s.g2}/>
            <div className={s.g3}/>

        </div>
    );
};

export default GradientLayout;
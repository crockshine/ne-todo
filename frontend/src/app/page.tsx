import React from 'react';
import CreateTask from "@/widgets/CreateTask/CreateTask";
import GradientLayout from "@/layouts/GradientLayout";
import s from './app.module.css'

const Page = () => {
    return (
        <div className={s.wrapper}>
            <CreateTask/>
            <GradientLayout/>
        </div>
    );
};

export default Page;
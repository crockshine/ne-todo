import React from 'react';
import CreateTask from "@/widgets/CreateTask/CreateTask";
import s from './app.module.css'

const Page = () => {
    return (
        <div className={s.wrapper}>
            <CreateTask/>
        </div>
    );
};

export default Page;
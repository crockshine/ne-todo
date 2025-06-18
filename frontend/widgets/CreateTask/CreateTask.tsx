import React from 'react';
import s from './CreateTask.module.css'
import CreateTaskInput from "@/components/shared/CreateTaskInput/CreateTaskInput";
import TabList, {ITab} from "@/components/shared/TagList/TagList";
import {tabs} from "@/mocks/tags";



const CreateTask = () => {
    async function handleSubmit(formData: FormData) {
        'use server'
        const tags = formData.getAll('tag');
        console.log('Server received:', tags);
    }

    return (
        <div className={s.createTaskWrapper}>
            <CreateTaskInput />
            <form action={handleSubmit}>
                <TabList tabs={tabs} />
                <button>dasdas</button>
            </form>
        </div>
    );
};

export default CreateTask;
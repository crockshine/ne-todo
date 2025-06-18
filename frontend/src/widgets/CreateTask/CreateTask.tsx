import React from 'react';
import s from './CreateTask.module.css'
import CreateTaskInput from "@/components/shared/CreateTaskInput/CreateTaskInput";
import TabList from "@/widgets/TagList/TagList";
import {tabs} from "@/mocks/tags";
import InfoBlock from "@/components/shared/InfoBlock/InfoBlock";
import {useModal} from "@/hooks/useModal";


const handleSubmit = async (formData: FormData) => {
    'use server'
    const tags = formData.getAll('tag');
    console.log('Server received:', tags);
}

const CreateTask = () => {

    return (
        <form action={handleSubmit} className={s.createTaskWrapper}>
            <CreateTaskInput/>
            <InfoBlock label={'Метка'}>
                <TabList tabs={tabs} />
            </InfoBlock>
        </form>
    );
};

export default CreateTask;
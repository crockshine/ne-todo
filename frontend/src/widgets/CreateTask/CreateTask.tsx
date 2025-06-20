"use client"
import React from 'react';
import s from './CreateTask.module.css'
import CreateTaskInput from "@/components/shared/CreateTaskInput/CreateTaskInput";
import TabList from "@/widgets/CreateTask/TabList/TabList";
import {tabs} from "@/mocks/tags";
import InfoBlock from "@/components/shared/InfoBlock/InfoBlock";
import RuCalendar from "@/components/shared/RuCalendar/RuCalendar";
import {useForm} from "react-hook-form";
import {TaskFormData, taskSchema} from "@/validations/add-task-validation";
import {zodResolver} from "@hookform/resolvers/zod";
import TimeSelect from "@/components/shared/TimeSelect/TimeSelect";
import {createTask} from "@/api/tasks";
import {combineDate} from "@/helpers/combineDate";

const CreateTask = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors}
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        mode: 'onSubmit',
    })

    const onSubmit = async ({day, time, tagsId, title}: TaskFormData) => {
        const deadline =
            day && time
            ? combineDate(day, time)
            : day;

        await createTask({ title, tagsId, deadline });
    }

    return (
        <form className={s.createTaskWrapper} onSubmit={handleSubmit(onSubmit)}>
            <InfoBlock error={errors.title?.message}>
                <CreateTaskInput {...register('title')}/>
            </InfoBlock>

            <InfoBlock label={'Метка'}>
                <TabList tabs={tabs} onChange={(tabs) => setValue('tagsId', tabs)}/>
            </InfoBlock>

            <InfoBlock label={'Дедлайн'} error={errors.day?.message || errors.time?.message}>
                <div className={s.deadline}>
                    <TimeSelect onChange={time => setValue('time', time)}/>

                    <RuCalendar
                        date={watch('day')}
                        setDate={(date) => setValue('day', date)}
                    />
                </div>
            </InfoBlock>
        </form>
    );
};

export default CreateTask;
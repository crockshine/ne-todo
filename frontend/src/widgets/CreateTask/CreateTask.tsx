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

const CreateTask = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            date: new Date
        }
    })

    const onSubmit = (data: TaskFormData) => {
        console.log('Отправка данных:', data)
        // Здесь будет ваша логика отправки
    }

    return (
        <form className={s.createTaskWrapper} onSubmit={handleSubmit(onSubmit)}>
            <InfoBlock error={errors.title?.message}>
                <CreateTaskInput {...register('title')}/>
            </InfoBlock>

            <InfoBlock label={'Метка'}>
                <TabList tabs={tabs} onChange={(tabs) => setValue('tags', tabs)}/>
            </InfoBlock>

            <InfoBlock label={'Дедлайн'} error={errors.date?.message}>
                <RuCalendar
                    date={watch('date')}
                    setDate={(date) => setValue('date', date)}
                />
            </InfoBlock>
        </form>
    );
};

export default CreateTask;
"use client"
import React from 'react';
import s from './CreateTask.module.css'
import TabList from "@/widgets/CreateTask/TabList/TabList";
import {tabs} from "@/mocks/tags";
import InfoBlock from "@/components/shared/InfoBlock/InfoBlock";
import RuCalendar from "@/components/shared/RuCalendar/RuCalendar";
import TimeSelect from "@/components/shared/TimeSelect/TimeSelect";
import {useCreateTask} from "@/hooks/useCreateTask";

const CreateTask = () => {
    const createTasks = useCreateTask()
    if (!createTasks) return
    const { watch, setValue, formState} = createTasks

    return (
        <>
            <InfoBlock label={'Метка'}>
                <TabList tabs={tabs} onChange={(tabs) => setValue('tagsId', tabs)}/>
            </InfoBlock>

            <InfoBlock label={'Дедлайн'} error={formState.errors.day?.message || formState.errors.time?.message}>
                <div className={s.deadline}>
                    <TimeSelect onChange={time => setValue('time', time)}/>

                    <RuCalendar
                        date={watch('day')}
                        setDate={(date) => setValue('day', date)}
                    />
                </div>
            </InfoBlock>
        </>
    );
};

export default CreateTask;
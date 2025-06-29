"use client"
import React, {use} from 'react';
import s from './CreateTask.module.css'
import TagList from "@/widgets/TagList/TagList";
import InfoBlock from "@/components/shared/InfoBlock/InfoBlock";
import RuCalendar from "@/components/shared/RuCalendar/RuCalendar";
import TimeSelect from "@/components/shared/TimeSelect/TimeSelect";
import CreateTaskContext from "@/context/CreateTask/CreateTaskContext";

const CreateTask = () => {
    const createTasks = use(CreateTaskContext);
    if (!createTasks) return
    const { watch, setValue, formState} = createTasks

    return (
        <>
            <InfoBlock label={'Метка'}>
                {/*связь с контекстом внутри*/}
                <TagList/>
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
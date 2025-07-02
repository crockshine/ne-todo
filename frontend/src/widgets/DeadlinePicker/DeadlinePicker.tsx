"use client";
import React from "react";
import s from "./DeadlinePicker.module.css";
import InfoBlock from "@/components/shared/InfoBlock/InfoBlock";
import RuCalendar from "@/components/shared/RuCalendar/RuCalendar";
import TimeSelect from "@/components/shared/TimeSelect/TimeSelect";
import {useFormState, useWatch} from "react-hook-form";
import {useCreateTask} from "@/hooks/useCreateTask";

const DeadlinePicker = () => {
    const { setValue,  control } = useCreateTask();
    const { errors } = useFormState({ name: ["day", "time"], control });
    return (
            <InfoBlock label="Дедлайн" error={errors.day?.message || errors.time?.message}>
                <div className={s.deadline}>
                    <TimeSelect onChange={(time) => setValue("time", time)} />

                    <RuCalendar
                        date={useWatch({ name: "day" , control})}
                        setDate={(date) => setValue("day", date)}
                    />
                </div>
            </InfoBlock>
    );
};

export default DeadlinePicker;


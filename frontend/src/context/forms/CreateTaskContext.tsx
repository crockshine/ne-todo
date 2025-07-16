"use client";
import { TaskFormData, taskSchema } from '@/validations/add-task.validation';
import React, {createContext, ReactNode} from 'react';
import {
    Control,
    useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { combineDate } from "@/helpers/combineDate";
import { createTask } from "@/api/tasks";
import {IBaseFormInterface} from "@/context/base-form.interface";

interface ICreateTaskContext extends IBaseFormInterface<TaskFormData>{
    submitCreateTask:  (e?: React.BaseSyntheticEvent) => Promise<void>;

    control: Control<TaskFormData>
}

const CreateTaskContext = createContext<ICreateTaskContext | undefined>(undefined);

interface CreateTaskProviderProps {
    children: ReactNode;
}

export const CreateTaskProvider = ({ children }: CreateTaskProviderProps) => {

    const _onSubmit = async ({ day, time, tagsId, title }: TaskFormData) => {
        const deadline = day && time ? combineDate(day, time) : day;
        await createTask({ title, tagsId, deadline });
    };

    // форма
    const {
        register,
        handleSubmit,
        setValue,
        formState,
        control
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        mode: "all",
    });

    const submitCreateTask = handleSubmit(_onSubmit);

    return (
        <CreateTaskContext value={{submitCreateTask, register, handleSubmit, setValue, formState, control}}>
                {children}
        </CreateTaskContext>
    );
};

export default CreateTaskContext;
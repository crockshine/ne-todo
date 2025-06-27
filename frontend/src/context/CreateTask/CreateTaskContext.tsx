"use client";
import {TaskFormData, taskSchema} from '@/validations/add-task.validation';
import React, {createContext, ReactNode} from 'react';
import {
    useForm,
    UseFormRegister,
    UseFormHandleSubmit,
    UseFormWatch,
    UseFormSetValue,
    FieldErrors
} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {combineDate} from "@/helpers/combineDate";
import {createTask} from "@/api/tasks";

interface ICreateTaskContext {
    onSubmit: (data: TaskFormData) => Promise<void>;

    register: UseFormRegister<TaskFormData>;
    handleSubmit: UseFormHandleSubmit<TaskFormData>;
    setValue: UseFormSetValue<TaskFormData>;
    watch: UseFormWatch<TaskFormData>;
    formState: { errors: FieldErrors<TaskFormData> };
}

const CreateTaskContext = createContext<ICreateTaskContext | undefined>(undefined);

interface CreateTaskProviderProps {
    children: ReactNode;
}

export const CreateTaskProvider = ({children}: CreateTaskProviderProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        mode: 'all',
    });

    const onSubmit = async ({day, time, tagsId, title}: TaskFormData) => {
        const deadline =
            day && time
                ? combineDate(day, time)
                : day;

        await createTask({ title, tagsId, deadline });
    }

    return (
        <CreateTaskContext value={{onSubmit, register, handleSubmit,setValue, watch, formState }}>
            {children}
        </CreateTaskContext>
    );
};


export default CreateTaskContext;
"use client"
import {TTag} from "@/mocks/tags";
import React, {createContext, ReactNode, useOptimistic, useState} from "react";
import {createTag} from "@/api/tags";
import {
    FieldErrors,
    useForm,
    UseFormHandleSubmit,
    UseFormRegister, UseFormReset,
    UseFormSetValue,
} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AddTagFormData, addTagSchema} from "@/validations/add-tag.validation";


interface ITagsContext {
    optimisticTags: TTag[];
    addOptimisticTags: (tag: TTag) => Promise<void>;

    register: UseFormRegister<AddTagFormData>;
    reset: UseFormReset<AddTagFormData>;
    handleSubmit: UseFormHandleSubmit<AddTagFormData>;
    setValue: UseFormSetValue<AddTagFormData>;
    formState: { errors: FieldErrors<AddTagFormData> };
}

export const TagsContext = createContext<ITagsContext | undefined>(undefined)


export const TagsProvider = ({children}: { children: ReactNode }) => {
    // тэги пользователя
    const [tags, setTags] = useState<TTag[]>([]);
    const [optimisticTags, setOptimisticTags] = useOptimistic<TTag[], TTag>(
        tags,
        (state, newTag) => [...state, newTag]
    );

    const addOptimisticTags = async (tag: TTag) => {
        setOptimisticTags({...tag, isLoading: true})
        const res = await createTag(tag)
        if (!res) return
        setTags(prev => [...prev, tag])
    }

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState
    } = useForm<AddTagFormData>({
        resolver: zodResolver(addTagSchema),
        mode: 'onSubmit',
    });


    return (
        <TagsContext value={{optimisticTags, addOptimisticTags, reset, register, handleSubmit, setValue, formState }}>
            {children}
        </TagsContext>
    );
};
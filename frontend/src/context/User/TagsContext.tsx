"use client"

import React, {createContext, ReactNode, startTransition, useOptimistic, useState} from "react";
import {createTag, getAllTags} from "@/api/tags";
import {
    FieldErrors,
    useForm,
    UseFormHandleSubmit,
    UseFormRegister, UseFormReset,
    UseFormSetValue,
} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AddTagFormData, addTagSchema} from "@/validations/add-tag.validation";
import {useAsync} from "react-use";
import {ITag, IUITag} from "@/types/checkbox.interface";


export interface ITagsContext {
    optimisticTags: IUITag[];
    addOptimisticTags: (tag: ITag) => Promise<void>;
    retryAddTag: (id: string) => void;

    register: UseFormRegister<AddTagFormData>;
    reset: UseFormReset<AddTagFormData>;
    handleSubmit: UseFormHandleSubmit<AddTagFormData>;
    setValue: UseFormSetValue<AddTagFormData>;
    formState: { errors: FieldErrors<AddTagFormData> };
}

export const TagsContext = createContext<ITagsContext | undefined>(undefined)


export const TagsProvider = ({children}: { children: ReactNode }) => {
    // тэги пользователя
    const [tags, setTags] = useState<IUITag[]>([]);
    const [optimisticTags, setOptimisticTags] = useOptimistic<IUITag[], ITag>(
        tags,
        (state, newTag) => [...state, {...newTag, isLoading: true}]
    );

    const _createNewTag = async (tag: ITag) => {
        const res = await createTag(tag)
        if (res) {
            startTransition(() => {
                setTags(prev => [...prev, res]);
            })
        } else {
            startTransition(() => {
                setTags(
                    prev => [...prev, {...tag, isError: true}]
                )
            })
        }
    }

    const addOptimisticTags = async (tag: ITag) => {
        setOptimisticTags(tag)
        await _createNewTag(tag)
    }

    const retryAddTag =  (id: string) => {
        const badTag = tags.find(t => t.id === id)
        if (badTag) {
            setTags(prev => prev.filter(t => t.id !== id))
            startTransition(async () =>
                await addOptimisticTags({
                    id: badTag.id,
                    value: badTag.value,
                    color: badTag.color,
                })
            )
        }
    }

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState
    } = useForm<AddTagFormData>({
        resolver: zodResolver(addTagSchema(optimisticTags)),
        mode: 'onSubmit',
    });

    useAsync(async () => {
        const res = await getAllTags()
        if (res) { setTags(res) }
    }, [])

    return (
        <TagsContext value={{optimisticTags, addOptimisticTags, retryAddTag, reset, register, handleSubmit, setValue, formState }}>
            {children}
        </TagsContext>
    );
};
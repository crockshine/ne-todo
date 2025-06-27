"use client"
import {TTag} from "@/mocks/tags";
import React, {createContext, ReactNode, startTransition, useOptimistic, useState} from "react";
import {createTag, TCreateTag} from "@/api/tags";
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
    retryAddTag: (id: number) => Promise<void>;

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

    const _createNewTag = async (tag: TCreateTag) => {
        const res = await createTag(tag)
        if (res) {
            setTags(prev => [...prev, res])
        } else {
            setTags(
                prev => [...prev, {...tag, isLoading: false, isError: true}]
            )
        }
    }

    const addOptimisticTags = async (tag: TCreateTag) => {
        setOptimisticTags({...tag, isLoading: true})
        await _createNewTag(tag)
    }

    const retryAddTag = async (id: number) => {
        const badTag = tags.find(t => t.id === id)
        if (badTag) {
            setTags(prev => prev.filter(t => t.id !== id))
            startTransition(async () =>
                await addOptimisticTags({
                    id: badTag.id,
                    value: badTag.value,
                    color: badTag.color
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
        resolver: zodResolver(addTagSchema),
        mode: 'onSubmit',
    });


    return (
        <TagsContext value={{optimisticTags, addOptimisticTags, retryAddTag, reset, register, handleSubmit, setValue, formState }}>
            {children}
        </TagsContext>
    );
};
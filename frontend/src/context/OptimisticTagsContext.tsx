"use client";
import React, {createContext, ReactNode, startTransition, useOptimistic} from 'react';
import {ITag, IUITag} from "@/types/checkbox.interface";
import tagsStore from "@/stores/tags.store";
import {
    FieldErrors,
    useForm,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormReset,
    UseFormSetValue
} from "react-hook-form";
import {AddTagFormData, addTagSchema} from "@/validations/add-tag.validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {observer} from "mobx-react-lite";


interface IOptimisticTagsContext {
    optimisticTags: IUITag[];
    optCreateTag: (newTag: ITag) => void
    optRetryAddTag: (id: string) => void;
    optDeleteTag: (id: string) => void;

    register: UseFormRegister<AddTagFormData>;
    reset: UseFormReset<AddTagFormData>;
    handleSubmit: UseFormHandleSubmit<AddTagFormData>;
    setValue: UseFormSetValue<AddTagFormData>;
    formState: { errors: FieldErrors<AddTagFormData> };
}

const OptimisticTagsContext = createContext<IOptimisticTagsContext | undefined>(undefined);

interface OptimisticTagsProviderProps {
    children: ReactNode;
}

export const OptimisticTagsProvider = observer(({children}: OptimisticTagsProviderProps) => {
    const {userTags, createTag, retryAddTag, deleteTag} = tagsStore

    const [optimisticTags, setOptimisticTags] = useOptimistic<IUITag[], ITag>(
        userTags,
        (tags, newTag) => [
            ...tags, {...newTag, isLoading: true, isError: false}
        ]
    )

    // оптимистично создать тег
    const optCreateTag =  (newTag: ITag) => {
        startTransition(async () => {
            setOptimisticTags(newTag)
            await createTag(newTag)
        })
    }

    // оптимистично повторить создание тега
    const optRetryAddTag = async (id: string) => {
        const badTag = optimisticTags.find(t => t.id === id)
        if (badTag) {
            startTransition(async () => {
                setOptimisticTags({
                    id: badTag.id,
                    value: badTag.value,
                    color: badTag.color
                })
                await retryAddTag(badTag)
            })
        }
    }

    // оптимистично удалить тег
    const optDeleteTag = async (id: string) => {
            await deleteTag(id)
    }

    // работа с формой
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState
    } = useForm<AddTagFormData>({
        resolver: zodResolver(addTagSchema(optimisticTags)),
        mode: 'onSubmit',
    });

    return (
        <OptimisticTagsContext
            value={{optimisticTags, optRetryAddTag, optDeleteTag, optCreateTag, setValue, register, handleSubmit, reset, formState}}>
            {children}
        </OptimisticTagsContext>
    );
});

export default OptimisticTagsContext;
'use client'
import React, {useEffect, useState} from 'react';
import s from './TagList.module.css'
import AddTagButton from "@/components/shared/AddTagButton/AddTagButton";
import {Plus} from 'lucide-react';
import Tag from "@/components/shared/Tag/Tag";
import tagsStore from "@/stores/tags.store";
import {useCreateTask} from "@/hooks/useCreateTask";
import {useModal} from "@/hooks/useModal";
import {useOptimisticTags} from "@/hooks/useOptimisticTags";


const TagList = () => {
    const [activeTabs, setActiveTabs] = useState<string[]>([])
    const {switchModal} = useModal()

    const {setValue} = useCreateTask()
    const {fetchAllTags} = tagsStore
    const {optimisticTags, optDeleteTag, optRetryAddTag} = useOptimisticTags()

    // форма
    const _handleSetActiveTab = (tabsId: string[]) => {
        setValue('tagsId', tabsId)
        setActiveTabs(tabsId)
    }

    // множественный выбор тегов
    const onCheckedChange = (tabId: string, state: boolean) => {
        const newTabs =
            state ? [...activeTabs, tabId] : activeTabs.filter(tab => tab !== tabId);

        _handleSetActiveTab(newTabs);
    }


    useEffect(() => {
        // IIFE
        (async () => await fetchAllTags())()
    }, [fetchAllTags])

    return (
        <div className={s.tagListWrapper}>
            {
                optimisticTags.map(tab =>
                    <Tag
                        key={tab.id}
                        checkboxProps={{
                            id: tab.id,
                            value: tab.value,
                            color: tab.color,
                            isLoading: tab.isLoading,
                            isError: tab.isError,
                            isActive: activeTabs.includes(tab.id),
                            onCheckedChange,
                        }}
                        onRetry={id => optRetryAddTag(id)}
                        onDelete={(id, isError) => optDeleteTag(id, isError)}
                    />
                )
            }
            <AddTagButton icon={<Plus />} label={'Добавить'} onClick={() => switchModal('addTag')}/>
        </div>

    );
};

export default TagList;
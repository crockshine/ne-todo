'use client'
import React, {use, useState} from 'react';
import s from './TagList.module.css'
import AddTagButton from "@/components/shared/AddTagButton/AddTagButton";
import {Plus} from 'lucide-react';
import ModalsContext from "@/context/Modal/ModalContext";
import CreateTaskContext from "@/context/CreateTask/CreateTaskContext";
import {useUser} from "@/hooks/useUser";
import Tag from "@/components/shared/Tag/Tag";


const TagList = () => {
    const [activeTabs, setActiveTabs] = useState<string[]>([])

    const modal = use(ModalsContext)
    const createTasks = use(CreateTaskContext);
    const user = useUser()

    if (!createTasks || !user) return
    const {setValue} = createTasks

    const _handleSetActiveTab = (tabsId: string[]) => {
        setValue('tagsId', tabsId)
        setActiveTabs(tabsId)
    }

    // множественный выбор
    const onCheckedChange = (tabId: string, state: boolean) => {
        console.log(tabId, state);
        const newTabs =
            state ? [...activeTabs, tabId] : activeTabs.filter(tab => tab !== tabId);

        _handleSetActiveTab(newTabs);
    }

    return (
        <div className={s.tagListWrapper}>
            {
                user.optimisticTags.map(tab =>
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
                        onRetry={user?.retryAddTag}
                        onDelete={id => console.log(id)}
                    />
                )
            }
            <AddTagButton icon={<Plus />} label={'Добавить'} onClick={() => modal?.switchModal('addTag')}/>
        </div>

    );
};

export default TagList;
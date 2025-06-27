'use client'
import {use, useState} from 'react';
import s from './TagList.module.css'
import IconButton from "@/components/shared/IconButton/IconButton";
import { Plus } from 'lucide-react';
import CheckboxList from "@/widgets/CheckboxList/CheckboxList";
import ModalsContext from "@/context/Modal/ModalContext";
import CreateTaskContext from "@/context/CreateTask/CreateTaskContext";
import {useUser} from "@/hooks/useUser";


const TagList = () => {
    const [activeTabs, setActiveTabs] = useState<number[]>([])

    const modal = use(ModalsContext)
    const createTasks = use(CreateTaskContext);
    const user = useUser()

    if (!createTasks || !user) return
    const {setValue} = createTasks

    const handleSetActiveTab = (tabsId: number[]) => {
        setValue('tagsId', tabsId)
        setActiveTabs(tabsId)
    }

    return (
        <div className={s.tagListWrapper}>
            <CheckboxList tabs={user.optimisticTags} mode={'many'} activeTabs={activeTabs} setActiveTabs={handleSetActiveTab} />
            <IconButton icon={<Plus />} label={'Добавить'} onClick={() => modal?.switchModal('addTag')}/>
        </div>

    );
};

export default TagList;
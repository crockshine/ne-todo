'use client'
import React from 'react';
import s from './TagList.module.css'
import IconButton from "@/components/shared/IconButton/IconButton";
import { Plus } from 'lucide-react';
import {useModal} from "@/hooks/useModal";
import CheckboxList from "@/widgets/CheckboxList/CheckboxList";
import {ITab} from "@/mocks/tags";


interface IProps {
    tabs: ITab[];
}

const TagList = ({tabs}: IProps) => {
    const modal = useModal()
    const [activeTabs, setActiveTabs] = React.useState<number[]>([]);

    const handleChangeTab = (tabId: number, state: boolean) => {
        if (state) {
            setActiveTabs(prev => [...prev, tabId])
        } else {
            setActiveTabs(prev => prev.filter(tab => tab !== tabId));
        }
    }

    return (
        <div className={s.tagListWrapper}>
            <CheckboxList tabs={tabs} activeTabs={activeTabs} onCheckedChange={handleChangeTab} />
            <IconButton icon={<Plus />} label={'Добавить'} onClick={() => modal?.switchModal('addTag')}/>
        </div>

    );
};

export default TagList;
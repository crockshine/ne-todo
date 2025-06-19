'use client'
import  {useState} from 'react';
import s from './TabList.module.css'
import IconButton from "@/components/shared/IconButton/IconButton";
import { Plus } from 'lucide-react';
import {useModal} from "@/hooks/useModal";
import CheckboxList from "@/widgets/CheckboxList/CheckboxList";
import {ITab} from "@/mocks/tags";


interface IProps {
    tabs: ITab[];
    onChange: (tabs: number[]) => void;
}

const TabList = ({tabs, onChange}: IProps) => {
    const modal = useModal()
    const [activeTabs, setActiveTabs] = useState<number[]>([]);

    const handleChangeTab = (tabId: number, state: boolean) => {
        setActiveTabs(prev => {
            const newTabs =
                state
                ? [...prev, tabId]
                : prev.filter(tab => tab !== tabId);

            onChange(newTabs);
            return newTabs;
        });
    }

    return (
        <div className={s.tagListWrapper}>
            <CheckboxList tabs={tabs} activeTabs={activeTabs} onCheckedChange={handleChangeTab} />
            <IconButton icon={<Plus />} label={'Добавить'} onClick={() => modal?.switchModal('addTag')}/>
        </div>

    );
};

export default TabList;
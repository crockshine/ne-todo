'use client'
import React from 'react';
import s from './TagList.module.css'
import Tag from "@/components/shared/Tag/Tag";


export interface ITab {
    name: string;
    value: string;
    color:string;
}

interface IProps {
    tabs: ITab[];
}

const TagList = ({tabs}: IProps) => {
    const [activeTabs, setActiveTabs] = React.useState<string[]>([]);

    const handleChangeTab = (tabName: string, state: boolean) => {
        if (state) {
            setActiveTabs(prev => [...prev, tabName])
        } else {
            setActiveTabs(prev => prev.filter(tab => tab !== tabName));
        }
    }

    return (
        <div className={s.tagListWrapper}>
            {
                tabs.map(tab =>
                    <Tag
                        key={tab.value}
                        value={tab.value}
                        name={tab.name}
                        color={tab.color}
                        activeTabs={activeTabs}
                        onCheckedChange={handleChangeTab}
                    />
                )
            }
        </div>

    );
};

export default TagList;
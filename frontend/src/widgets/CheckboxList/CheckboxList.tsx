'use client'
import React from 'react';
import Tag from "@/components/shared/Tag/Tag";
import {TTag} from "@/mocks/tags";

interface ICheckboxListProps {
    tabs: TTag[];
    mode: 'one' | 'many';
    activeTabs: number[];
    setActiveTabs: (tagsId: number[]) => void;
}

const  CheckboxList = ({tabs, activeTabs, mode, setActiveTabs}: ICheckboxListProps) => {

    const _manyChangeTab = (tabId: number, state: boolean) => {
        const newTabs =
            state ? [...activeTabs, tabId] : activeTabs.filter(tab => tab !== tabId);

        setActiveTabs(newTabs);
    }

    const _oneChangeTab = (tabId: number, state: boolean) => {
        if (state)
        { setActiveTabs([tabId]) }
        else
        { setActiveTabs(activeTabs.filter(tab => tab !== tabId)) }

    }

    const onCheckedChange = (tabId: number, state: boolean) => {
        if (mode === 'one')
        { _oneChangeTab(tabId, state); }
        else
        { _manyChangeTab(tabId, state) }
    }

    return (
        tabs.map(tab =>
            <Tag
                key={tab.id}
                id={tab.id}
                value={tab.value}
                color={tab.color}
                isActive={activeTabs.includes(tab.id)}
                onCheckedChange={onCheckedChange}
            />
        )
    );
};

export default CheckboxList;
'use client'
import React from 'react';
import Tag from "@/components/shared/Tag/Tag";
import {ITab} from "@/mocks/tags";


interface ICheckboxListProps {
    tabs: ITab[];
    activeTabs: number[];
    onCheckedChange: (tabId: number, state: boolean) => void;
}

const CheckboxList = ({tabs, activeTabs, onCheckedChange}: ICheckboxListProps) => {
    return (
        tabs.map(tab =>
            <Tag
                key={tab.id}
                id={tab.id}
                value={tab.value}
                name={tab.name}
                color={tab.color}
                activeTabs={activeTabs}
                onCheckedChange={onCheckedChange}
            />
        )
    );
};

export default CheckboxList;
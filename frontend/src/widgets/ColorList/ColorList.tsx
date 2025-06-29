'use client'
import React, {useState} from 'react';
import {useUser} from "@/hooks/useUser";
import SharedCheckbox from "@/components/shared/SharedCheckbox/SharedCheckbox";
import {getAllColors} from "@/api/colors";
import {IColor} from "@/types/color.interface";
import {useAsync} from "react-use";


const ColorList = () => {
    const [colors, setColors] = useState<IColor[]>([]);
    const [activeTab, setActiveTab] = useState<string | null>(null)
    useAsync(async ()=>{
        const c = await getAllColors()
        setColors(c)
    }, [])

    const user = useUser()
    if (!user) return
    const {setValue} = user

    const handleSetActiveTab = (tabsId: string) => {
        setValue('color', tabsId)
        setActiveTab(tabsId)
    }

    return (
                colors?.map(tab =>
                    <SharedCheckbox
                        key={tab.id}
                        id={tab.color}
                        color={tab.color}
                        isActive={activeTab === tab.color}
                        onCheckedChange={(id) => handleSetActiveTab(id)}
                    />
                )
    );
};

export default ColorList;
'use client'
import React, {useState} from 'react';
import SharedCheckbox from "@/components/shared/SharedCheckbox/SharedCheckbox";
import {getAllColors} from "@/api/colors";
import {IColor, TColor} from "@/types/color.interface";
import {useAsync} from "react-use";
import {useOptimisticTags} from "@/hooks/useOptimisticTags";


const ColorList = () => {
    const [colors, setColors] = useState<IColor[]>([]);
    const [activeTab, setActiveTab] = useState<TColor | null>(null)

    const {setValue} = useOptimisticTags()


    // TODO получени из стора юзера
    useAsync(async ()=>{
        const c = await getAllColors()
        setColors(c)
    }, [])


    const handleSetActiveTab = (tabsId: TColor) => {
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
                        onCheckedChange={(color ) => handleSetActiveTab(color as TColor)}
                    />
                )
    );
};

export default ColorList;
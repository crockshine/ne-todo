"use client"
import s from './AddTagModal.module.css'
import React from 'react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent, DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {useModal} from "@/hooks/useModal";
import InfoBlock from "@/components/shared/InfoBlock/InfoBlock";
import {Input} from "@/components/ui/input";
import CheckboxList from "@/widgets/CheckboxList/CheckboxList";
import {colors} from "@/mocks/tags";

const AddTagModal = () => {
    const modal = useModal();
    const isOpen = modal?.isOpen('addTag')
    const [activeTabs, setActiveTabs] = React.useState<number[]>([]);

    const handleChangeTab = (tabId: number, state: boolean) => {
        if (state) {
            setActiveTabs([tabId])
        } else {
            setActiveTabs(prev => prev.filter(tab => tab !== tabId));
        }
    }

    const handleOpenChange = (state: boolean) => {
        modal?.onClose(state)
        if (!state){
            setActiveTabs([])
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Добавить тэг</DialogTitle>
                        <DialogDescription/>
                    </DialogHeader>

                    <form  id={"addTagForm"} className={s.form}>
                        <InfoBlock label={'Название'}>
                            <Input className={'bg-muted'}/>
                        </InfoBlock>

                        <InfoBlock label={'Цвет'}>
                            <div className={s.tagListWrapper}>
                                <CheckboxList tabs={colors} activeTabs={activeTabs} onCheckedChange={handleChangeTab} />
                            </div>
                        </InfoBlock>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Отмена</Button>
                            </DialogClose>
                            <Button type="submit" id={"addTagForm"}>Сохранить</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
        </Dialog>
    );
};

export default AddTagModal;
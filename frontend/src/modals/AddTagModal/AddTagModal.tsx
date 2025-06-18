"use client";
import s from './AddTagModal.module.css'
import React from 'react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
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
            setActiveTabs(prev => [...prev, tabId])
        } else {
            setActiveTabs(prev => prev.filter(tab => tab !== tabId));
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={modal?.onClose}>
            <form>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Добавить тэг</DialogTitle>
                    </DialogHeader>

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
                        <Button type="submit">Сохранить</Button>
                    </DialogFooter>

                </DialogContent>
            </form>
        </Dialog>
    );
};

export default AddTagModal;
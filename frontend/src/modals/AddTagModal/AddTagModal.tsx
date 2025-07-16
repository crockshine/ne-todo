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
import InfoBlock from "@/components/shared/InfoBlock/InfoBlock";
import {Input} from "@/components/ui/input";
import ColorList from "@/widgets/ColorList/ColorList";
import {AddTagFormData} from "@/validations/add-tag.validation";
import {ITag} from "@/types/checkbox.interface";
import {useModal} from "@/hooks/useModal";
import {useOptimisticTags} from "@/hooks/useOptimisticTags";


const AddTagModal = () => {
    const {isOpen, onClose, closeAll} = useModal()
    const isOpened = isOpen('addTag')

    const {optCreateTag, formState, reset, handleSubmit, register} = useOptimisticTags()


    const handleOpenChange = (state: boolean) => {
        onClose(state)
        if (!state) reset()
    }

    const addTag =  ({title, color}: AddTagFormData) => {
        const newTag: ITag = {
            id: new Date().toString(),
            value: title.trim().toLowerCase(),
            color: color,
        }
        optCreateTag(newTag)
        closeAll()
        reset()
    }


    return (
        <Dialog open={isOpened} onOpenChange={handleOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Добавить тэг</DialogTitle>
                        <DialogDescription/>
                    </DialogHeader>

                    <form
                        onSubmit={handleSubmit(addTag)}
                        id={"addTagForm"} className={s.form}>
                        <InfoBlock label={'Название'} error={formState.errors.title?.message}>
                            <Input className={'bg-secondary'} {...register('title')}/>
                        </InfoBlock>

                        <InfoBlock label={'Цвет'} error={formState.errors.color?.message}>
                            <div className={s.tagListWrapper}>
                                <ColorList/>
                            </div>
                        </InfoBlock>

                        <DialogFooter >
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
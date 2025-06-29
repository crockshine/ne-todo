"use client"
import s from './AddTagModal.module.css'
import React, {startTransition,  use, } from 'react';
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
import ModalsContext from "@/context/Modal/ModalContext";
import {useUser} from "@/hooks/useUser";
import {AddTagFormData} from "@/validations/add-tag.validation";
import {ITag} from "@/types/checkbox.interface";

const AddTagModal = () => {
    const modal = use(ModalsContext)
    const isOpen = modal?.isOpen('addTag')

    const user = useUser()
    if (!user) return
    const {handleSubmit, addOptimisticTags, register, formState, reset} = user


    const handleOpenChange = (state: boolean) => {
        modal?.onClose(state)
        if (!state) resetForm()
    }

    const resetForm = () => {
        reset()
    }

    const addTag = ({title, color}: AddTagFormData) => {
        const newTag: ITag = {
            id: new Date().toString(),
            value: title.trim().toLowerCase(),
            color: color,
        }
        startTransition(async ()=> await addOptimisticTags(newTag))
        modal?.closeAll()
        resetForm()
    }


    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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
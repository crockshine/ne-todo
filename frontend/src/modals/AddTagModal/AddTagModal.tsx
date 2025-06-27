"use client"
import s from './AddTagModal.module.css'
import React, {startTransition, use,  useState} from 'react';
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
import CheckboxList from "@/widgets/CheckboxList/CheckboxList";
import {colors} from "@/mocks/colors";
import ModalsContext from "@/context/Modal/ModalContext";
import {useUser} from "@/hooks/useUser";
import {AddTagFormData} from "@/validations/add-tag.validation";
import {TCreateTag} from "@/api/tags";

const AddTagModal = () => {
    const [activeColors, setActiveColors] = useState<number[]>([]);

    const modal = use(ModalsContext)
    const isOpen = modal?.isOpen('addTag')

    const user = useUser()
    if (!user) return
    const {handleSubmit, addOptimisticTags, register, setValue, formState, reset} = user


    const handleOpenChange = (state: boolean) => {
        modal?.onClose(state)
        if (!state) resetForm()
    }

    const resetForm = () => {
        reset()
        setActiveColors([])
    }

    const addTag = async ({title, color}: AddTagFormData) => {
        const newTag: TCreateTag = {
            id: new Date().toString(),
            value: title.trim().toLowerCase(),
            color: color[0],
        }
        startTransition(async ()=> await addOptimisticTags(newTag))
        modal?.closeAll()
        resetForm()
    }

    const handleSetActiveTab = (tabsId: number[]) => {
        setValue('color', tabsId)
        setActiveColors(tabsId)
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
                                <CheckboxList tabs={colors} mode={'one'} setActiveTabs={handleSetActiveTab} activeTabs={activeColors}/>
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
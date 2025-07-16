"use client"
import s from './RegisterModal.module.css'
import React from 'react';
import {Button} from "@/components/ui/button"
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
import ProfileForm from "@/widgets/ProfileForm/ProfileForm";
import {useEditProfile} from "@/hooks/useEditProfile";


const RegisterModal = () => {
    const {isOpen, onClose, closeAll} = useModal()
    const isOpened = isOpen('register')

    const {formState, register, reset, createNewUser} = useEditProfile()


    const handleOpenChange = (state: boolean) => {
        onClose(state)
        if (!state) reset()
    }

    return (
        <Dialog open={true} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Регистрация</DialogTitle>
                    <DialogDescription/>
                </DialogHeader>

                <ProfileForm onSubmit={ createNewUser}>
                    <DialogFooter>
                        <Button variant="link">Войти</Button>
                        <Button type='submit'>Зарегистрироваться</Button>
                    </DialogFooter>
                </ProfileForm>

            </DialogContent>
        </Dialog>
    );
};

export default RegisterModal;
"use client";
import React, {createContext, ReactNode} from 'react';
import {
    useForm, UseFormReset,
} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {IBaseFormInterface} from "@/context/base-form.interface";
import {EditProfileInfo, editProfileInfoSchema} from "@/validations/edit-profile-info.validation";
import {createUser, IUserRequest} from "@/api/profile";


interface IEditProfileInfoContext extends IBaseFormInterface<EditProfileInfo> {
    createNewUser: (e?: React.BaseSyntheticEvent) => Promise<void>,

    reset: UseFormReset<EditProfileInfo>
}

const EditProfileInfoContext = createContext<IEditProfileInfoContext | undefined>(undefined);

interface EditProfileInfoProviderProps {
    children: ReactNode;
}

export const EditProfileInfoProvider = ({children}: EditProfileInfoProviderProps) => {


    // работа с формой
    const {
        register,
        handleSubmit,
        setValue,
        formState,
        reset,

        getValues
    } = useForm<EditProfileInfo>({
        resolver: zodResolver(editProfileInfoSchema),
        mode: 'all',
    });

    const create = async () => {
        const userData: IUserRequest = {
            name: getValues('name'),
            email: getValues('email'),
            password: getValues('password'),
        }
        await createUser(userData)
    }

    const createNewUser = handleSubmit(create);
    return (
        <EditProfileInfoContext
            value={{
                createNewUser,
                setValue, register,  formState, reset}}>
            {children}
        </EditProfileInfoContext>
    );
};

export default EditProfileInfoContext;
import React from 'react';
import s from './ProfileForm.module.css'
import InfoBlock, {InfoBlockVariants} from "@/components/shared/InfoBlock/InfoBlock";
import {Input} from "@/components/ui/input";
import PasswordInput from "@/components/shared/PasswordInput/PasswordInput";
import {useEditProfile} from "@/hooks/useEditProfile";
import userStore from "@/stores/user.store";
import {observer} from "mobx-react-lite";
import {EditProfileInfo} from "@/validations/edit-profile-info.validation";
import { cn } from '@/lib/utils';

interface IProfileForm extends  React.ComponentProps<"form">{
    variant?: InfoBlockVariants;
    children?: React.ReactNode[] | React.ReactNode;
}

type FormFieldComponent = typeof Input | typeof PasswordInput;

interface IFormFields {
    id: keyof EditProfileInfo;
    label: string;
    error?: string;
    component: FormFieldComponent;
    defaultValue: string | null;
}


const ProfileForm = observer(({variant='default', children, ...props}: IProfileForm) => {
    const {user} = userStore
    const {register, formState} = useEditProfile()

    const formStyle = () =>
        variant === 'default'
            ? s.defaultForm
            : s.smallForm

    const formFields: IFormFields[] = [
        {
            id: 'name',
            label: 'Имя',
            component: Input,
            error: formState.errors.name?.message,
            defaultValue: user.username
        },
        {
            id: 'email',
            label: 'Почта',
            component: Input,
            error: formState.errors.email?.message,
            defaultValue: user.email
        },
        {
            id: 'password',
            label: 'Пароль',
            component: PasswordInput,
            error: formState.errors.password?.message,
            defaultValue: user.password
        }
    ]

    return (
        <form className={cn(s.profileForm, formStyle())} {...props}>
            {
                formFields.map(field => {
                        const Component = field.component
                        return (
                            <InfoBlock
                                key={field.id}
                                label={field.label}
                                variant={variant}
                                error={field.error}
                            >
                                <Component
                                    defaultValue={field.defaultValue}
                                    className={'bg-accent'}
                                    id={field.label}
                                    {...register(field.id)}
                                />
                            </InfoBlock>
                        )
                    }
                )
            }
            {
                children
            }
        </form>

    );
});

export default ProfileForm;
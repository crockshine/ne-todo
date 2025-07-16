'use client'
import React from 'react';
import s from './ProfileDropdown.module.css'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import userStore from "@/stores/user.store";
import {observer} from "mobx-react-lite";
import {Settings} from "lucide-react";
import {Input} from "@/components/ui/input";
import PasswordInput from "@/components/shared/PasswordInput/PasswordInput";
import InfoBlock from "@/components/shared/InfoBlock/InfoBlock";
import {useEditProfile} from "@/hooks/useEditProfile";
import ProfileForm from "@/widgets/ProfileForm/ProfileForm";


const UserInfo = ({username, email}: { username: string, email: string }) => {
    return (
        <div className={s.userInfo}>
            <Settings opacity={.1} strokeWidth={1.5} className={s.settings}/>

            <div className={s.info}>
                <span>{username}</span>
                <span>{email}</span>
            </div>
        </div>

    )
}

const ProfileDropdown = observer(() => {
    const {user} = userStore

    return (
        <DropdownMenu dir={'ltr'}>
            <DropdownMenuTrigger className={cn(s.trigger, user ? s.user : s.login)} >
                {
                    user ? (
                        <UserInfo username={user.username} email={user.email}/>
                    ) : (
                        <span>Войти</span>
                    )
                }

            </DropdownMenuTrigger>

            {
                user && (
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Профиль</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                            <ProfileForm variant={'small'}/>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem variant={'destructive'}>Выйти</DropdownMenuItem>
                    </DropdownMenuContent>
                )
            }

        </DropdownMenu>

    );
});

export default ProfileDropdown;
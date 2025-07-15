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


const UserInfo = ({username, email}: { username: string, email: string }) => {
    return (
        <div className={s.userInfo}>
            <Settings opacity={.1} strokeWidth={1.5}/>

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
            <DropdownMenuTrigger className={s.trigger}>
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
                        <form className={s.profileForm}>
                            <label htmlFor="name">
                                <small>Имя</small>
                                <Input defaultValue={user.username} className={'bg-accent'} id={'name'}/>
                            </label>

                            <label htmlFor="email">
                                <small>Почта</small>
                                <Input defaultValue={user.email} className={'bg-accent'} id={'email'}/>
                            </label>

                            <label htmlFor="password">
                                <small>Пароль</small>
                                <PasswordInput defaultValue={user.username} className={'bg-accent'} id={'password'}/>
                            </label>
                        </form>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem variant={'destructive'}>Выйти</DropdownMenuItem>
                    </DropdownMenuContent>
                )
            }

        </DropdownMenu>

    );
});

export default ProfileDropdown;
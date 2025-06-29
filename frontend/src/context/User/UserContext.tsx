"use client"
import {createContext, ReactNode} from "react";
import {TagsProvider} from "@/context/User/TagsContext";

interface IUser {
    id: string;
    name: string;
    email: string;
}

interface UserContext {
    user: IUser;

}

export const UserContext = createContext<UserContext | undefined>(undefined)


export const UserProvider = ({children}: { children: ReactNode }) => {


    return (
            <UserContext value={{}}>
                <TagsProvider>
                {children}
                </TagsProvider>
            </UserContext>
    )
}
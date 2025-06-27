"use client"
import {TTag} from "@/mocks/tags";
import {createContext, ReactNode} from "react";
import {TagsProvider} from "@/context/User/TagsContext";

interface UserContext {

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
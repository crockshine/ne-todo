import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/styles/globals.css";
import {ModalsProvider} from "@/context/Modal/ModalContext";
import Modals from "@/modals";
import GradientLayout from "@/layouts/GradientLayout";
import React from "react";
import {CreateTaskProvider} from "@/context/CreateTask/CreateTaskContext";
// import {UserProvider} from "@/context/UserStore/UserContext";
import {TagsProvider} from "@/context/UserStore/TagsContext";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Ne ToDo",
    description: "Учебный проект написанный на Next, Nest, PostgresSQL и Docker",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.variable} font-sans antialiased`}>
        <ModalsProvider>
            <CreateTaskProvider>
                {/*<UserProvider>*/}
                <TagsProvider>
                    {children}
                    <GradientLayout/>
                    <Modals/>
                </TagsProvider>
                {/*</UserProvider>*/}
            </CreateTaskProvider>
        </ModalsProvider>
        </body>
        </html>
    );
}
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/styles/globals.css";
import {ModalsProvider} from "@/context/ModalContext";
import Modals from "@/modals";
import GradientLayout from "@/layouts/GradientLayout";
import React from "react";
import {CreateTaskProvider} from "@/context/CreateTaskContext";

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
                {children}
                <GradientLayout/>
                <Modals/>
            </CreateTaskProvider>
        </ModalsProvider>
        </body>
        </html>
    );
}
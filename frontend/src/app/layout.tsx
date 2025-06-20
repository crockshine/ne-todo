import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/styles/globals.css";
import {ModalsProvider} from "@/context/ModalContext";
import Modals from "@/modals";
import GradientLayout from "@/layouts/GradientLayout";
import React from "react";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Ne ToDo",
    description: "Учебный проект написанный на Next, Nes, PostgresSQL и Docker",
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
                    {children}
                    <GradientLayout/>
                    <Modals/>
                </ModalsProvider>
            </body>
        </html>
    );
}
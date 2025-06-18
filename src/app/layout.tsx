import type {Metadata} from "next";
import {Inter} from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "600"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Ne ToDo",
    description: "Учебный проект с использованием Next, Next, PostgresSQL и Docker",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    );
}
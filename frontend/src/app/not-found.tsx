import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center gap-3'>
            <span className='font-semibold text-2xl'>К сожалению, такой страницы нет</span>
            <Button>
                <Link href={'/'}>
                    На главную
                </Link>
            </Button>
        </div>
    );
};

export default NotFound;
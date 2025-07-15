"use client";
import React, {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {useWatch} from "react-hook-form";
import s from "./root-layout.module.css";
import AnimatedLogo from "@/components/shared/AnimatedLogo/AnimatedLogo";
import AnimatedImage from "@/components/shared/AnimatedImage/AnimatedImage";
import {useCreateTask} from "@/hooks/useCreateTask";
import TitleField from "@/widgets/TitleField/TitleField";
import OptionalFields from "@/widgets/OptionalFields/OptionalField";
import ProfileDropdown from "@/widgets/ProfileDropdown/ProfileDropdown";


const Page = () => {
    const [isCreating, setIsCreating] = useState(false);
    const {submitCreateTask, control} = useCreateTask();

    const title = useWatch({name: "title", control});

    useEffect(() => {
        if (title?.trim()) setIsCreating(true);
    }, [title]);

    return (
        <div className={s.wrapper}>
            <motion.div
                className={s.innerWrapper}
                initial={false}
                animate={{paddingTop: isCreating ? "0" : "35vh"}}
                transition={{duration: 0.5, ease: "easeInOut"}}
            >
                <AnimatedLogo isCreating={isCreating} setIsCreating={setIsCreating}/>

                <form className={s.createTaskWrapper} onSubmit={submitCreateTask}>
                    <TitleField/>
                    <AnimatePresence mode="wait">
                        {isCreating && <OptionalFields/>}
                    </AnimatePresence>
                </form>
            </motion.div>

            {/*<AnimatePresence>*/}
            {/*    {!isCreating && (*/}
            {/*        <div className={s.iconsWrapper}>*/}
            {/*            <AnimatedImage iconName="next" delay={0} />*/}
            {/*            <AnimatedImage iconName="nest" delay={0.1} />*/}
            {/*            <AnimatedImage iconName="docker" delay={0.2} />*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</AnimatePresence>*/}

            <footer className={s.footer}>
                <ProfileDropdown />

            </footer>
        </div>
    );
};

export default Page

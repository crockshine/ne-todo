"use client";
import React, { useEffect, useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWatch } from "react-hook-form";
import s from "./root-layout.module.css";
import AnimatedLogo from "@/components/shared/AnimatedLogo/AnimatedLogo";
import AnimatedImage from "@/components/shared/AnimatedImage/AnimatedImage";
import {useCreateTask} from "@/hooks/useCreateTask";
import TitleField from "@/widgets/TitleField/TitleField";
import OptionalFields from "@/widgets/OptionalFields/OptionalField";


const Page = () => {
    const [isCreating, setIsCreating] = useState(false);
    const { handleSubmit, onSubmit, control } = useCreateTask();

    const title = useWatch({ name: "title", control});

    useEffect(() => {
        if (title?.trim() && !isCreating) setIsCreating(true);
    }, [title, isCreating]);

    return (
        <>
            <motion.div
                className={s.wrapper}
                initial={false}
                animate={{ paddingTop: isCreating ? "2vh" : "35vh" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <AnimatedLogo isCreating={isCreating} setIsCreating={setIsCreating} />

                <form className={s.createTaskWrapper} onSubmit={handleSubmit(onSubmit)}>
                    <TitleField />
                    <AnimatePresence mode="wait">
                        {isCreating && <OptionalFields />}
                    </AnimatePresence>
                </form>
            </motion.div>

            <AnimatePresence>
                {!isCreating && (
                    <div className={s.iconsWrapper}>
                        <AnimatedImage iconName="next" delay={0} />
                        <AnimatedImage iconName="nest" delay={0.1} />
                        <AnimatedImage iconName="docker" delay={0.2} />
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Page

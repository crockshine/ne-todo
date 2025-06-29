"use client"
import {motion, AnimatePresence} from 'framer-motion'
import React, {ChangeEvent, use, useState} from 'react';
import s from './root-layout.module.css'
import CreateTaskInput from "@/components/shared/CreateTaskInput/CreateTaskInput";
import InfoBlock from "@/components/shared/InfoBlock/InfoBlock";
import CreateTask from "@/widgets/CreateTaskForm/CreateTask";
import AnimateImage from "@/components/shared/AnimateImage/AnimateImage";
import {cn} from "@/lib/utils";
import CreateTaskContext from "@/context/CreateTask/CreateTaskContext";


const MainPage = () => {
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const handleReplace = async (event: ChangeEvent<HTMLInputElement>) => {
        await register('title').onChange(event)
        if (event.target.value.trim() && !isCreating) {
            setIsCreating(true)
        }
    }

    const createTasks = use(CreateTaskContext);
    if (!createTasks) return
    const {register, handleSubmit, onSubmit, formState} = createTasks

    return (
        <>
            <motion.div
                className={s.wrapper}
                initial={false}
                animate={{
                    paddingTop: isCreating ? '2vh' : '35vh'
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeInOut"
                }}
            >
                    <div className={s.mainInfo}>
                        <motion.h1
                            className={cn(s.header, isCreating && 'cursor-pointer')}
                            initial={{fontSize: '60px'}}
                            animate={{fontSize: isCreating ? '32px' : '60px'}}
                            transition={{duration: 0.5, ease: "easeInOut"}}
                            onClick={() => isCreating && setIsCreating(false)}
                        >
                            <span>Ne</span>
                            <span>ToDo</span>
                        </motion.h1>

                        <AnimatePresence>
                            {!isCreating && (
                                <motion.h2
                                    className={s.description}
                                    initial={{opacity: 0, height: 0}}
                                    animate={{opacity: 1, height: "fit-content"}}
                                    exit={{opacity: 0, height: 0, transition: {duration: .6}}}
                                >
                                    лучший трекер задач
                                </motion.h2>
                            )}
                        </AnimatePresence>
                    </div>
                    <form className={s.createTaskWrapper} onSubmit={ handleSubmit(onSubmit)}>
                        <InfoBlock error={formState.errors.title?.message}>
                            <CreateTaskInput {...register('title')} onChange={ handleReplace}/>
                        </InfoBlock>

                        <AnimatePresence mode="wait">
                            {isCreating && (
                                <motion.div
                                    className={s.optionalForm}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.3}}
                                >
                                    <CreateTask/>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
            </motion.div>

            <AnimatePresence>
                {!isCreating && (
                    <div className={s.iconsWrapper}>
                        <AnimateImage iconName={'next'} delay={0}/>
                        <AnimateImage iconName={'nest'} delay={.1}/>
                        <AnimateImage iconName={'docker'} delay={.2}/>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MainPage;
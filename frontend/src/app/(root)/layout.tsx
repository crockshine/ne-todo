"use client"
import {motion, AnimatePresence} from 'framer-motion'
import React, {ChangeEvent, useState} from 'react';
import s from './root-layout.module.css'
import CreateTaskInput from "@/components/shared/CreateTaskInput/CreateTaskInput";
import InfoBlock from "@/components/shared/InfoBlock/InfoBlock";
import {TaskFormData} from "@/validations/add-task-validation";
import {createTask} from "@/api/tasks";
import {combineDate} from "@/helpers/combineDate";
import {useCreateTask} from "@/hooks/useCreateTask";
import CreateTask from "@/widgets/CreateTask/CreateTask";

const onSubmit = async ({day, time, tagsId, title}: TaskFormData) => {
    const deadline =
        day && time
            ? combineDate(day, time)
            : day;

    await createTask({title, tagsId, deadline});
}

const Layout = () => {
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const handleReplace = async (event: ChangeEvent<HTMLInputElement>) => {
        await register('title').onChange(event)
        if (event.target.value.trim() && !isCreating) {
            setIsCreating(true)
        }
    }

    const createTasks = useCreateTask()
    if (!createTasks) return
    const {register, handleSubmit, formState} = createTasks

    return (
        <motion.div
            className={s.wrapper}
            initial={false}
            animate={{
                paddingTop: isCreating ? '2vh' : '35vh'
            }}
            transition={{
                duration: 0.5,
                ease: [0.6, 1, 0.3, 1]
            }}
        >
            <div className={s.wrapper}>
                <div className={s.mainInfo}>
                    <motion.h1
                        className={s.header}
                        initial={{
                            fontSize:  '60px'
                        }}
                        animate={{
                            fontSize: isCreating ? '32px' : '60px'
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                    >
                        <span>Ne</span>
                        <span>ToDo</span>
                    </motion.h1>

                    <AnimatePresence>
                        {!isCreating && (
                            <motion.h2
                                className={s.description}
                                initial={{ opacity: 1 }}
                                exit={{
                                    opacity: 0,
                                    height: 0,
                                    transition: { duration: 0.5 }
                                }}
                            >
                                лучший трекер задач
                            </motion.h2>
                        )}
                    </AnimatePresence>
                </div>

                <form className={s.createTaskWrapper} onSubmit={handleSubmit(onSubmit)}>
                    <InfoBlock error={formState.errors.title?.message}>
                        <CreateTaskInput {...register('title')} onChange={handleReplace}/>
                    </InfoBlock>

                    <AnimatePresence mode="wait">
                        {isCreating && (
                            <motion.div
                                className={s.createTaskWrapper}
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
            </div>
        </motion.div>

    );
};

export default Layout;
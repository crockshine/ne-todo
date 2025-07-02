import React from 'react';
import {AnimatePresence, motion} from "framer-motion";
import {cn} from "@/lib/utils";
import s from './AnmatedLogo.module.css'
interface IAnimatedLogoProps {
    isCreating: boolean;
    setIsCreating: (state: boolean) => void
}

const AnimatedLogo = ({isCreating, setIsCreating}: IAnimatedLogoProps) => {
    return (
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
    );
};

export default AnimatedLogo;
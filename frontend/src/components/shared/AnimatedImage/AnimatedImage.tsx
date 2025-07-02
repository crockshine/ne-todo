import React from 'react';
import s from './AnimatedImage.module.css'
import {motion} from "framer-motion";
import {cn} from "@/lib/utils";

interface IAnimateImageProps {
    iconName: 'next' | 'nest' | 'docker';
    delay: number;
}

const AnimatedImage = ({iconName, delay} :IAnimateImageProps) => {
    return (
        <motion.div
            className={cn(s.icon, s[iconName])}
            initial={{opacity: 0, y: 100, rotateY: '-60deg'}}
            animate={{
                opacity: 1,
                y: 0,
                rotateY: 0,
            }}
            exit={{opacity: 0, y: 50}}
            transition={{duration: 1, ease: "easeInOut", delay: delay}}
        >
            <motion.img
                initial={{y: 0}}
                animate={{
                    y: [-10, 0, -10],
                }}
                transition={{
                    y: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 1 + delay,
                    },
                }}
                src={`${iconName}.png`}
                alt={`Иконка ${iconName}`}
            />
        </motion.div>
    );
};

export default AnimatedImage;
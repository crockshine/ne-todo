import {motion} from "framer-motion";
import s from "@/app/root-layout.module.css";
import React, {memo} from "react";
import TagList from "@/widgets/TagList/TagList";
import InfoBlock from "@/components/shared/InfoBlock/InfoBlock";
import DeadlinePicker from "@/widgets/DeadlinePicker/DeadlinePicker";

const OptionalFields = () =>
    <motion.div
        className={s.optionalForm}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
    >
        {/*не нуждается в отдельном компоненте - нет оптимизаций*/}
        <InfoBlock label="Метка">
            <TagList />
        </InfoBlock>

        <DeadlinePicker/>
    </motion.div>

export default memo(OptionalFields);
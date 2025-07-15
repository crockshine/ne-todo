import {useCreateTask} from "@/hooks/useCreateTask";
import {useFormState} from "react-hook-form";
import InfoBlock from "@/components/shared/InfoBlock/InfoBlock";
import CreateTaskInput from "@/components/shared/CreateTaskInput/CreateTaskInput";
import React, {memo} from "react";

const TitleField = () => {
    const { register, control } = useCreateTask();
    const { errors } = useFormState({ name: ["title"] , control });
    return (
        <InfoBlock error={errors.title?.message}>
            <CreateTaskInput {...register("title")} />
        </InfoBlock>
    );
}

export default memo(TitleField);
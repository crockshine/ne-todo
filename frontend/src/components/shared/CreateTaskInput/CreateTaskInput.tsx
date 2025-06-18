import React from 'react';
import s from './CreateTaskInput.module.css'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";



const CreateTaskInput = () => {
    return (
        <label className={s.inputWrapper} htmlFor="create-task">
            <Input
                id="create-task"
                placeholder="Сварить кофе"
            />
            <Button
                className={s.createTaskButton}
            >
                Создать
            </Button>
        </label>
    );
};

export default CreateTaskInput;
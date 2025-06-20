import React from 'react';
import s from './CreateTaskInput.module.css'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";


const CreateTaskInput = ({...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
    console.log('CreateTaskInput render')
    return (
            <label className={s.inputWrapper} htmlFor="create-task">
                <Input
                    id="create-task"
                    name="create-task"
                    placeholder="Сварить кофе"
                    {...props}
                />
                <Button
                    className={s.createTaskButton}
                    type={"submit"}
                >
                    Создать
                </Button>
            </label>
    );
};

export default CreateTaskInput;
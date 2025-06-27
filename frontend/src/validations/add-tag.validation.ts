import {z} from "zod";


export const addTagSchema = z.object({
    title: z.string()
        .min(1, 'название не может быть пустым')
        .max(10, 'название не может быть длиннее 10 символов'),
    color: z
        .array(z
            .number({message: 'ошибка выбора цвета'})
            , {message: 'укажите цвет'}
        )
        .max(1,'цвет должен быть один')
})

export type AddTagFormData = z.infer<typeof addTagSchema>
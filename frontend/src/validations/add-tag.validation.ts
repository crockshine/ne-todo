import {z} from "zod";
import {ITag} from "@/types/checkbox.interface";

export const addTagSchema = (tags: ITag[]) =>
    z.object({
        title: z.string()
            .trim()
            .min(1, 'название не может быть пустым')
            .max(10, 'название не может быть длиннее 10 символов'),
        color: z.string({message: 'укажите цвет'})

    }).superRefine((data, ctx) => {
        if (!tags) return;

        if (tags.some(tag => tag.value?.trim().toLowerCase() === data.title.trim().toLowerCase())) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'такой тег уже есть',
                path: ['title']
            });
        }
    });

export type AddTagFormData = z.infer<ReturnType<typeof addTagSchema>>
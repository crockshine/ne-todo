import { z } from 'zod';
import { times } from "@/mocks/time";
import {validateDateTime} from "@/validations/date-validation";

const todayStart = new Date();
todayStart.setHours(0, 0, 0, 0);

export const taskSchema = z.object({
    title: z.string().min(1, 'Название не может быть пустым'),
    tagsId: z.array(z.number()).optional(),
    day: z.date()
        .min(todayStart, 'Дата не может быть меньше сегодняшней')
        .optional(),
    time: z.string()
        .refine(val => times.some(time => time === val), 'Неверный формат времени')
        .optional()
}).superRefine((data, ctx) => {
    const { isValid, error } = validateDateTime(data.day, data.time);
    if (!isValid) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: error,
            path: ['time']
        });
    }
});

export type TaskFormData = z.infer<typeof taskSchema>;
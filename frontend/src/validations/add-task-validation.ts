import { z } from 'zod';

export const taskSchema = z.object({
    title: z.string().min(3, 'Название должно содержать минимум 3 символа'),
    tags: z.array(z.number()).optional(),
    date: z.date().min(new Date(), 'Дата не может быть меньше сегодняшней').optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
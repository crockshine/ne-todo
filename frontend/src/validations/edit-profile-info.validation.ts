import {z} from "zod";

export const editProfileInfoSchema = z.object({
    name: z.string().min(1, 'укажите имя'),
    email: z.string().email('укажите почту').min(1, 'укажите почту'),
    password: z.string().min(6, 'минимум 6 символов'),
})

export type EditProfileInfo = z.infer<typeof editProfileInfoSchema>
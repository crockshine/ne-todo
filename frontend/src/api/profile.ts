import {ITag} from "@/types/checkbox.interface";
import axios from "@/lib/axios";
import toast from 'react-hot-toast'
import {AxiosError} from "axios";
export interface IUserRequest {
    name: string;
    email: string;
    password: string;
}

export interface IUserResponse extends IUserRequest {
    id: string;
    tags?: ITag[];
    // tasks? : any[]
}

// аксес токен - интерсептором попадает в localStorage
export const createUser = async (user: IUserRequest) => {
    try {
        await axios.post("/auth/register", user);

    } catch (e: unknown) {
        console.log(e);

        if (e instanceof AxiosError) {
            if (e.status === 409){
                toast.error('Такой пользователь уже есть', {
                    icon: '😢',

                });
            }
        }

        // TODO зделать тосты
    }
}
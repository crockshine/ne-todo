import axios from "@/lib/axios"
import {AxiosError} from "axios";
import {ITag} from "@/types/checkbox.interface";

// получить все теги
export const getAllTags = async (): Promise<ITag[] | null> => {
    try {
        const {data} = await axios.get<ITag[]>("/tags")
        return data
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data?.message);
        }
        return null
    }
}

// создать тег
export const createTag = async (tag: ITag): Promise<ITag | null>  => {
    try {
        const result = await new Promise<ITag>((resolve, reject) => {
            setTimeout(() => {
                const t = Math.random();
                if (t < 0.5) {
                    resolve({ ...tag, id: new Date().toString() });
                } else {
                    reject(new Error("Mocked error: failed to create tag"));
                }
            }, 1000);
        });

        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// удалить тэг
export const deleteTag = async (id: string): Promise<string | null>  => {
    try {
       // бла бла
        return new Promise((res) => {
            setTimeout(() => res(id), 1000)
        })
    } catch (error) {
        console.error(error);
        return null;
    }
}
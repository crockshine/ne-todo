import axios from "@/lib/axios"
import {AxiosError} from "axios";

export const getAllTags = async () => {
    try {
        await axios.get("/tags")
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data?.message);
        }
    }
}

export const createTag = async () => {
    try {
        await axios.post("/tags")
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data?.message);
        }
    }
}
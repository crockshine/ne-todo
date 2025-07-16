import {useContext} from "react";
import EditProfileInfoContext from "@/context/forms/RegisterContext";

export const useEditProfile = () => {
    const createTask = useContext(EditProfileInfoContext)
    if (!createTask) throw new Error("useEditProfile must be defined")
    return createTask
}
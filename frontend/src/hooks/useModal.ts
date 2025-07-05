import {useContext} from "react";
import ModalContext from "@/context/ModalContext";

export const useModal = () => {
    const modalContext = useContext(ModalContext)
    if (!modalContext) throw new Error("useModal must be defined")
    return modalContext
}
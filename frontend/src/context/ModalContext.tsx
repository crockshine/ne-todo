"use client";
import React, {createContext, ReactNode, useState} from 'react';

export type ModalsList =
    "none"
    | "addTag"
    | "register"

interface IModalContext {
    currentModal: ModalsList;
    switchModal: (modal: ModalsList) => void;
    closeAll: () => void;
    isOpen: (modal: ModalsList) => boolean;
    onClose: (opened: boolean) => void;
}

const ModalsContext = createContext<IModalContext | undefined>(undefined);

interface ModalsProviderProps {
    children: ReactNode;
}

export const ModalsProvider = ({children}: ModalsProviderProps) => {
    const [currentModal, setModal] = useState<ModalsList>("none");

    const switchModal = (modal: ModalsList) => {
        setModal(modal);
    }

    const closeAll = () => {
        setModal("none");
    }

    const isOpen = (modal: ModalsList) => {
        return currentModal === modal;
    }

    const onClose = (opened: boolean) => {
        if (!opened) setModal("none");
    }

    return (
        <ModalsContext value={{onClose, isOpen, currentModal, switchModal, closeAll}}>
            {children}
        </ModalsContext>
    );
};

export default ModalsContext;
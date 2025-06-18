"use client";
import React, {createContext, ReactNode, useState} from 'react';

export type ModalsList =
    "none"
    | "addTag"

interface ModalsProviderType {
    currentModal: ModalsList;
    switchModal: (modal: ModalsList) => void;
    closeAll: () => void;
    isOpen: (modal: ModalsList) => boolean;
    onClose: (opened: boolean) => void;
}

const ModalsContext = createContext<ModalsProviderType | undefined>(undefined);

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
        <ModalsContext.Provider value={{onClose, isOpen, currentModal, switchModal, closeAll}}>
            {children}
        </ModalsContext.Provider>
    );
};

export default ModalsContext;
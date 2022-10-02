import React, { useState } from "react";

interface IModalContext {
    isModalOpen: boolean,
    modalContent: JSX.Element | null,
    modalStyle?: string,
    closeModal: () => void,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setModalContent: React.Dispatch<React.SetStateAction<JSX.Element | null>>,
    setModalStyle?: React.Dispatch<React.SetStateAction<string>>
}

const ModalContext = React.createContext<IModalContext | undefined>(undefined);

export const useModal = () => {
    const context = React.useContext(ModalContext);

    if (context === undefined) {
        throw new Error('Call "useModal" only inside ModalContextProvider');
    }

    return context;
}

export const ModalContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

    const defaultStyle = "flex w-screen h-screen fixed justify-center items-center backdrop-blur-[2px]"
    const [modalStyle, setModalStyle] = useState<string>(defaultStyle);

    const onClose = () => {
        setIsModalOpen(false);
        setModalContent(null);
    }

    return (
        <ModalContext.Provider value={{
            modalStyle: modalStyle,
            isModalOpen: isModalOpen,
            modalContent: modalContent,
            closeModal: onClose,
            setModalStyle: setModalStyle,
            setIsModalOpen: setIsModalOpen,
            setModalContent: setModalContent,
        }}>
            <div className={modalStyle + " z-50"} onClick={onClose}
                style={{
                    display:
                        isModalOpen ? "flex" : "none"
                }}>
                <div onClick={e => e.stopPropagation()}>
                    {modalContent}
                </div>
            </div>
            {children}
        </ModalContext.Provider>
    );
}

import React from "react";
import { FaTimes } from "react-icons/fa";
import { useModal } from "../../hooks";
import Button from "../Button";

type InfoModalProps = {
    status: "success" | "error" | "warning" | "info",
    title: string,
    description: string,
};

const InfoModal: React.FC<InfoModalProps> = ({ status, title, description }) => {
    const { closeModal } = useModal();
    const color = status === "success" ? "green" : status === "error" ? "red" : status === "warning" ? "orange" : "blue";

    return (
        <div className="w-[25rem] rounded-md border p-4 text-black bg-light-secondary dark:text-white dark:bg-dark-secondary" style={{
            borderColor: color,
        }}>
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">{title}</h1>
                <Button onClick={closeModal}><FaTimes /></Button>
            </div>
            <p className="mt-2">{description}</p>
        </div>
    )
}

export default InfoModal;

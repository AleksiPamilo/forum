import React from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../../Button";
import { useModal } from "../../../hooks";
import Functions from "../../../functions";
import VerificationSent from "./VerificationSent";

const VerifyEmail: React.FC = () => {
    const { setModalContent, closeModal } = useModal();

    const handleVerification = () => {
        Functions.firebase.sendEmailVerification();
        setModalContent(<VerificationSent />)
    }

    return (
        <div className="bg-zinc-900 w-[23rem] md:w-[30rem] p-4 rounded-md border-2 text-white border-blue-900 shadow-xl">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-extrabold">Verify Email</h1>
                    <Button colors={{ background: "bg-blue-700 hover:bg-blue-800" }} onClick={() => closeModal()}>
                        <FaTimes className="w-5 h-5" />
                    </Button>
                </div>
                <div className="flex flex-col gap-2 my-4">
                    <p>Hello! To send messages in this app, you will have to confirm your email address!</p>
                    <p>Click the button below to get email verification!</p>
                </div>
                <Button styles="w-full px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 text-white" onClick={handleVerification}>
                    Verify my Email!
                </Button>
            </div>
        </div>
    )
}

export default VerifyEmail;

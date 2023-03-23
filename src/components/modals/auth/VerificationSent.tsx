import React from "react";
import Functions from "../../../functions";
import Button from "../../Button";
import { useModal } from "../../../hooks";

const VerificationSent: React.FC = () => {
    const { closeModal } = useModal();

    return (
        <div className="flex flex-col bg-zinc-900 w-[23rem] md:w-[30rem] p-4 rounded-md border-2 text-white text-center gap-4 border-blue-900 shadow-xl">
            <h1 className="text-2xl font-bold">Verify your email</h1>
            <p>Please check your email and click the link to verify your email address.</p>
            <p>(This could take a few minutes)</p>
            <span className="flex flex-col gap-2">
                <p>If you did not receive an email, please check your spam folder.</p>
                <p>If you still did not receive an email, please click the button below to resend the verification email.</p>
            </span>

            <span className="flex flex-row justify-center gap-2">
                <Button onClick={Functions.firebase.sendEmailVerification}>Resend Verification</Button>
                <Button onClick={closeModal}>Close</Button>
            </span>
        </div>
    )
}

export default VerificationSent;

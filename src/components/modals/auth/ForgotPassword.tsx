import React from "react";
import FirebaseFunctions from "../../../functions";
import { FaTimes } from "react-icons/fa";
import Button from "../../Button";
import Input from "../../Input";
import { useModal } from "../../../hooks";

const ForgotPassword: React.FC = () => {
    const { closeModal } = useModal();
    const [email, setEmail] = React.useState<string>("");
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

    const handleForgotPassword = async () => {
        setErrorMessage(null);
        setSuccessMessage(null);

        if (email === "") {
            setSuccessMessage(null);
            setErrorMessage("Please fill in your email address");
            return;
        }

        const x = await FirebaseFunctions.auth.requestPasswordReset(email);
        switch (x.success) {
            case true:
                setEmail("");
                setErrorMessage(null);
                setSuccessMessage(x.message);
                break;
            case false:
                setSuccessMessage(null);
                setErrorMessage(x.message);
                break;
        }
    }

    return (
        <div className="bg-[#333333] w-[23rem] md:w-[30rem] p-4 rounded-md border text-white border-white shadow-xl">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-extrabold">Reset Password</h1>
                    <Button onClick={() => closeModal()}>
                        <FaTimes className="w-5 h-5" />
                    </Button>
                </div>
                <Input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(String(e.target.value))} />
                <Button styles="w-full px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white" onClick={handleForgotPassword}>Request a new Password</Button>
            </div>
            <div className="justify-center mt-2 w-full px-4 py-2 rounded-md bg-red-500 text-white" style={{ display: !!errorMessage ? "flex" : "none" }}>
                {errorMessage}
            </div>
            <div className="justify-center mt-2 w-full px-4 py-2 rounded-md bg-green-500 text-white" style={{ display: !!successMessage ? "flex" : "none" }}>
                {successMessage}
            </div>
        </div>
    )
}

export default ForgotPassword;

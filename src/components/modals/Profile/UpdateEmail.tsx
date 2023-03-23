import { User } from "firebase/auth";
import React from "react";
import { FaTimes } from "react-icons/fa";
import Functions from "../../../functions";
import Button from "../../Button";
import { useModal } from "../../../hooks";
import Input from "../../Input";

type UpdateEmailProps = {
    user: User | null,
};

const UpdateEmail: React.FC<UpdateEmailProps> = ({ user }) => {
    const { closeModal } = useModal();
    const [email, setEmail] = React.useState<string>("");
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    return (
        <div className="w-[30rem] flex flex-col bg-zinc-900 p-4 border-2 border-blue-600 shadow-glow-7 rounded-md">
            <div className="flex flex-row justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Update Email</h1>
                <Button onClick={closeModal}>
                    <FaTimes className="w-5 h-5" />
                </Button>
            </div>
            <div className="flex flex-row gap-4 justify-between">
                <Input type="email" placeholder={user?.email! ?? "Your new email address"} value={email} onChange={(e) => setEmail(String(e.target.value))} />
                <Button colors={{ background: "bg-green-600 hover:bg-green-700" }} onClick={() => {
                    Functions.firebase.updateEmail(email)
                        .then(((r) => {
                            if (r.success) {
                                setError(null);
                                setSuccess(r.message);
                            } else {
                                setSuccess(null);
                                setError(r.message);
                            }
                        })
                        );
                }}>Save</Button>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>
    )
}

export default UpdateEmail;

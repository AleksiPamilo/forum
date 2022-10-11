import { User } from "firebase/auth";
import React from "react";
import { FaTimes } from "react-icons/fa";
import Functions from "../../../functions";
import Button from "../../Button";
import { useModal } from "../../context/ModalContext";
import Input from "../../Input";

type UpdateUsernameProps = {
    user: User | null,
};

const UpdateUsername: React.FC<UpdateUsernameProps> = ({ user }) => {
    const { closeModal } = useModal();
    const [username, setUsername] = React.useState<string>("");
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    return (
        <div className="w-[30rem] flex flex-col bg-zinc-600 p-4 rounded-md shadow-xl">
            <div className="flex flex-row justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Update Username</h1>
                <Button onClick={closeModal}>
                    <FaTimes className="w-5 h-5" />
                </Button>
            </div>
            <div className="flex flex-row gap-4 justify-between">
                <Input type="text" placeholder={user?.displayName! ?? "Your new username"} value={username} onChange={(e) => setUsername(String(e.target.value))} />
                <Button colors={{ background: "bg-green-600 hover:bg-green-700" }} onClick={() => {
                    if (!user?.emailVerified) {
                        setSuccess(null);
                        setError("Please verify your email before updating your username.");
                        return;
                    }
                    Functions.firebase.updateProfile({ username: username })
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

export default UpdateUsername;

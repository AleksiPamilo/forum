import React from "react";
import DOMPurify from "dompurify";
import Functions from "../../functions";
import { IProfileMessage } from "../../interfaces/Message";
import { FiMoreHorizontal } from "react-icons/fi";
import Dropdown from "../Dropdown";
import { useAuth } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";
import Button from "../Button";
import { IUser } from "../../interfaces/User";

type ProfileMessageProps = {
    message: IProfileMessage,
    profileOwner: IUser,
    setMessages: React.Dispatch<React.SetStateAction<IProfileMessage[]>>,
};

const ProfilePost: React.FC<ProfileMessageProps> = ({ message, profileOwner, setMessages }) => {
    const { user } = useAuth();
    const { setModalContent, setIsModalOpen } = useModal();

    return (
        <div className="flex relative bg-zinc-600 rounded-md shadow-xl border border-white">
            <div className="absolute right-0 top-0 p-2" hidden={message.createdBy.uid !== user?.uid}>
                <Dropdown
                    label={
                        <FiMoreHorizontal className="w-5 h-5" />
                    }
                    options={[
                        {
                            label: "Delete Message",
                            onClick: () => {
                                Functions.firebase.deleteProfileMessage(message, profileOwner.uid)
                                    .then((r) => {
                                        setModalContent(
                                            <div className="bg-zinc-600 flex flex-col w-[25rem] rounded-md border border-white p-4 text-white">
                                                <div className="flex flex-row justify-between">
                                                    <h1 className="text-2xl font-bold">{r.success ? "Success!" : "Error!"}</h1>
                                                    <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                                                </div>
                                                <p className="mt-12 text-xl font-bold">{r.message}</p>
                                            </div>
                                        );
                                        setIsModalOpen(true);

                                        if (r.success) {
                                            setMessages((prev) => prev.filter((m) => m.id !== message.id));
                                        }
                                    })
                            },
                        },
                    ]}
                    btnStyles="rounded-full py-2 px-2 bg-zinc-500 hover:bg-zinc-700"
                />
            </div>
            <img className="w-28 h-28 border border-white rounded-full m-4" alt="" src={message.createdBy.photoUrl} />
            <div className="mt-2">
                <div className="flex flex-row">
                    <h1 className="font-bold text-blue-500 hover:cursor-pointer hover:underline">{message.createdBy.username}</h1>
                    <span className="mx-4">—</span>
                    <h1 className="text-gray-400">{Functions.timeElapsed(message.createdAt)}</h1>
                </div>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.content) }} />
            </div>
        </div>
    )
}

export default ProfilePost;

import React from "react";
import DOMPurify from "dompurify";
import Functions from "../../functions";
import { IProfileMessage } from "../../interfaces/Message";
import { IUser } from "../../interfaces/User";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown";
import { BsThreeDots } from "react-icons/bs";
import { useAuth, useModal } from "../../hooks";
import InfoModal from "../modals/InfoModal";

type ProfileMessageProps = {
    message: IProfileMessage,
    profileOwner: IUser,
    setMessages: React.Dispatch<React.SetStateAction<IProfileMessage[]>>,
};

const ProfilePost: React.FC<ProfileMessageProps> = ({ message, profileOwner, setMessages }) => {
    const { user } = useAuth();
    const { setModalContent, setIsModalOpen } = useModal();

    return (
        <div className="flex relative bg-zinc-400 dark:bg-zinc-800 rounded-md border border-zinc-500 dark:border-zinc-700">
            <div className="absolute right-0 top-0 p-2" hidden={message.createdBy.uid !== user?.uid}>
                <Dropdown label={<BsThreeDots />}
                    colors="text-gray-700 dark:text-white bg-zinc-300 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-dark-primary"
                    options={[
                        {
                            label: "Delete",
                            value: "delete",
                            onClick: () => {
                                Functions.firebase.deleteProfileMessage(message, profileOwner.uid)
                                    .then((res) => {
                                        if (res.success) {
                                            setMessages((prev) => prev.filter((m) => m.id !== message.id));
                                            setModalContent(<InfoModal status="success" title="Success" description="Reply deleted successfully" />);
                                        } else {
                                            setModalContent(<InfoModal status="error" title="Error" description="Reply deletion failed, please try again later." />);
                                        }
                                    })
                                setIsModalOpen(true);
                            }
                        }
                    ]} />
            </div>
            <img className="w-28 h-28 border border-white rounded-full m-4" alt="" src={message.createdBy.photoUrl} />
            <div className="mt-2">
                <div className="flex flex-row">
                    <Link to={`/profile/${message.createdBy.username}`} className="font-bold text-blue-500 hover:cursor-pointer hover:underline">{message.createdBy.username}</Link>
                    <span className="mx-4">—</span>
                    <h1 className="text-gray-600 dark:text-gray-400">{Functions.timeAgo(message.createdAt)}</h1>
                </div>
                <div className="editorstyles" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.content) }} />
            </div>
        </div>
    )
}

export default ProfilePost;

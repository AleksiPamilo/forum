import React from "react";
import DOMPurify from "dompurify";
import Functions from "../../functions";
import { IProfileMessage } from "../../interfaces/Message";
import { IUser } from "../../interfaces/User";
import { Link } from "react-router-dom";

type ProfileMessageProps = {
    message: IProfileMessage,
    profileOwner: IUser,
    setMessages: React.Dispatch<React.SetStateAction<IProfileMessage[]>>,
};

const ProfilePost: React.FC<ProfileMessageProps> = ({ message }) => {
    return (
        <div className="flex relative bg-zinc-400 dark:bg-zinc-800 rounded-md border border-zinc-500 dark:border-zinc-700">
            {/*TODO: Dropdown for deleting messages*/}
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

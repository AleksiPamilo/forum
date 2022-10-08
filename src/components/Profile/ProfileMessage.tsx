import React from "react";
import Functions from "../../functions";
import { IProfileMessage } from "../../interfaces/Message";

type ProfileMessageProps = {
    message: IProfileMessage,
};

const ProfilePost: React.FC<ProfileMessageProps> = ({ message }) => {
    return (
        <div className="flex bg-zinc-600 rounded-md shadow-xl border border-white">
            <img className="w-28 h-28 border border-white rounded-full m-4" alt="" src={message.createdBy.photoUrl} />
            <div className="mt-2">
                <div className="flex flex-row">
                    <h1 className="font-bold text-blue-500 hover:cursor-pointer hover:underline">{message.createdBy.username}</h1>
                    <span className="mx-4">—</span>
                    <h1 className="text-gray-400">{Functions.timeElapsed(message.createdAt)}</h1>
                </div>
                <p className="mt-2 max-w-[68rem] break-words pb-4">{message.content}</p>
            </div>
        </div>
    )
}

export default ProfilePost;

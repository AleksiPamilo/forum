import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Functions from "../functions";
import { Link } from "react-router-dom";
import { IUser } from "../interfaces/User";
import { Message, Thread } from "../mst";
import Dropdown from "./Dropdown";
import { useAuth } from "../hooks";
import { FiMoreHorizontal } from "react-icons/fi";

type ThreadPostProps = {
    thread: Thread | Message;
};

const ThreadPost: React.FC<ThreadPostProps> = ({ thread }) => {
    const { user: currentUser } = useAuth();
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        Functions.firebase.getUserByUID(thread.createdBy)
            .then((data) => {
                setUser(data.user);
            });
    }, [thread.createdBy]);

    const dropdownOptions = [
        {
            label: "Delete Message",
            onClick: () => {
                // TODO: Delete Thread Message
            },
        },
    ];

    return (
        <div className="flex relative w-full rounded-md p-4 bg-zinc-600">
            <div className="absolute right-0 top-0 p-2" hidden={thread.createdBy !== currentUser?.uid}>
                <Dropdown
                    label={
                        <FiMoreHorizontal className="w-5 h-5" />
                    }
                    options={dropdownOptions}
                    btnStyles="rounded-full py-2 px-2 bg-zinc-500 hover:bg-zinc-700"
                />
            </div>
            <img className="w-28 h-28 border border-white rounded-full m-4" alt="" src={user?.photoUrl} />
            <div className="mt-2">
                <div className="flex flex-row">
                    <Link to={`/profiles/${user?.username}`} className="font-bold text-blue-500 hover:cursor-pointer hover:underline">{user?.username ?? "Unknown User"}</Link>
                    <span className="mx-4">—</span>
                    <h1 className="text-gray-400">{Functions.timeAgo(thread.createdAt)}</h1>
                </div>
                <div className="max-w-[70rem] overflow-hidden break-words" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(thread.content) }} />
            </div>
        </div>
    )
}

export default ThreadPost;

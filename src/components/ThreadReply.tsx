import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Functions from "../functions";
import { Link } from "react-router-dom";
import { IUser } from "../interfaces/User";
import { Reply } from "../mst";

type ThreadReplyProps = {
    reply: Reply;
};

const ThreadReply: React.FC<ThreadReplyProps> = ({ reply }) => {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        Functions.firebase.getUserByUID(reply.createdBy)
            .then((data) => {
                setUser(data.user);
            });
    }, [reply.createdBy]);

    return (
        <div className="flex w-full relative rounded-md p-4 bg-zinc-300 dark:bg-zinc-900 group">
            {/* TODO: Dropdown for deleting replies */}
            <img className="w-28 h-28 border border-white rounded-full m-4" alt="" src={user?.photoUrl} />
            <div className="mt-2">
                <div className="flex flex-row">
                    <Link to={`/profile/${user?.username}`} className="font-bold text-blue-500 hover:cursor-pointer hover:underline">{user?.username ?? "Unknown User"}</Link>
                    <span className="mx-4">—</span>
                    <h1 className="text-gray-400">{Functions.timeAgo(reply.createdAt)}</h1>
                </div>
                <div className="max-w-[70rem] overflow-hidden break-words editorstyles" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(reply.content) }} />
            </div>
        </div>
    )
}

export default ThreadReply;

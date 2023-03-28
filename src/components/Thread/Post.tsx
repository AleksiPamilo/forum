import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Functions from "../../functions";
import { Link } from "react-router-dom";
import { IUser } from "../../interfaces/User";
import { Thread } from "../../mst";
import { useAuth } from "../../hooks";

type ThreadPostProps = {
    thread: Thread;
};

const ThreadPost: React.FC<ThreadPostProps> = ({ thread }) => {
    const { user } = useAuth();
    const [creator, setCreator] = useState<IUser | null>(null);

    useEffect(() => {
        Functions.firebase.getUserByUID(thread.createdBy)
            .then((data) => {
                setCreator(data.user);
            });
    }, [thread.createdBy]);

    return (
        <div className="flex w-full relative rounded-md p-4 bg-zinc-300 dark:bg-zinc-900">
            <div className="absolute right-0 top-0 p-2" hidden={thread.createdBy !== user?.uid}>
                {/** TODO: Controls to delete thread post */}
            </div>
            <img className="w-28 h-28 border border-white rounded-full m-4" alt="" src={creator?.photoUrl} />
            <div className="mt-2">
                <div className="flex flex-row">
                    <Link to={`/profile/${creator?.username}`} className="font-bold text-blue-500 hover:cursor-pointer hover:underline">{creator?.username ?? "Unknown User"}</Link>
                    <span className="mx-4">—</span>
                    <h1 className="text-gray-400">{Functions.timeAgo(thread.createdAt)}</h1>
                </div>
                <div className="max-w-[70rem] overflow-hidden break-words editorstyles" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(thread.content) }} />
            </div>
        </div>
    )
}

export default ThreadPost;

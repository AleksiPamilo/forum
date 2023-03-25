import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Thread } from "../mst";
import Functions from "../functions";
import { IUser } from "../interfaces/User";
import DOMPurify from "dompurify";

type ThreadCardProps = {
    thread: Thread,
}

const ThreadCard: React.FC<ThreadCardProps> = ({ thread }) => {
    const navigate = useNavigate();
    const [latestReply, setLatestReply] = React.useState<IUser | null>(null);
    const replies = thread.replies;
    const latestMessage = replies?.[replies.length - 1];

    React.useEffect(() => {
        if (latestMessage) {
            Functions.firebase.getUserByUID(latestMessage.createdBy)
                .then((data) => {
                    setLatestReply(data.user);
                }
                );
        }
    }, [thread.createdBy, latestMessage]);

    return (
        <button onClick={() => navigate(`/threads/${thread.title.replace(/\s/g, "-")}.${thread.id}`)} key={thread.id} className="flex flex-col max-sm:w-full text-left md:min-w-[35rem] bg-zinc-300 hover:bg-light-secondary dark:bg-zinc-900 hover:dark:bg-dark-secondary p-4 gap-4 border border-zinc-400 dark:border-zinc-800 rounded-md">
            <h1 className="text-2xl">{thread.title}</h1>
            <div className="flex items-center gap-4">
                <img src={latestReply?.photoUrl ?? undefined} alt="" className="w-10 h-10 bg-gray-600 border border-white rounded-full" />
                <div className="text-left">
                    <Link to={latestReply?.username ? `/profile/${latestReply.username}` : ""} onClick={e => e.stopPropagation()} className="hover:underline">
                        {latestReply?.username ?? "Username not found"}
                    </Link>
                    <p className="text-gray-400">{Functions.timeAgo(latestMessage?.updatedAt ?? latestMessage?.createdAt ?? thread.createdAt)}</p>
                </div>
            </div>
            <div className="max-w-[70rem] break-words max-h-[3rem] overflow-hidden" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(thread.content) }} />
            <div className="" onClick={e => e.stopPropagation()}>
                <Link hidden={thread.locked} to={`/threads/${thread.title.replace(/\s/g, "-")}.${thread.id}#reply`} className="bg-blue-600 p-2 rounded-md">Reply to this thread</Link>
            </div>
        </button>
    )
}

export default ThreadCard;

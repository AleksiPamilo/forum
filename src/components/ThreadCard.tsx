import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Thread } from "../mst";
import { useStores } from "../hooks";
import Functions from "../functions";
import { IUser } from "../interfaces/User";

type ThreadCardProps = {
    thread: Thread,
}

const ThreadCard: React.FC<ThreadCardProps> = ({ thread }) => {
    const navigate = useNavigate();
    const { getMessagesByThreadId } = useStores();
    const [threadCreator, setThreadCreator] = React.useState<IUser | null>(null);
    const messages = getMessagesByThreadId(thread.id);
    const messageCount = messages?.length ?? 0;
    const latestMessage = messages[messages.length - 1];

    getMessagesByThreadId(thread.id);
    React.useEffect(() => {
        Functions.firebase.getUserByUID(thread.createdBy)
            .then((data) => {
                setThreadCreator(data.user);
            });
    }, [thread.createdBy]);

    return (
        <button onClick={() => navigate(`/thread/${thread.title.replace(/\s/g, "-")}.${thread.id}`)} key={thread.id} className="flex bg-black py-1 px-3 gap-2 border-2 border-blue-600 hover:shadow-glow-10 hover:cursor-pointer rounded-md" >
            <div className="grid grid-cols-12 w-full items-center">
                <div className="col-start-1 col-end-3 text-left">
                    <h2 className="font-bold">{thread.title}</h2>
                </div>
                <div className="col-start-3 col-end-8 text-left">
                    {
                        thread ? (
                            <div className="flex flex-row text-center gap-2">
                                <img src={threadCreator?.photoUrl ?? undefined} alt="" className="w-10 h-10 bg-gray-600 border border-white rounded-full" />
                                <div className="text-sm text-left text-gray-600 max-w-[10rem]">
                                    <p className="overflow-hidden text-ellipsis">Latest Reply</p>
                                    <div className="flex flex-row gap-1 items-center">
                                        <p className="text-xs text-gray-600">{Functions.timeAgo(latestMessage?.updatedAt ?? latestMessage?.createdAt ?? thread.createdAt)} •</p>
                                        <Link to={`/profiles/${threadCreator?.username}`} className="overflow-hidden text-ellipsis hover:underline hover:text-gray-400">{threadCreator?.username}</Link>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
                <div className="col-start-12 self-end">
                    <div className="mr-12">
                        <p className="text-sm text-gray-600">Threads:</p>
                        <p>{messageCount}</p>
                    </div>
                </div>
            </div>
        </button>
    )
}

export default ThreadCard;

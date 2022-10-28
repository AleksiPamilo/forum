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
        <button onClick={() => navigate(`/thread/${thread.title.replace(/\s/g, "-")}.${thread.id}`)} key={thread.id} className="flex bg-zinc-900 py-1 px-3 gap-2 border-2 border-blue-600 hover:shadow-glow-10 hover:bg-[#101010] hover:cursor-pointer rounded-md" >
            <div className="flex items-center">
                {/** Icon */}
            </div>
            <div className="flex w-full justify-between">
                <div className="flex items-center float-left">
                    <h2 className="text-2xl font-bold">{thread.title}</h2>
                </div>
                <div className="float-right mr-10">
                    <div className="flex flex-row items-center gap-6">
                        <div className="flex flex-col text-center">
                            <p className="text-sm text-gray-600">Messages:</p>
                            <p>{messageCount}</p>
                        </div>
                        {
                            thread ? (
                                <div className="flex flex-row text-center gap-2">
                                    <img src={threadCreator?.photoUrl ?? undefined} alt="" className="w-10 h-10 border border-white rounded-full" />
                                    <div className="text-sm text-gray-600 max-w-[10rem]">
                                        <div className="flex flex-col w-full">
                                            <p className="text-left overflow-hidden text-ellipsis">{Functions.timeAgo(latestMessage?.updatedAt ?? latestMessage?.createdAt ?? thread.createdAt)}</p>
                                            <Link to={`/profiles/${threadCreator?.username}`} className="text-right overflow-hidden text-ellipsis hover:underline hover:text-gray-400">{threadCreator?.username}</Link>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </button>
    )
}

export default ThreadCard;

import React from "react";
import { Link } from "react-router-dom";
import { Forum } from "../mst";
import { useStores } from "../hooks";
import Functions from "../functions";

type ForumCardProps = {
    forum: Forum;
}

const ForumCard: React.FC<ForumCardProps> = ({ forum }) => {
    const { getThreadCount, getLatestThread } = useStores();
    const [latestThreadCreator, setLatestThreadCreator] = React.useState<{ username: string | null, photoUrl: string | null }>({ username: "", photoUrl: "" });
    const latestThread = getLatestThread(forum.id);
    const postedAgo = Functions.timeElapsed(latestThread?.createdAt || 0);

    React.useEffect(() => {
        if (latestThread) {
            Functions.firebase.getUserByUID(latestThread.createdBy).then((data) => {
                setLatestThreadCreator({ username: data.user?.username ?? null, photoUrl: data.user?.photoUrl ?? null });
            });
        }
    }, [latestThread]);

    return (
        <div key={forum.id} className="flex bg-zinc-400 py-1 px-3 gap-2 hover:bg-zinc-500">
            <div className="flex items-center">
                {/** Icon */}
            </div>
            <div className="flex w-full justify-between">
                <div className="flex items-center float-left">
                    <h2 className="text-2xl font-bold">{forum.name}</h2>
                </div>
                <div className="float-right mr-10">
                    <div className="flex flex-row items-center gap-6">
                        <div className="flex flex-col text-center">
                            <p className="text-sm text-gray-600">Threads:</p>
                            <p>{getThreadCount(forum.id)}</p>
                        </div>
                        {
                            latestThread ? (
                                <div className="flex flex-row text-center gap-2">
                                    <img src={latestThreadCreator?.photoUrl ?? undefined} alt="" className="w-10 h-10 border border-white rounded-full" />
                                    <div className="text-sm text-left text-gray-600 max-w-[10rem]">
                                        <p className="overflow-hidden text-ellipsis">{latestThread.title}</p>
                                        <div className="flex flex-row gap-1 items-center">
                                            <p className="text-xs text-gray-600">{postedAgo} •</p>
                                            <Link to={`/profile/${latestThreadCreator.username}`} className="overflow-hidden text-ellipsis hover:underline hover:text-gray-400">{latestThreadCreator.username}</Link>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ForumCard;

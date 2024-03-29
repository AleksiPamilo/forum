import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Forum } from "../mst";
import { useStores } from "../hooks";
import Functions from "../functions";

type ForumCardProps = {
    forum: Forum;
}

const ForumCard: React.FC<ForumCardProps> = ({ forum }) => {
    const navigate = useNavigate();
    const { getThreadCount, getLatestThread } = useStores();
    const [latestThreadCreator, setLatestThreadCreator] = React.useState<{ username: string | null, photoUrl: string | null }>({ username: "", photoUrl: "" });
    const latestThread = getLatestThread(forum.id);
    const postedAgo = Functions.timeAgo(latestThread?.createdAt || 0);

    React.useEffect(() => {
        if (latestThread) {
            Functions.firebase.getUserByUID(latestThread.createdBy).then((data) => {
                setLatestThreadCreator({ username: data.user?.username ?? null, photoUrl: data.user?.photoUrl ?? null });
            });
        }
    }, [latestThread]);

    return (
        <button onClick={() => navigate(`/${forum.slug}/threads`)} key={forum.id} className="flex bg-zinc-100 hover:bg-light-secondary dark:bg-zinc-900 dark:hover:bg-dark-primary p-4 gap-2 hover:cursor-pointer rounded-b-md" >
            <div className="grid grid-cols-8 md:grid-cols-12 w-full items-center">
                <div className="col-start-1 col-end-3 text-left">
                    <h2 className="font-bold">{forum.name}</h2>
                </div>
                <div className="col-start-5 col-end-8 md:col-start-5 md:col-end-9 lg:col-start-4 lg:col-end-8 text-left">
                    {
                        latestThread ? (
                            <div className="flex flex-row text-center gap-2">
                                <img src={latestThreadCreator?.photoUrl ?? undefined} alt="" className="hidden md:block w-10 h-10 border bg-gray-500 border-white rounded-full" />
                                <div className="text-sm text-left text-gray-600 max-w-[10rem]">
                                    <Link to={`/threads/${latestThread.title}.${latestThread.id}`} onClick={e => e.stopPropagation()} className="overflow-hidden text-ellipsis cursor-pointer hover:underline hover:text-gray-400">{latestThread.title}</Link>
                                    <div className="flex flex-row gap-1 items-center">
                                        <p className="text-xs text-gray-600">{postedAgo} •</p>
                                        <Link to={`/profile/${latestThreadCreator.username}`} onClick={e => e.stopPropagation()} className="overflow-hidden text-ellipsis hover:underline hover:text-gray-400">{latestThreadCreator.username}</Link>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
                <div className="hidden md:block md:col-start-11 lg:col-start-12 col-end-12 self-end">
                    <div className="mr-12">
                        <p className="text-sm text-gray-600">Threads:</p>
                        <p>{getThreadCount(forum.id)}</p>
                    </div>
                </div>
            </div>
        </button>
    )
}

export default ForumCard;

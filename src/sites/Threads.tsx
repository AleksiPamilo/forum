import React from "react";
import { useParams } from "react-router-dom";
import CreateThread from "../components/CreateThread";
import ThreadCard from "../components/ThreadCard";
import { useStores } from "../hooks";

const Threads: React.FC = () => {
    const { slug } = useParams();
    const { getThreadsByForum, getForumBySlug } = useStores();
    const threads = getThreadsByForum(slug ?? null);
    const forum = getForumBySlug(slug ?? null);

    document.title = `ForumX — ${forum?.name ?? "Threads"}`;

    if (!slug || !threads) return (
        <div className="flex flex-col items-center mt-24">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-xl">Thread not found</p>
        </div>
    );

    return (
        <div className="gap-4 flex flex-col">
            <div className="my-2">
                <h1 className="text-4xl font-bold">{forum?.name}</h1>
            </div>
            <CreateThread forumId={forum?.id} />
            {
                threads.length
                    ? threads.map((thread) => (
                        <ThreadCard thread={thread} />
                    ))
                    : forum?.locked
                        ? <div className="bg-white dark:bg-black py-2 px-3 rounded-md text-center border border-blue-600 shadow-glow-5">
                            Only admins can create threads in this forum.
                        </div>
                        : <div className="bg-white dark:bg-black py-2 px-3 rounded-md text-center border border-blue-600 shadow-glow-5">
                            No threads have been created in this forum yet.
                        </div>
            }
        </div>
    )
}

export default Threads;

import React from "react";
import { useParams } from "react-router-dom";
import CreateThread from "../components/CreateThread";
import ThreadCard from "../components/Thread/Card";
import { useAuth, useStores } from "../hooks";
import NotFound from "./NotFound";

const Threads: React.FC = () => {
    const { isAdmin } = useAuth();
    const { slug } = useParams();
    const { getThreadsByForum, getForumBySlug } = useStores();
    const threads = getThreadsByForum(slug ?? null);
    const forum = getForumBySlug(slug ?? null);

    document.title = `ForumX — ${forum?.name ?? "Threads"}`;

    if (!slug || !threads) return (
        <NotFound />
    );

    return (
        <div className="gap-4 flex flex-col">
            <div className="my-2">
                <h1 className="text-2xl font-bold">{forum?.name}</h1>
            </div>
            <span hidden={!isAdmin}><CreateThread forumId={forum?.id} /></span>

            <div hidden={!forum?.locked} className="bg-white dark:bg-dark-primary py-2 px-3 rounded-md text-center border-2 border-zinc-800 shadow-glow-5">
                Only admins can create threads in this forum.
            </div>

            {
                threads.length
                    ? threads.sort((a, b) => {
                        if (a.createdAt < b.createdAt) return 1;
                        if (a.createdAt > b.createdAt) return -1;
                        return 0;
                    }).map((thread) => (
                        <ThreadCard thread={thread} />
                    ))
                    : <div className="bg-white dark:bg-dark-primary py-2 px-3 rounded-md text-center border-2 border-zinc-800 shadow-glow-5">
                        No threads have been created in this forum yet.
                    </div>
            }
        </div>
    )
}

export default Threads;

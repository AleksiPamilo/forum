import React from "react";
import { useParams } from "react-router-dom";
import ThreadCard from "../components/ThreadCard";
import { useStores } from "../hooks";

const Threads: React.FC = () => {
    const { name } = useParams();
    const { getThreadsByForum } = useStores();
    const threads = getThreadsByForum(name ?? null);

    if (!name || !threads) return (
        <div className="flex flex-col items-center mt-24">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-xl">Thread not found</p>
        </div>
    );

    return (
        <div className="mt-4 gap-4 flex flex-col">
            {
                threads.map((thread) => {
                    return <ThreadCard thread={thread} />
                })
            }
        </div>
    )
}

export default Threads;

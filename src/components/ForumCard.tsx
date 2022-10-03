import React from "react";
import { Forum } from "../mst";
import { useStores } from "../hooks";
import logo from "../assets/logo.png";

type ForumCardProps = {
    forum: Forum;
}

const ForumCard: React.FC<ForumCardProps> = ({ forum }) => {
    const { getThreadCount } = useStores();

    return (
        <div key={forum.id} className="flex bg-zinc-400 py-1 px-3 gap-2 rounded-md hover:bg-zinc-500">
            <div className="flex items-center">
                <img className="w-8 h-8 rounded-full" src={logo} alt="" />
            </div>
            <div className="flex w-full justify-between">
                <div className="float-left">
                    <h2 className="text-2xl font-bold">{forum.name}</h2>
                    133
                </div>
                <div className="float-right">
                    <h2 className="text-2xl font-bold">{getThreadCount(forum.id)}</h2>
                    123123
                </div>
            </div>
        </div>
    )
}

export default ForumCard;

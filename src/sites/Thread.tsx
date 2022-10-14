import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor from "../components/Editor";
import ThreadPost from "../components/ThreadPost";
import Functions from "../functions";
import { useStores } from "../hooks";
import { IUser } from "../interfaces/User";
import { EditorState } from "draft-js";

const Thread: React.FC = () => {
    const { title_id } = useParams();
    const { getThreadById, getMessagesByThreadId } = useStores();
    const [user, setUser] = useState<IUser | null>(null);
    const [state, setState] = useState(EditorState.createEmpty());
    const id = parseInt(title_id?.split(".")?.pop() ?? "0") ?? null;
    const thread = getThreadById(id);
    const messages = getMessagesByThreadId(id);

    useEffect(() => {
        if (thread) {
            Functions.firebase.getUserByUID(thread.createdBy)
                .then((data) => {
                    setUser(data.user);
                });
        }
    }, [thread]);

    if (!thread) return (
        <div className="flex flex-col items-center mt-24">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-xl">Thread not found</p>
        </div>
    );

    return (
        <div className="flex flex-col mt-4 rounded-md gap-4 p-4">
            <div className="font-semibold">
                <div className="flex flex-row justify-between w-full rounded-t-md bg-zinc-700 px-4 py-2">
                    <div className="flex flex-row gap-2">
                        <span>{thread.title}</span>
                        <span>•</span>
                        <span className="font-normal">{Functions.timeAgo(thread.createdAt)}</span>
                    </div>
                    <span>{user?.username}</span>
                </div>
                <div className="w-full rounded-b-md bg-zinc-600 font-normal">
                    <ThreadPost thread={thread} />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {
                    messages.map((message) => (
                        <ThreadPost thread={message} />
                    ))
                }
            </div>

            <button className="cursor-default" onClick={() => alert("Not working yet...")}>
                <Editor editorState={state} setEditorState={setState} placeholder="Write a reply..." maxLength={10000} />
            </button>
        </div>
    );
}

export default Thread;

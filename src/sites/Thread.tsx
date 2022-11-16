import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import ThreadPost from "../components/ThreadPost";
import ThreadReply from "../components/ThreadReply";
import Functions from "../functions";
import { useAuth, useStores } from "../hooks";
import { IUser } from "../interfaces/User";
import { EditorState } from "draft-js";
import { v4 as uuid } from "uuid";
import Button from "../components/Button";
import { stateToHTML } from "draft-js-export-html";

const Thread: React.FC = () => {
    const { title_id } = useParams();
    const { user: currentUser } = useAuth();
    const { getThreadById, getMessagesByThreadId } = useStores();
    const [user, setUser] = useState<IUser | null>(null);
    const [state, setState] = useState(EditorState.createEmpty());
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const maxLength = 10000;
    const id = title_id?.split(".")?.pop() ?? null;
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
            <div className="flex flex-row gap-2 items-center mb-2">
                <h1 className="text-4xl font-bold">404</h1>
                <span>—</span>
                <p className="text-xl">Thread not found</p>
            </div>
            <Link to="/" className="py-2 px-3 bg-blue-600 rounded-md hover:shadow-glow-6">Back to front page</Link>
        </div>
    );

    return (
        <div className="flex flex-col mt-4 rounded-md gap-4 p-4">
            <div className="font-semibold">
                <div className="flex flex-row justify-between w-full rounded-t-md bg-zinc-800 px-4 py-2">
                    <div className="flex flex-row gap-2">
                        <span>{thread.title}</span>
                        <span>•</span>
                        <span className="font-normal">{Functions.timeAgo(thread.createdAt)}</span>
                    </div>
                    <span>{user?.username}</span>
                </div>
                <div className="w-full rounded-b-md bg-zinc-900 font-normal">
                    <ThreadPost thread={thread} />
                </div>
            </div>

            <h1 className="" hidden={!messages.length}>Replies:</h1>
            <div className="flex flex-col gap-2">
                {
                    messages.map((message) => (
                        <ThreadReply reply={message} />
                    ))
                }
            </div>
            {
                thread?.locked
                    ? <div className="bg-black py-2 px-3 rounded-md text-center border border-blue-600 shadow-glow-5">This thread is locked from further communication by it's creator.</div>
                    : (
                        <div className="p-4 bg-zinc-900 rounded-md">
                            <Editor editorState={state} setEditorState={setState} placeholder="Write a reply..." maxLength={maxLength} />
                            <div className="flex flex-row items-center mt-2">
                                <div className="flex flex-row w-full gap-2 justify-start">
                                    <span hidden={!!!error} className="py-2 px-3 bg-zinc-800 rounded-md text-red-500">{error}</span>
                                    <span hidden={!!!success} className="py-2 px-3 bg-zinc-800 rounded-md text-green-500">{success}</span>
                                </div>
                                <div className="flex flex-row w-full gap-2 justify-end items-center">
                                    <p className="text-gray-500 py-2 px-3 bg-zinc-800 rounded-md">{state.getCurrentContent().getPlainText().length}/{maxLength} characters</p>
                                    <Button onClick={() => {
                                        if (!currentUser) return setError("You must be logged in to reply to this thread.");

                                        Functions.firebase.saveThreadReply({
                                            id: uuid(),
                                            threadId: thread.id,
                                            content: stateToHTML(state.getCurrentContent()),
                                            createdAt: new Date().getTime(),
                                            createdBy: currentUser.uid ?? "",
                                            updatedAt: null,
                                            updatedBy: null,
                                        }).then(() => {
                                            setError(null);
                                            setSuccess("Reply sent!");
                                            setState(EditorState.createEmpty());
                                            setTimeout(() => setSuccess(null), 5000);
                                        }).catch((error) => {
                                            setError(error.message);
                                            setSuccess(null);
                                        });

                                    }}>
                                        Reply
                                    </Button>

                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    );
}

export default observer(Thread);

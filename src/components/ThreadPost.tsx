import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Functions from "../functions";
import { Link } from "react-router-dom";
import { IUser } from "../interfaces/User";
import { Thread } from "../mst";
import Dropdown from "./Dropdown";
import { useAuth, useModal } from "../hooks";
import { FiMoreHorizontal } from "react-icons/fi";
import Button from "./Button";
import { FaTimes } from "react-icons/fa";

type ThreadPostProps = {
    thread: Thread;
};

const ThreadPost: React.FC<ThreadPostProps> = ({ thread }) => {
    const { user: currentUser } = useAuth();
    const { setModalContent, setIsModalOpen } = useModal();
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        Functions.firebase.getUserByUID(thread.createdBy)
            .then((data) => {
                setUser(data.user);
            });
    }, [thread.createdBy]);

    const dropdownOptions = [
        {
            label: "Delete Thread",
            onClick: () => {
                Functions.firebase.deleteThread(thread)
                    .then(() => {
                        setModalContent(<div className="w-[20rem] bg-black text-white rounded-md border border-blue-600 shadow-glow-3">
                            <div className="p-4">
                                <div className="flex flex-row justify-between items-center">
                                    <h1 className="text-xl font-bold">Thread Deleted</h1>
                                    <Button onClick={() => setIsModalOpen(false)}><FaTimes className="w-5 h-5" /></Button>
                                </div>
                                <p className="mt-2">The thread has been deleted successfully.</p>
                            </div>
                        </div>);
                        setIsModalOpen(true);
                    })
                    .catch((e) => {
                        console.log(e)
                        setModalContent(<div className="w-[25rem] bg-black text-white rounded-md border border-red-600 shadow-[0_0_5px_1px_red]">
                            <div className="p-4">
                                <div className="flex flex-row justify-between items-center">
                                    <h1 className="text-xl font-bold">Reply wasn't deleted</h1>
                                    <Button onClick={() => setIsModalOpen(false)}><FaTimes className="w-5 h-5" /></Button>
                                </div>
                                <p className="mt-2">Reply wasn't deleted for an unknown reason.</p>
                                <p>Please make sure, that you are logged in.</p>
                            </div>
                        </div>)
                        setIsModalOpen(true);
                    });
            }
        }
    ];

    return (
        <div className="flex w-full relative rounded-md p-4 bg-zinc-900">
            <div className="absolute right-0 top-0 p-2" hidden={thread.createdBy !== currentUser?.uid}>
                <Dropdown
                    label={<FiMoreHorizontal className="w-5 h-5" />}
                    options={dropdownOptions}
                    btnStyles="rounded-full py-2 px-2 bg-zinc-700 border border-zinc-900 hover:bg-zinc-800"
                />
            </div>
            <img className="w-28 h-28 border border-white rounded-full m-4" alt="" src={user?.photoUrl} />
            <div className="mt-2">
                <div className="flex flex-row">
                    <Link to={`/profiles/${user?.username}`} className="font-bold text-blue-500 hover:cursor-pointer hover:underline">{user?.username ?? "Unknown User"}</Link>
                    <span className="mx-4">—</span>
                    <h1 className="text-gray-400">{Functions.timeAgo(thread.createdAt)}</h1>
                </div>
                <div className="max-w-[70rem] overflow-hidden break-words" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(thread.content) }} />
            </div>
        </div>
    )
}

export default ThreadPost;

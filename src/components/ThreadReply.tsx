import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Functions from "../functions";
import { Link } from "react-router-dom";
import { IUser } from "../interfaces/User";
import { Reply } from "../mst";
import Dropdown from "./Dropdown";
import { useAuth, useModal } from "../hooks";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaTimes } from "react-icons/fa"
import Button from "./Button";

type ThreadReplyProps = {
    reply: Reply;
};

const ThreadReply: React.FC<ThreadReplyProps> = ({ reply }) => {
    const { user: currentUser } = useAuth();
    const { setIsModalOpen, setModalContent } = useModal();
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        Functions.firebase.getUserByUID(reply.createdBy)
            .then((data) => {
                setUser(data.user);
            });
    }, [reply.createdBy]);

    const dropdownOptions = [
        {
            label: "Delete Reply",
            onClick: () => {
                Functions.firebase.deleteThreadReply(reply)
                    .then(() => {
                        setModalContent(<div className="w-[25rem] bg-black text-white rounded-md border border-blue-600 shadow-glow-3">
                            <div className="p-4">
                                <div className="flex flex-row justify-between items-center">
                                    <h1 className="text-xl font-bold">Reply Deleted</h1>
                                    <Button onClick={() => setIsModalOpen(false)}><FaTimes className="w-5 h-5" /></Button>
                                </div>
                                <p className="mt-2">The reply has been deleted successfully.</p>
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
        <div className="flex w-full relative rounded-md p-4 bg-zinc-900 group">
            <div className="absolute right-0 top-0 p-2" hidden={reply.createdBy !== currentUser?.uid}>
                <Dropdown
                    label={
                        <FiMoreHorizontal className="w-5 h-5" />
                    }
                    options={dropdownOptions}
                    btnStyles="rounded-full py-2 px-2 bg-zinc-700 border border-zinc-900 hover:bg-zinc-800 hidden group-hover:block"
                />
            </div>
            <img className="w-28 h-28 border border-white rounded-full m-4" alt="" src={user?.photoUrl} />
            <div className="mt-2">
                <div className="flex flex-row">
                    <Link to={`/profiles/${user?.username}`} className="font-bold text-blue-500 hover:cursor-pointer hover:underline">{user?.username ?? "Unknown User"}</Link>
                    <span className="mx-4">—</span>
                    <h1 className="text-gray-400">{Functions.timeAgo(reply.createdAt)}</h1>
                </div>
                <div className="max-w-[70rem] overflow-hidden break-words editorstyles" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(reply.content) }} />
            </div>
        </div>
    )
}

export default ThreadReply;

import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Functions from "../../functions";
import { Link } from "react-router-dom";
import { IUser } from "../../interfaces/User";
import { Reply } from "../../mst";
import Dropdown from "../Dropdown";
import { BsThreeDots } from "react-icons/bs";
import { useModal } from "../../hooks";
import InfoModal from "../modals/InfoModal";

type ThreadReplyProps = {
    reply: Reply;
};

const ThreadReply: React.FC<ThreadReplyProps> = ({ reply }) => {
    const { setModalContent, setIsModalOpen } = useModal();
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        Functions.firebase.getUserByUID(reply.createdBy)
            .then((data) => {
                setUser(data.user);
            });
    }, [reply.createdBy]);

    return (
        <div className="flex w-full relative rounded-md p-4 bg-zinc-300 dark:bg-zinc-900 group">
            <div className="absolute right-0 top-0 p-2" hidden={reply.createdBy !== user?.uid}>
                <Dropdown label={<BsThreeDots />} options={[
                    {
                        label: "Delete",
                        value: "delete",
                        onClick: () => {
                            Functions.firebase.deleteThreadReply(reply)
                                .then((res) => {
                                    if (res.success) {
                                        setModalContent(<InfoModal status="success" title="Success" description="Reply deleted successfully" />);
                                    } else {
                                        setModalContent(<InfoModal status="error" title="Error" description="Reply deletion failed, please try again later." />);
                                    }
                                })
                            setIsModalOpen(true);
                        }
                    }
                ]} />
            </div>
            <img className="w-28 h-28 border border-white rounded-full m-4" alt="" src={user?.photoUrl} />
            <div className="mt-2">
                <div className="flex flex-row">
                    <Link to={`/profile/${user?.username}`} className="font-bold text-blue-500 hover:cursor-pointer hover:underline">{user?.username ?? "Unknown User"}</Link>
                    <span className="mx-4">—</span>
                    <h1 className="text-gray-400">{Functions.timeAgo(reply.createdAt)}</h1>
                </div>
                <div className="max-w-[70rem] overflow-hidden break-words editorstyles" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(reply.content) }} />
            </div>
        </div>
    )
}

export default ThreadReply;

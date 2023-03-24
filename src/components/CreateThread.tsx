import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useAuth, useModal } from "../hooks";
import Login from "./modals/auth/LoginSignup";
import VerifyEmail from "./modals/auth/VerifyEmail";
import CreateThreadModal from "./modals/CreateThreadModal";

type CreateThreadProps = {
    forumId?: string,
};

const CreateThread: React.FC<CreateThreadProps> = ({ forumId }) => {
    const { setIsModalOpen, setModalContent } = useModal();
    const { user } = useAuth();
    const [title, setTitle] = useState<string>("");
    const isActive = title !== "" && title.length > 0;

    const handleModal = () => {
        if (!isActive) return;

        if (!user) {
            setModalContent(<Login isLogin />);
            setIsModalOpen(true);
            return;
        }
        if (user && !user.emailVerified) {
            setModalContent(<VerifyEmail />);
            setIsModalOpen(true);
            return;
        }

        setModalContent(<CreateThreadModal title={title} forumId={forumId} />);
        setIsModalOpen(true);
    }

    return (
        <div className="relative flex w-full items-center">
            <input type="text" placeholder="Create a thread" className="w-full py-3 px-2 placeholder:text-zinc-500 bg-zinc-300 dark:bg-zinc-900 shadow-3xl rounded-md border-2 border-transparent focus:border-zinc-400 focus:dark:border-zinc-800 focus:outline-none" value={title} onChange={e => setTitle(String(e.target.value))} maxLength={50} />
            <button disabled={!isActive} onClick={handleModal} className={`py-2 px-3 rounded-md bg-blue-600 absolute right-3 ${isActive ? "cursor-pointer" : "cursor-not-allowed"}`} >
                <AiOutlinePlus />
            </button>
        </div>
    )
}

export default CreateThread;

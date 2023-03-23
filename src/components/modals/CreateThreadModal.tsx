import { useState } from "react";
import Editor from "../Editor";
import { EditorState } from "draft-js";
import { useAuth, useModal, useStores } from "../../hooks";
import { FaTimes } from "react-icons/fa";
import Functions from "../../functions";
import SearchableDropdown from "../SearchableDropdown";
import Button from "../Button";
import VerifyEmail from "./auth/VerifyEmail";
import { stateToHTML } from "draft-js-export-html";

type CreateThreadModalProps = {
    title: string,
    forumId?: string,
};

const CreateThreadModal: React.FC<CreateThreadModalProps> = ({ title: titleProp, forumId }) => {
    const { user, isAdmin } = useAuth();
    const { setModalContent, setIsModalOpen, closeModal } = useModal();
    const { getForumByName, getForumById, getForumNames, forums } = useStores();

    const forumById = forumId ? getForumById(forumId) : null;
    const [title, setTitle] = useState<string>(titleProp);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
    const [locked, setLocked] = useState<boolean>(false);
    const [selected, setSelected] = useState<{ label: string, value: string } | null>(forumById ? { label: forumById.name, value: forumById.slug } : null);
    const lockedForums = [...forums.filter(x => x.locked).map(y => y.name)];
    const options = [...getForumNames().map((name) => ({ label: name, value: name.toLowerCase().replace(/\s/g, "-") }))].filter(x => {
        if (isAdmin) return true;
        else return !lockedForums.includes(x.label);
    });
    const forum = getForumByName(selected?.label ?? "");

    const createThread = () => {
        setError(null);
        setSuccess(null);

        if (user && !user.emailVerified) {
            setModalContent(<VerifyEmail />);
            setIsModalOpen(true);
            return;
        }

        if (forum?.locked && !isAdmin) return setError("This forum is locked.");
        if (!user) return setError("You must be logged in to create a thread.");
        if (!title) return setError("Please enter a title.");
        if (editorState.getCurrentContent().getPlainText().length > 10000) return setError("Your thread content is too long. Please shorten it.");
        if (editorState.getCurrentContent().getPlainText().length < 10) return setError("Your thread content is too short. Please lengthen it.");
        if (!selected) return setError("Please select a forum.");
        if (!forum) return setError("Forum not found.");
        if (!isAdmin && !Functions.isValidCharacter(title)) {
            return setError("Your title contains invalid characters.");
        }

        Functions.firebase.createThread({
            id: (new Date().getTime()).toString(36),
            forumId: forum.id,
            title: title,
            content: stateToHTML(editorState?.getCurrentContent()),
            locked: locked,
            createdAt: Date.now(),
            createdBy: user?.uid ?? "",
            updatedAt: null,
            updatedBy: null,
            replies: null,
        }).then(() => {
            setSuccess("Thread created successfully!");
            setEditorState(EditorState.createEmpty());
            setTitle("");
            setSelected(null);
        })
            .catch((err) => {
                setError(err.message);
            });
    }

    return (
        <div className="w-[50rem] min-h-[23rem] max-h-[30rem] p-4 rounded-md shadow-glow-2 text-white bg-zinc-200 dark:bg-black">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Create Thread</h1>
                <Button onClick={closeModal}><FaTimes /></Button>
            </div>

            <div className="w-full flex my-2">
                <span hidden={!error} className="w-full p-2 rounded-md bg-red-600">{error}</span>
                <span hidden={!success} className="w-full p-2 rounded-md bg-green-600">{success}</span>
            </div>

            <div className="flex flex-col gap-3">
                <div>
                    <label htmlFor="title" className="">Title</label>
                    <input type="text" id="title" placeholder="Create a thread" className="w-full p-2 my-1 dark:bg-zinc-900 shadow-3xl rounded-md" value={title} />
                </div>
                <Editor editorState={editorState} setEditorState={setEditorState} placeholder="Thread Content..." maxLength={5000} />
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="flex flex-col gap-2">
                    <p>Please select the forum you would like to post to.</p>
                    <span className="flex gap-2">
                        <SearchableDropdown onChange={(option) => setSelected(option)} options={options} label="Forum" selected={selected?.label} />
                        <SearchableDropdown
                            onChange={(option) => setLocked(option.value === "true")}
                            options={[{ label: "Locked", value: "true" }, { label: "Unlocked", value: "false" }]}
                            selected={locked ? "Locked" : "Unlocked"}
                            label="Select"
                        />
                    </span>
                </div>

                <Button onClick={createThread}>
                    Create Thread
                </Button>
            </div>
        </div>
    )
}

export default CreateThreadModal;

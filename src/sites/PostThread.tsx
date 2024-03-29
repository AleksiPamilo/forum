import React, { useState } from "react";
import { EditorState } from "draft-js";
import Editor from "../components/Editor";
import Login from "../components/modals/auth/LoginSignup";
import { useAuth, useModal, useStores } from "../hooks";
import Input from "../components/Input";
import SearchableDropdown from "../components/SearchableDropdown";
import Button from "../components/Button";
import Functions from "../functions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { stateToHTML } from "draft-js-export-html";
import VerifyEmail from "../components/modals/auth/VerifyEmail";

const PostThread: React.FC = () => {
    const { isLoggedIn, user, isAdmin } = useAuth();
    const { setIsModalOpen, setModalContent } = useModal();
    const { getForumByName, getForumNames, getForumBySlug, forums } = useStores();
    const navigate = useNavigate();
    const { search } = useLocation();
    const [state, setState] = useState(EditorState.createEmpty());
    const [title, setTitle] = useState<string>("");
    const [locked, setLocked] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [selected, setSelected] = useState<{ label: string, value: string } | null>(null);
    const lockedForums = [...forums.filter(x => x.locked).map(y => y.name)];
    const options = [...getForumNames().map((name) => ({ label: name, value: name.toLowerCase().replace(/\s/g, "-") }))].filter(x => {
        if (isAdmin) return true;
        else return !lockedForums.includes(x.label);
    });
    const forum = getForumByName(selected?.label ?? "");

    React.useEffect(() => {
        const params = new URLSearchParams(search);
        if (params.get("forum")) {
            const forum = getForumBySlug(params.get("forum") ?? "");

            if (forum) {
                setSelected({ label: forum.name, value: forum.name.toLowerCase().replace(/\s/g, "-") })
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (!isLoggedIn) return (
        <div className="flex flex-col items-center mt-24">
            <h1 className="text-4xl font-bold">403</h1>
            <p className="text-xl">You must be logged in to create a thread.</p>
            <div className="flex flex-row items-center gap-2 mt-2">
                <Button onClick={() => {
                    setModalContent(<Login />);
                    setIsModalOpen(true);
                }}>
                    Login
                </Button>
                <Link to="/" className="py-2 px-3 bg-blue-600 hover:shadow-glow-6 rounded-md">Back to front page</Link>
            </div>
        </div>
    );

    const handlePost = () => {
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
        if (state.getCurrentContent().getPlainText().length > 10000) return setError("Your thread is too long. Please shorten it.");
        if (state.getCurrentContent().getPlainText().length < 10) return setError("Your thread is too short. Please lengthen it.");
        if (!selected) return setError("Please select a forum.");
        if (!forum) return setError("Forum not found.");
        if (!isAdmin && !Functions.isValidCharacter(title)) {
            return setError("Your title contains invalid characters.");
        }

        Functions.firebase.createThread({
            id: (new Date().getTime()).toString(36),
            forumId: forum.id,
            title: title,
            content: stateToHTML(state?.getCurrentContent()),
            locked: locked,
            createdAt: Date.now(),
            createdBy: user?.uid ?? "",
            updatedAt: null,
            updatedBy: null,
            replies: null,
        })
            .then((res) => {
                setSuccess("Thread created successfully!");
                setState(EditorState.createEmpty());
                setTitle("");
                setSelected(null);

                setTimeout(() => {
                    if (!res.threadLocation) return;
                    navigate(res.threadLocation);
                }, 5000);
            })
            .catch((err) => {
                setError(err.message);
            });
    }

    return (
        <div className="mt-8 flex items-center justify-center">
            <div className="w-[60rem] p-4 bg-zinc-900 border-blue-600 shadow-glow-8 rounded-md">
                <h1 className="text-xl font-semibold">Post Thread</h1>
                <div className="p-4 bg-zinc-800 rounded-md mt-4 max-h-[40rem] overflow-hidden gap-y-2 flex flex-col">
                    <Input styles="bg-zinc-800 py-2 px-3 border w-full rounded-md" placeholder="Title" onChange={(e) => setTitle(String(e.target.value))} value={title} />
                    <Editor editorState={state} setEditorState={setState} maxLength={5000} placeholder="Content.." />
                </div>
                <div className="flex flex-row justify-between items-center mt-4">
                    <div className="flex flex-col gap-y-2">
                        <p className="flex flex-col">
                            <span>Please select the forum you would like to post to.</span>
                            <span>And whether or not the thread should be locked from conversation.</span>
                        </p>
                        <div className="flex flex-row gap-2">
                            <SearchableDropdown onChange={(option) => setSelected(option)} options={options} label="Forum" selected={selected?.label} />
                            <SearchableDropdown
                                onChange={(option) => setLocked(option.value === "true")}
                                options={[{ label: "Locked", value: "true" }, { label: "Unlocked", value: "false" }]}
                                selected={locked ? "Locked" : "Unlocked"}
                                label="Select"
                            />
                        </div>
                    </div>
                    <div>
                        <Button onClick={() => handlePost()}>Post!</Button>
                    </div>
                </div>
                <div className="mt-4 flex flex-row justify-end text-right">
                    <div>
                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="flex flex-col gap-2">
                            <span className="text-green-500">{success}</span>
                            <span>You will be redirected in 5 seconds.</span>
                        </p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostThread;

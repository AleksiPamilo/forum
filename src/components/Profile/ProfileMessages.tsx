import React, { useState } from "react";
import Functions from "../../functions";
import { IUser } from "../../interfaces/User";
import Button from "../Button";
import Editor from "../Editor";
import ProfileMessage from "./ProfileMessage";
import { useAuth, useModal } from "../../hooks";
import { v4 as uuid } from "uuid";
import { stateToHTML } from "draft-js-export-html";
import { EditorState } from "draft-js";
import VerifyEmail from "../modals/auth/VerifyEmail";

type ProfileMessagesProps = {
    user: IUser
};

const ProfileMessages: React.FC<ProfileMessagesProps> = ({ user }) => {
    const { user: currentUser } = useAuth();
    const { setModalContent, setIsModalOpen } = useModal();
    const [messages, setMessages] = useState(user.messages ?? []);
    const [showEditor, setShowEditor] = useState<boolean>(false);
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSaveMessage = () => {
        if (!editorState.getCurrentContent().hasText()) {
            setError("Comment cannot be empty!");;
            return;
        }

        if (!currentUser) {
            setError("You must be logged in to comment on a profile!");
            return;
        } else {
            const message = {
                id: uuid(),
                content: stateToHTML(editorState?.getCurrentContent()),
                createdAt: new Date().getTime(),
                createdBy: {
                    username: currentUser?.displayName!,
                    photoUrl: currentUser?.photoURL!,
                    uid: currentUser?.uid!,
                },
            };

            messages.push(message);
            setMessages(messages);
            Functions.firebase.saveProfileMessage(message, user.uid);
            setEditorState(EditorState.createEmpty());
            setSuccess("Message sent!");
        }
    }

    return (
        <div className="flex flex-col p-2 w-full">
            <div className="flex flex-row justify-between">
                <h1 className="text-3xl font-bold">Posts</h1>
                <div className="flex flex-row gap-2">
                    <Button
                        colors={{ background: "bg-zinc-600 hover:bg-zinc-700", text: "text-white" }}
                        onClick={() => {
                            if (showEditor) {
                                setShowEditor(!showEditor);
                                return;
                            }

                            if (currentUser) {
                                if (!currentUser.emailVerified) {
                                    setModalContent(<VerifyEmail />);
                                    setIsModalOpen(true);
                                    return;
                                }

                                setError(null);
                                setSuccess(null);
                                setShowEditor(!showEditor);
                            } else {
                                setModalContent(
                                    <div className="flex flex-col w-[25rem] text-black dark:text-white p-4 bg-light-primary dark:bg-dark-primary rounded-md border border-blue-600 shadow-glow-5">
                                        <div className="flex justify-between">
                                            <h1 className="text-2xl font-bold">Error!</h1>
                                            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                                        </div>
                                        <p className="mt-4 text-base font-semibold">You must be logged in to comment on a profile!</p>
                                    </div>
                                )
                                setIsModalOpen(true);
                            }
                        }}
                    >
                        {showEditor ? "Cancel" : "Leave a comment!"}
                    </Button>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <div className="mt-4 bg-zinc-400 dark:bg-zinc-800 rounded-md p-2" hidden={!showEditor}>
                    <Editor
                        placeholder="Leave a comment..."
                        editorState={editorState}
                        setEditorState={setEditorState}
                        maxLength={1000}
                    />
                    <div className="flex flex-row gap-2 items-center">
                        <div className="flex flex-row w-full justify-start mt-2">
                            <span hidden={!!!error} className="py-2 px-3 text-red-500 bg-zinc-500 dark:bg-zinc-900 rounded-md">{error}</span>
                            <span hidden={!!!success} className="py-2 px-3 text-green-500 bg-zinc-500 dark:bg-zinc-900 rounded-md">{success}</span>
                        </div>
                        <div className="flex flex-row w-full gap-2 text-right justify-end items-center mt-2">
                            <span className="py-2 px-3 bg-zinc-500 dark:bg-zinc-900 rounded-md text-gray-700 dark:text-gray-500 hover:shadow-glow-2">{editorState.getCurrentContent().getPlainText().length}/1000 characters</span>
                            <Button onClick={handleSaveMessage}>Send</Button>
                        </div>
                    </div>
                </div>
                <div className="flex min-h-full flex-col gap-y-4 mt-4">
                    {
                        messages.length ?
                            messages.map((message) => (
                                <ProfileMessage key={message.id} message={message} setMessages={setMessages} profileOwner={user} />
                            )).sort((a, b) => b.props.message.createdAt - a.props.message.createdAt)
                            : !showEditor && <h1 className="flex self-center mt-4 text-xl font-bold bg-black py-2 px-3 rounded-md border border-blue-600 shadow-glow-5">
                                There are no comments on {user.username}'s profile yet!
                            </h1>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileMessages;

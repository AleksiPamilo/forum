import React, { useState } from "react";
import Functions from "../../functions";
import { IUser } from "../../interfaces/User";
import Button from "../Button";
import Editor from "../Editor";
import ProfileMessage from "./ProfileMessage";
import { useAuth } from "../context/AuthContext";
import { v4 as uuid } from "uuid";
import { useModal } from "../context/ModalContext";
import { stateToHTML } from "draft-js-export-html";
import { EditorState } from "draft-js";

type ProfileMessagesProps = {
    user: IUser
};

const ProfileMessages: React.FC<ProfileMessagesProps> = ({ user }) => {
    const { user: currentUser } = useAuth();
    const { setModalContent, setIsModalOpen } = useModal();
    const [messages, setMessages] = useState(user.messages ?? []);
    const [showEditor, setShowEditor] = useState<boolean>(false);
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

    const handleSaveMessage = () => {
        if (!editorState.getCurrentContent().hasText()) {
            setModalContent(
                <div className="flex flex-col w-[25rem] text-white p-4 bg-zinc-600 rounded-md border border-white">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold">Error!</h1>
                        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                    </div>
                    <p className="mt-4 text-xl font-bold">Message content cannot be empty!</p>
                </div>
            );
            setIsModalOpen(true);
            return;
        }

        if (!currentUser) {
            setModalContent(
                <div className="flex flex-col w-[25rem] text-white p-4 bg-zinc-600 rounded-md border border-white">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold">Error!</h1>
                        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                    </div>
                    <p className="mt-4 text-base font-bold">You must be logged in to comment on other people's profiles!</p>
                </div>
            );
            setIsModalOpen(true);
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
            setShowEditor(false);
            setEditorState(EditorState.createEmpty());
        }
    }

    return (
        <div className="flex flex-col p-2 w-full">
            <div className="flex flex-row justify-between">
                <h1 className="text-3xl font-bold">Posts</h1>
                <div className="flex flex-row gap-2">
                    {showEditor && <Button onClick={handleSaveMessage}>Send</Button>}
                    <Button
                        colors={{ background: "bg-zinc-600 hover:bg-zinc-700", text: "text-white" }}
                        onClick={() => {
                            if (currentUser || showEditor) {
                                setShowEditor(!showEditor)
                            } else {
                                setModalContent(
                                    <div className="flex flex-col w-[25rem] text-white p-4 bg-zinc-600 rounded-md border border-white">
                                        <div className="flex justify-between">
                                            <h1 className="text-2xl font-bold">Error!</h1>
                                            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                                        </div>
                                        <p className="mt-4 text-base font-bold">You must be logged in to comment on other people's profiles!</p>
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
                <div className="mt-4 " hidden={!showEditor}>
                    <Editor
                        placeholder="Leave a comment..."
                        editorState={editorState}
                        setEditorState={setEditorState}
                        maxLength={1000}
                    />
                </div>
                <div className="flex min-h-full flex-col gap-y-4 mt-4">
                    {
                        messages.length ?
                            messages.map((message) => (
                                <ProfileMessage key={message.id} message={message} setMessages={setMessages} profileOwner={user} />
                            )).sort((a, b) => b.props.message.createdAt - a.props.message.createdAt)
                            : showEditor
                                ? null
                                : <h1 className="flex self-center mt-4 text-xl font-bold bg-zinc-600 py-2 px-3 rounded-md">
                                    There are no messages on {user.username}'s profile yet!
                                </h1>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileMessages;

import React from "react";
import { IUser } from "../../interfaces/User";
import ProfileMessage from "./ProfileMessage";

type ProfileMessagesProps = {
    user: IUser
};

const ProfileMessages: React.FC<ProfileMessagesProps> = ({ user }) => {
    return (
        <div className="flex flex-col p-2 w-full">
            <h1 className="text-3xl text-center font-bold">Posts</h1>
            <div className="flex flex-col w-full">
                <div className="flex flex-col gap-y-4 mt-4">
                    {
                        user.messages?.length ?
                            user.messages.map((message) => (
                                <ProfileMessage key={message.id} message={message} />
                            ))
                            : <h1 className="text-center text-xl font-bold bg-zinc-600 inline py-2 px-3 rounded-md">There are no messages on {user.username}'s profile yet!</h1>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileMessages;

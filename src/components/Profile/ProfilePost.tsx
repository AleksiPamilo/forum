import React from "react";
import Functions from "../../functions";
import { IProfilePost } from "../../interfaces/Post";

type ProfilePostProps = {
    post: IProfilePost
};

const ProfilePost: React.FC<ProfilePostProps> = ({ post }) => {
    return (
        <div className="flex bg-zinc-600 rounded-md shadow-xl border border-white">
            <img className="w-28 h-28 border border-white rounded-full m-4" alt="" src={post.createdBy.photoUrl} />
            <div className="mt-2">
                <div className="flex flex-row">
                    <h1 className="font-bold text-blue-500 hover:cursor-pointer hover:underline">{post.createdBy.username}</h1>
                    <span className="mx-4">—</span>
                    <h1 className="text-gray-400">{Functions.timeElapsed(post.createdAt)}</h1>
                </div>
                <p className="mt-2">{post.content}</p>
            </div>
        </div>
    )
}

export default ProfilePost;

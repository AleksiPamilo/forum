import React from "react";
import { IUser } from "../../interfaces/User";
import ProfilePost from "./ProfilePost";

type ProfilePostsProps = {
    user: IUser
};

// const ProfilePosts: React.FC<ProfilePostsProps> = ({ user }) => {
const ProfilePosts: React.FC<ProfilePostsProps> = ({ user }) => {
    return (
        <div className="flex flex-col p-2 w-full">
            <h1 className="text-3xl text-center font-bold">Posts</h1>
            <div className="flex flex-col w-full">
                <div className="flex flex-col gap-4 mt-4">
                    {user.posts.map((post) => (
                        <ProfilePost key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProfilePosts;

import React from "react";
import { IUser } from "../../interfaces/User";

type ProfileHeaderProps = {
    user: IUser
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
    return (
        <div className="flex flex-row min-w-[23.5rem]">
            <img src={user.photoUrl} alt="pfp" className="w-20 h-20 md:w-60 md:h-60 self-center m-4 rounded-full select-none" />
            <div className="flex flex-col ml-4 md:ml-12">
                <h1 className="text-3xl font-bold pt-4">{user.username}</h1>
                <span className="max-w-[60rem] md:max-w-[80rem] line-clamp-4 md:line-clamp-[7] my-5 mr-5" >{
                    !user.about
                        ? "This user hasn't written anything about themselves yet."
                        : user.about
                }</span>
            </div>
        </div>
    )
}

export default ProfileHeader;

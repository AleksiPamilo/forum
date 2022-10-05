import React from "react";
import { FaEnvelope, FaFacebook, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { IUser } from "../interfaces/User";

type ProfileHeaderProps = {
    user: IUser
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
    return (
        <div className="flex flex-row m-4 min-w-[23.5rem]">
            <img src={user.photoUrl} alt="pfp" className="w-20 h-20 md:w-60 md:h-60 self-center rounded-full bg-zinc-500 border border-white select-none" />
            <div className="flex flex-col relative ml-4 md:ml-12">
                <h1 className="text-3xl font-bold">{user.username}</h1>
                <span className="max-w-[60rem] md:max-w-[80rem] max-h-[10.5rem] overflow-hidden break-words line-clamp-4 md:line-clamp-[7] mb-12" >{user.about}</span>

                <div className="flex flex-row pt-3 gap-4 absolute bottom-0">
                    <a href={user.socials?.facebook?.url ?? ""} className={`${user.socials?.facebook ? "flex" : "hidden"} gap-2 hover:underline`}>
                        <FaFacebook className="w-8 h-8 hover:text-gray-500" />
                    </a>
                    <a href={user.socials?.instagram?.url ?? ""} className={`${user.socials?.instagram ? "flex" : "hidden"} gap-2 hover:underline`}>
                        <FaInstagram className="w-8 h-8 hover:text-gray-500" />
                    </a>
                    <a href={user.socials?.twitter?.url ?? ""} className={`${user.socials?.twitter ? "flex" : "hidden"} gap-2 hover:underline`} >
                        <FaTwitter className="w-8 h-8 hover:text-gray-500" />
                    </a>
                    <a href={user.socials?.linkedin?.url ?? ""} className={`${user.socials?.linkedin ? "flex" : "hidden"} gap-2 hover:underline`} >
                        <FaLinkedinIn className="w-8 h-8 hover:text-gray-500" />
                    </a>
                    <a href={user.socials?.github?.url ?? ""} className={`${user.socials?.github ? "flex" : "hidden"} gap-2 hover:underline`} >
                        <FaGithub className="w-8 h-8 hover:text-gray-500" />
                    </a>
                    <a href={`${"mailto:" + user.socials?.mail?.email ?? ""}`} className={`${user.socials?.mail ? "flex" : "hidden"} gap-2 hover:underline`} >
                        <FaEnvelope className="w-8 h-8 hover:text-gray-500" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader;

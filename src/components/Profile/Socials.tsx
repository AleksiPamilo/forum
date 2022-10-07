import React from "react";
import { IUser } from "../../interfaces/User";
import { FaEnvelope, FaFacebook, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

type SocialsProps = {
    user: IUser
};

const Socials: React.FC<SocialsProps> = ({ user }) => {
    return (
        <div className="flex flex-col p-2">
            <h1 className="text-3xl text-center font-bold">Socials</h1>
            <div className="flex flex-col p-2 gap-4">
                <a href={user.socials?.facebook?.url ?? ""} className={`${user.socials?.facebook ? "flex" : "hidden"} items-center gap-2 hover:underline`}>
                    <FaFacebook className="w-8 h-8 hover:text-gray-500" />
                    <h1 className="text-base font-semibold whitespace-nowrap max-w-[15rem] truncate">{user.socials?.facebook?.username ?? ""}</h1>
                </a>
                <a href={user.socials?.instagram?.url ?? ""} className={`${user.socials?.instagram ? "flex" : "hidden"} items-center gap-2 hover:underline`}>
                    <FaInstagram className="w-8 h-8 hover:text-gray-500" />
                    <h1 className="text-base font-semibold whitespace-nowrap max-w-[15rem] truncate">{user.socials?.instagram?.username ?? ""}</h1>
                </a>
                <a href={user.socials?.twitter?.url ?? ""} className={`${user.socials?.twitter ? "flex" : "hidden"} items-center gap-2 hover:underline`} >
                    <FaTwitter className="w-8 h-8 hover:text-gray-500" />
                    <h1 className="text-base font-semibold whitespace-nowrap max-w-[15rem] truncate">{user.socials?.twitter?.username ?? ""}</h1>
                </a>
                <a href={user.socials?.linkedin?.url ?? ""} className={`${user.socials?.linkedin ? "flex" : "hidden"} items-center gap-2 hover:underline`} >
                    <FaLinkedinIn className="w-8 h-8 hover:text-gray-500" />
                    <h1 className="text-base font-semibold whitespace-nowrap max-w-[15rem] truncate">{user.socials?.linkedin?.username ?? ""}</h1>
                </a>
                <a href={user.socials?.github?.url ?? ""} className={`${user.socials?.github ? "flex" : "hidden"} items-center gap-2 hover:underline`} >
                    <FaGithub className="w-8 h-8 hover:text-gray-500" />
                    <h1 className="text-base font-semibold whitespace-nowrap max-w-[15rem] truncate">{user.socials?.github?.username ?? ""}</h1>
                </a>
                <a href={`${"mailto:" + user.socials?.mail?.email ?? ""}`} className={`${user.socials?.mail ? "flex" : "hidden"} items-center gap-2 hover:underline`} >
                    <FaEnvelope className="w-8 h-8 hover:text-gray-500" />
                    <h1 className="text-base font-semibold whitespace-nowrap max-w-[15rem] truncate">{user.socials?.mail?.email ?? ""}</h1>
                </a>
            </div>
        </div>
    )
}

export default Socials;

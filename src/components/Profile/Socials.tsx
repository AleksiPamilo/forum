import React from "react";
import { IUser } from "../../interfaces/User";
import * as Icons from "react-icons/fa";

type SocialsProps = {
    user: IUser
};

const Socials: React.FC<SocialsProps> = ({ user }) => {
    return (
        <div className="flex flex-col p-2">
            <h1 className="text-3xl text-center font-bold">Socials</h1>
            <div className="flex flex-col self-center md:self-start p-2 gap-4">
                {
                    user.socials?.length
                        ? user.socials?.map((social) => {
                            const IconComponent = Icons[(social.icon) as keyof typeof Icons];
                            return (
                                <div>
                                    <a href={social.url} className="flex items-center gap-2 hover:underline">
                                        <IconComponent className={`w-8 h-8 ${getStyle(social.icon)}`} />
                                        <h1 className="text-base font-semibold whitespace-nowrap max-w-[15rem] truncate">{social.username}</h1>
                                    </a>
                                </div>
                            )
                        })
                        : <div className="text-center mt-4 px-3 py-2 bg-black rounded-md border border-blue-600 shadow-glow-5">
                            {user.username} hasn't linked any social accounts yet!
                        </div>
                }
            </div>
        </div>
    )
}

export default Socials;

function getStyle(iconName: string) {
    switch (iconName) {
        case "FaGithub":
            return "text-white hover:text-gray-300";
        case "FaTwitter":
            return "text-blue-400 hover:text-blue-300";
        case "FaLinkedin":
            return "text-blue-600 hover:text-blue-500";
        case "FaInstagram":
            return "text-pink-700 hover:text-pink-600";
        case "FaFacebook":
            return "text-blue-800 hover:text-blue-700";
        case "FaDiscord":
            return "text-gray-600 hover:text-gray-500";
    };
}

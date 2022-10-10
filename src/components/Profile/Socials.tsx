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
                    user.socials?.map((social) => {
                        const IconComponent = Icons[(social.icon.name) as keyof typeof Icons];
                        return (
                            <div>
                                <a href={social.url} className="flex items-center gap-2 hover:underline">
                                    <IconComponent className={social.icon.style} />
                                    <h1 className="text-base font-semibold whitespace-nowrap max-w-[15rem] truncate">{social.username}</h1>
                                </a>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Socials;

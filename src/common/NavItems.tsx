import { AiFillHome, AiTwotoneSound, AiFillSetting } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

interface INavItem {
    title: string,
    path: string,
    icon?: JSX.Element,
}

export const navItems: INavItem[] = [
    {
        title: "Forums",
        path: "/forums",
        icon: <AiFillHome />
    },
    {
        title: "What's New",
        path: "/whats-new",
        icon: <AiTwotoneSound />
    },
];

export const ProfileItems: INavItem[] = [
    {
        title: "Profile",
        path: "/profile",
        icon: <FaUserAlt />
    },
    {
        title: "Settings",
        path: "/settings",
        icon: <AiFillSetting />
    },
];

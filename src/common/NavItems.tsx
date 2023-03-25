import { AiTwotoneSound, AiFillSetting } from "react-icons/ai";
import { MdForum } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { DropdownOptions } from "../components/Dropdown";

type LinkNavItem = {
    type: "link",
    title: string,
    path: string,
    icon?: JSX.Element,
};

type DropdownNavItem = {
    type: "dropdown",
    label: string,
    icon?: JSX.Element,
    options: DropdownOptions[],
    onChange?: (option: string) => void,
};

type DividerNavItem = {
    type: "divider",
    divider: boolean,
    text?: string,
};

export type NavItem = LinkNavItem | DropdownNavItem | DividerNavItem;

const settingOptions: DropdownOptions[] = [
    {
        label: <div className="flex items-center gap-3 text-base">
            <AiFillSetting />
            <p>Profile</p>
        </div>,
        value: "/settings",
    },
    {
        label: <div className="flex items-center gap-3 text-base">
            <AiFillSetting />
            <p>Social</p>
        </div>,
        value: "/settings/social",
    }
];

export const navItems: NavItem[] = [
    {
        type: "link",
        title: "Forums",
        path: "/forums",
        icon: <MdForum />
    },
    {
        type: "link",
        title: "What's New",
        path: "/whats-new",
        icon: <AiTwotoneSound />
    },
    {
        type: "divider",
        divider: true,
    },
    {
        type: "link",
        title: "Profile",
        path: "/profile",
        icon: <FaUserAlt />
    },
    {
        type: "dropdown",
        label: "Settings",
        icon: <AiFillSetting />,
        options: settingOptions,
    },
];

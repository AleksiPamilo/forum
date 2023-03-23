import { AiFillHome, AiTwotoneSound } from "react-icons/ai"

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

export const sidebarItems: INavItem[] = [
    {
        title: "Forums",
        path: "/forums",
    },
    {
        title: "General",
        path: "/settings",
    },
    {
        title: "Social",
        path: "/settings/social",
    }
];

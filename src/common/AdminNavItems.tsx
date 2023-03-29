import { MdForum, MdDashboardCustomize } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

import type { NavItem } from "./NavItems";

export const adminNavItems: NavItem[] = [
    {
        type: "link",
        title: "Forums",
        path: "/",
        icon: <MdForum />
    },
    {
        type: "link",
        title: "Profile",
        path: "/profile",
        icon: <FaUserAlt />
    },
    { type: "divider", text: "Admin" },
    {
        type: "link",
        title: "Dashboard",
        path: "/admin",
        icon: <MdDashboardCustomize />
    },
    {
        type: "link",
        title: "Manage Forums",
        path: "/admin/forums",
        icon: <MdForum />
    },
];

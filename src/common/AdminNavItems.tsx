import { MdForum, MdDashboardCustomize } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

import type { NavItem } from "./NavItems";

export const adminNavItems: NavItem[] = [
    {
        type: "link",
        title: "Forums",
        path: "/forums",
        icon: <MdForum />
    },
    {
        type: "link",
        title: "Profile",
        path: "/profile",
        icon: <FaUserAlt />
    },
    { type: "divider", divider: true, text: "Admin" },
    {
        type: "link",
        title: "Dashborad",
        path: "/admin",
        icon: <MdDashboardCustomize />
    },
    {
        type: "link",
        title: "Forums",
        path: "/admin/forums",
        icon: <MdForum />
    },
];

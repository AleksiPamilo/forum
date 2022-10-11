interface INavItem {
    title: string,
    path: string,
}

export const navItems: INavItem[] = [
    {
        title: "Forums",
        path: "/",
    },
    {
        title: "What's New",
        path: "/whats-new",
    },
];

export const sidebarItems: INavItem[] = [
    {
        title: "General",
        path: "/settings",
    },
];

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

export default navItems

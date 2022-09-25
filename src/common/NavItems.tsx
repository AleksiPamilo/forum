interface INavItem {
    title: string,
    path: string,
}

export const forumItems: INavItem[] = [
    {
        title: "Forums",
        path: "/",
    },
    {
        title: "What's New",
        path: "/whats-new",
    },
];

export const whatsNewItems: INavItem[] = [
    {
        title: "Forums",
        path: "/",
    },
    {
        title: "New posts",
        path: "/whats-new/posts",
    },
    {
        title: "New threads",
        path: "/whats-new/threads",
    },
    {
        title: "New profile posts",
        path: "/whats-new/profile-posts",
    },
];
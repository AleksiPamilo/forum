import { forumItems, whatsNewItems } from "../common/NavItems";

const Navigation = () => {
    const navItems = window.location.pathname.includes("whats-new") ? whatsNewItems : forumItems;

    return (
        <div className="flex w-full align-middle border-b border-gray-200">
            {
                navItems.map(x => (
                    <a href={x.path} className="text-lg font-semibold text-gray-300 py-2 p-4 hover:bg-zinc-800">{x.title}</a>
                ))
            }
        </div>
    )
}

export default Navigation;

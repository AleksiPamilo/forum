import { Link } from "react-router-dom";
import navItems from "../common/NavItems";

const Navigation = () => {
    return (
        <div className="flex w-full align-middle border-b border-gray-200">
            {
                navItems.map(x => (
                    <Link to={x.path} className="text-lg font-semibold text-gray-300 py-2 p-4 hover:bg-zinc-800">{x.title}</Link>
                ))
            }
        </div>
    )
}

export default Navigation;

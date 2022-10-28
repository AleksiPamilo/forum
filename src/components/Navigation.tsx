import { Link } from "react-router-dom";
import { navItems } from "../common/NavItems";

const Navigation = () => {
    return (
        <div className="flex w-full align-middle gap-3">
            {
                navItems.map(x => (
                    <Link to={x.path} className="text-lg font-semibold px-3 rounded-t-md border-b-2 border-blue-600 hover:shadow-[0_0_15px_10px_rgba(0,0,255,.35)]">{x.title}</Link>
                ))
            }
        </div>
    )
}

export default Navigation;

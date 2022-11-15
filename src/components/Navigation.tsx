import { Link } from "react-router-dom";
import { navItems } from "../common/NavItems";

const Navigation = () => {
    return (
        <div className="flex w-full align-middle gap-3 justify-between">
            <div className="flex gap-3">
                {
                    navItems.map(x => (
                        <Link to={x.path} className="text-lg font-semibold px-3 rounded-t-md border-b-2 border-gray-600 hover:shadow-glow-7">{x.title}</Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Navigation;

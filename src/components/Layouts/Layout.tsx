import { FC } from "react";
import { Outlet } from "react-router-dom";
import { navItems } from "../../common/NavItems";
import Sidebar from "../Sidebar";

const Layout: FC = () => {

    return (
        <div className="min-w-[100vw] min-h-[100vh] shadow-xl bg-light-primary dark:bg-dark-primary text-black dark:text-white overflow-hidden pl-4 md:pl-0">
            <Sidebar NavItems={navItems} />
            <div className="md:ml-[21rem] mt-6 pr-4 md:mt-0">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;

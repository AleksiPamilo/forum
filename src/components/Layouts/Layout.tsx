import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";
import Sidebar from "../Sidebar";

const Layout: FC = () => {
    return (
        <div className="min-w-[100vw] min-h-[100vh] shadow-xl bg-white dark:bg-[#101010] text-black dark:text-white overflow-hidden">
            <Sidebar />
            <Navigation />
            <div className="md:ml-64 mr-4 pt-4">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;

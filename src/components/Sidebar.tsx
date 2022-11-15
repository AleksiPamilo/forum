import React from "react";
import logo from "../assets/logo.png";
import { sidebarItems } from "../common/NavItems";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../hooks";

const Sidebar: React.FC = () => {
    const { logout } = useAuth();
    const navigateTo = useNavigate();

    return (
        <div className="flex flex-col relative items-center w-[15rem] h-screen bg-zinc-900">
            <Link to="/settings" className="pt-4">
                <img src={logo} alt="logo" className="w-40 h-6" />
                <h1 className="text-white text-xl font-semibold text-center mt-1">Settings</h1>
            </Link>
            <div className="flex pt-20">
                <ul className="flex flex-col gap-2 list-none">
                    {
                        sidebarItems.map((item, index) => (
                            <li key={index}>
                                <Link to={item.path}>
                                    <div className="text-sm font-medium py-2 px-8 rounded-md border border-blue-600 hover:shadow-glow-3 text-gray-300 bg-zinc-800 hover:bg-zinc-700">
                                        {item.title}
                                    </div>
                                </Link>
                            </li>
                        ))
                    }
                    <li>
                        <Button onClick={() => {
                            logout();
                            navigateTo("/");
                        }} styles="text-sm font-medium py-2 px-8 rounded-md border border-blue-600 hover:shadow-glow-3 text-gray-300 bg-zinc-800 hover:bg-zinc-700">
                            Logout
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;

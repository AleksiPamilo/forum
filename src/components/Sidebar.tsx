import React from "react";
import logo from "../assets/logo.png";
import { navItems, ProfileItems } from "../common/NavItems";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth, useModal } from "../hooks";
import Dropdown from "./Dropdown";
import Login from "./modals/auth/LoginSignup";

const Sidebar: React.FC = () => {
    const { user } = useAuth();
    const { logout } = useAuth();
    const { setModalContent, setIsModalOpen } = useModal();
    const navigateTo = useNavigate();

    return (
        <div className="fixed w-60 h-full">
            <div className="w-full h-full py-4 flex flex-col items-center bg-zinc-200 text-black dark:text-white dark:bg-[#101010]">
                <Link to="/forums" className="w-40 h-6 select-none">
                    <img src={logo} alt="ForumX" />
                </Link>
                <div className="flex flex-col mt-12 gap-2">
                    {
                        navItems.map((item) => (
                            <Link to={item.path} className="text-white text-center text-xl flex items-center gap-2 group">
                                <p className="bg-zinc-900 p-2 rounded-md opacity-95">{item.icon}</p>
                                <p className="text-xl group-hover:underline">{item.title}</p>
                            </Link>
                        ))
                    }
                    <hr className="border-t border-2 my-4 border-zinc-900" />
                    {
                        ProfileItems.map((item) => (
                            <Link to={item.path} className="text-white text-center text-xl flex items-center gap-2 group">
                                <p className="bg-zinc-900 p-2 rounded-md opacity-95">{item.icon}</p>
                                <p className="text-xl group-hover:underline">{item.title}</p>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar;

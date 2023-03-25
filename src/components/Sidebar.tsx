import React, { useState } from "react";
import logoWhite from "../assets/logo.png";
import logoBlack from "../assets/logo-black.png";
import { INavItem, ProfileItems } from "../common/NavItems";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useAuth, useModal, useTheme } from "../hooks";
import { RiLoginCircleFill, RiLoginBoxFill, RiLogoutCircleFill } from "react-icons/ri";
import { BsFillMoonStarsFill, BsFillSunFill, BsFillDisplayFill } from "react-icons/bs";
import LoginSignup from "./modals/auth/LoginSignup";
import { FaBars, FaTimes } from "react-icons/fa";
import Dropdown from "./Dropdown";

type SidebarProps = {
    NavItems: INavItem[],
}

const Sidebar: React.FC<SidebarProps> = ({ NavItems }) => {
    const { user } = useAuth();
    const { logout } = useAuth();
    const { setModalContent, setIsModalOpen } = useModal();
    const { theme, setTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const logo = theme === "dark" ? logoWhite : (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? logoWhite : logoBlack;

    const themeOptions = [
        {
            label: <div className="flex items-center gap-3 text-lg">
                <BsFillMoonStarsFill />
                <p>Dark</p>
            </div>,
            value: "dark",
        },
        {
            label: <div className="flex items-center gap-3 text-lg">
                <BsFillSunFill />
                <p>Light</p>
            </div>,
            value: "light",
        },
        {
            label:
                <div className="flex items-center gap-3 text-lg">
                    <BsFillDisplayFill />
                    <p>System</p>
                </div>,
            value: "system",
        }
    ];

    return (
        <>
            <Button styles="md:hidden fixed z-50 top-4 right-4 text-white" onClick={() => {
                setIsMenuOpen(!isMenuOpen)
                document.getElementById("sidebar")!.classList.toggle("hidden");
            }}>
                {
                    isMenuOpen
                        ? <FaTimes className="text-3xl" />
                        : <FaBars className="text-3xl" />
                }
            </Button>

            <div id="sidebar" className="hidden md:block z-50 fixed w-60 h-full">
                <div className="w-full h-full py-4 flex flex-col items-center bg-light-primary text-black dark:text-white dark:bg-dark-primary">
                    <Link to="/forums" className="w-40 h-6 select-none">
                        <img src={logo} alt="ForumX" />
                    </Link>
                    <div className="flex flex-col mt-12 gap-2">
                        {
                            NavItems.map((item) => (
                                <Link to={item.path} className="text-center text-xl flex items-center gap-2 group">
                                    <p className="bg-zinc-300 dark:bg-zinc-900 p-2 rounded-md opacity-95">{item.icon}</p>
                                    <p className="text-xl group-hover:underline">{item.title}</p>
                                </Link>
                            ))
                        }
                        <hr className="border-t border-2 my-4 border-zinc-900" />
                        {
                            ProfileItems.map((item) => (
                                <Link to={item.path} className="text-center text-xl flex items-center gap-2 group">
                                    <p className="bg-zinc-300 dark:bg-zinc-900 p-2 rounded-md opacity-95">{item.icon}</p>
                                    <p className="text-xl group-hover:underline">{item.title}</p>
                                </Link>
                            ))
                        }
                        <hr className="border-t border-2 my-4 border-zinc-900" />
                        <Dropdown options={themeOptions}
                            label="Theme"
                            icon={theme === "dark" ? <BsFillMoonStarsFill /> : (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? <BsFillMoonStarsFill /> : <BsFillSunFill />}
                            onChange={(value) => { setTheme(value) }}
                        />
                        <hr className="border-t border-2 my-4 border-zinc-900" />
                        {
                            user ? <Button onClick={() => logout()} styles="text-center text-xl flex items-center gap-2 group">
                                <p className="bg-zinc-300 dark:bg-zinc-900 p-2 rounded-md opacity-95"><RiLogoutCircleFill /></p>
                                <p className="text-xl group-hover:underline">Log Out</p>
                            </Button>
                                : (
                                    <>
                                        <Button onClick={() => {
                                            setModalContent(<LoginSignup isLogin />);
                                            setIsModalOpen(true);
                                        }} styles="text-center text-xl flex items-center gap-2 group">
                                            <p className="bg-zinc-300 dark:bg-zinc-900 p-2 rounded-md opacity-95"><RiLoginCircleFill /></p>
                                            <p className="text-xl group-hover:underline">Login</p>
                                        </Button>
                                        <Button onClick={() => {
                                            setModalContent(<LoginSignup />);
                                            setIsModalOpen(true);
                                        }} styles="text-center text-xl flex items-center gap-2 group">
                                            <p className="bg-zinc-300 dark:bg-zinc-900 p-2 rounded-md opacity-95"><RiLoginBoxFill /></p>
                                            <p className="text-xl group-hover:underline">Sign Up</p>
                                        </Button>
                                    </>
                                )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;

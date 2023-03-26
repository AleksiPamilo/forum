import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useModal, useTheme } from "../hooks";
import { RiLoginCircleFill, RiLoginBoxFill, RiLogoutCircleFill } from "react-icons/ri";
import { BsFillMoonStarsFill, BsFillSunFill, BsFillDisplayFill } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import logoWhite from "../assets/logo.png";
import logoBlack from "../assets/logo-black.png";
import LoginSignup from "./modals/auth/LoginSignup";
import Button from "./Button";
import Dropdown from "./Dropdown";

import type { NavItem } from "../common/NavItems";

type SidebarProps = {
    NavItems: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ NavItems }) => {
    const { user } = useAuth();
    const { logout } = useAuth();
    const { setModalContent, setIsModalOpen } = useModal();
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const logo = theme === "dark" ? logoWhite : (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? logoWhite : logoBlack;

    const themeOptions = [
        {
            label: <div className="flex items-center gap-3 text-base">
                <BsFillMoonStarsFill />
                <p>Dark</p>
            </div>,
            value: "dark",
        },
        {
            label: <div className="flex items-center gap-3 text-base">
                <BsFillSunFill />
                <p>Light</p>
            </div>,
            value: "light",
        },
        {
            label:
                <div className="flex items-center gap-3 text-base">
                    <BsFillDisplayFill />
                    <p>System</p>
                </div>,
            value: "system",
        }
    ];

    const handleIsMenuOpen = () => {
        setIsMenuOpen(!isMenuOpen)
        document.getElementById("sidebar")!.classList.toggle("hidden");
    }

    return (
        <>
            <Button styles="md:hidden fixed z-40 top-4 right-4 text-black dark:text-white" onClick={handleIsMenuOpen}>
                {
                    isMenuOpen
                        ? <FaTimes className="text-3xl" />
                        : <FaBars className="text-3xl" />
                }
            </Button>

            <div id="sidebar" className={`z-40 fixed max-sm:w-screen h-screen bg-transparent transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`} onClick={handleIsMenuOpen}>
                <div className="w-80 h-full" onClick={e => e.stopPropagation()}>
                    <div className="w-full h-full py-4 flex flex-col items-center bg-light-primary text-black dark:text-white dark:bg-dark-primary ">
                        <Link to="/forums" className="w-40 h-6 select-none">
                            <img src={logo} alt="ForumX" />
                        </Link>
                        <div className="flex flex-col w-4/5 mt-12 gap-3">
                            {
                                NavItems.map((item) => {
                                    if (item.type === "link") {
                                        return (
                                            <Link to={item.path} className="text-center text-lg flex items-center gap-2 group" onClick={handleIsMenuOpen}>
                                                <p className="bg-zinc-300 dark:bg-zinc-900 p-2 rounded-md opacity-95">{item.icon}</p>
                                                <p className="text-lg group-hover:underline">{item.title}</p>
                                            </Link>
                                        )
                                    } else if (item.type === "dropdown") {
                                        return (
                                            <Dropdown options={item.options}
                                                label={item.label}
                                                icon={item.icon}
                                                onChange={(value) => { navigate(value); handleIsMenuOpen(); }}
                                            />
                                        );
                                    } else if (item.type === "divider" && item.divider) {
                                        return (
                                            <>
                                                {
                                                    !!item?.text
                                                        ? (
                                                            <div className="relative flex items-center">
                                                                <div className="flex-grow border-t-2 border-zinc-300 dark:border-zinc-900"></div>
                                                                <span className="flex-shrink mx-2 text-zinc-600">{item.text}</span>
                                                                <div className="flex-grow border-t-2 border-zinc-300 dark:border-zinc-900"></div>
                                                            </div>
                                                        ) : (
                                                            <hr className="border-t-2 my-4 border-zinc-300 dark:border-zinc-900" />
                                                        )
                                                }
                                            </>
                                        )
                                    } else return null;
                                })
                            }
                            <hr className="border-t-2 my-4 border-zinc-300 dark:border-zinc-900" />
                            <Dropdown options={themeOptions}
                                label="Theme"
                                icon={theme === "dark" ? <BsFillMoonStarsFill /> : (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? <BsFillMoonStarsFill /> : <BsFillSunFill />}
                                onChange={(value) => { setTheme(value); handleIsMenuOpen(); }}
                            />
                            <hr className="border-t-2 my-4 border-zinc-300 dark:border-zinc-900" />
                            {
                                user ? (
                                    <Button onClick={() => { logout(); handleIsMenuOpen() }} styles="text-center text-lg flex items-center gap-2 group">
                                        <p className="bg-zinc-300 dark:bg-zinc-900 p-2 rounded-md opacity-95"><RiLogoutCircleFill /></p>
                                        <p className="text-lg group-hover:underline">Log Out</p>
                                    </Button>
                                ) : (
                                    <>
                                        <Button onClick={() => {
                                            setModalContent(<LoginSignup isLogin />)
                                            setIsModalOpen(true);
                                            handleIsMenuOpen();
                                        }} styles="text-center text-lg flex items-center gap-2 group">
                                            <p className="bg-zinc-300 dark:bg-zinc-900 p-2 rounded-md opacity-95"><RiLoginCircleFill /></p>
                                            <p className="text-lg group-hover:underline">Log In</p>
                                        </Button>
                                        <Button onClick={() => {
                                            setModalContent(<LoginSignup />)
                                            setIsModalOpen(true);
                                            handleIsMenuOpen();
                                        }} styles="text-center text-lg flex items-center gap-2 group">
                                            <p className="bg-zinc-300 dark:bg-zinc-900 p-2 rounded-md opacity-95"><RiLoginBoxFill /></p>
                                            <p className="text-lg group-hover:underline">Sign Up</p>
                                        </Button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;

import React from "react";
import logo from "../assets/logo.png";
import { navItems } from "../common/NavItems";
import { Link } from "react-router-dom";
// import Button from "./Button";
// import { useAuth } from "../hooks";
// import Dropdown from "./Dropdown";

const Sidebar: React.FC = () => {
    // const { user } = useAuth();
    // const { logout } = useAuth();
    // const navigateTo = useNavigate();

    // const dropdownOptions = [
    //     {
    //         label: "Profile",
    //         navigateTo: "/profiles" + (user?.displayName ? `/${user.displayName}` : ""),
    //     },
    //     {
    //         label: "Settings",
    //         navigateTo: "/settings"
    //     },
    //     {
    //         label: "Logout",
    //         onClick: () => logout()
    //     }
    // ];

    return (
        <div className="fixed w-60 h-full">
            <div className="w-full h-full py-4 flex flex-col items-center bg-zinc-200 text-black dark:text-white dark:bg-[#101010]">
                <Link to="/forums" className="w-40 h-6 select-none">
                    <img src={logo} alt="ForumX" />
                </Link>
                <div className="flex flex-col mt-12 gap-2">
                    {
                        navItems.map((item) => (
                            <Link to={item.path} className="text-center text-xl flex items-center gap-2 group">
                                <p className="bg-zinc-900 p-2 rounded-md opacity-95">{item.icon}</p>
                                <p className="text-xl group-hover:underline">{item.title}</p>
                            </Link>
                        ))
                    }
                </div>
                {/* <div className="absolute w-screen h-screen flex items-center justify-center">
                    <Dropdown
                        positionX="right"
                        options={dropdownOptions}
                        btnStyles="rounded-full w-10 h-10 bg-gray-500 border-2 border-blue-600 hover:shadow-[0_0_10px_7px_rgba(0,0,255,.35)]"
                        label={<img className="w-full h-full rounded-full hover:opacity-80 hover:ease-in-out hover:duration-200" alt="" src={user?.photoURL!} />}
                    />
                </div> */}
            </div>
        </div>
    )
}

export default Sidebar;

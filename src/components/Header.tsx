import { Link } from "react-router-dom";
import { useAuth, useModal } from "../hooks";
import logo from "../assets/logo.png";
import Button from "./Button";
import Login from "./modals/auth/LoginSignup";
import Navigation from "./Navigation";
import Dropdown from "./Dropdown";

const Header = () => {
    const { user, isLoggedIn, logout } = useAuth();
    const { setIsModalOpen, setModalContent } = useModal();

    const handleModal = (isLogin?: boolean) => {
        setIsModalOpen(true);
        setModalContent(<Login isLogin={isLogin ?? true} />);
    }

    const dropdownOptions = [
        {
            label: "Profile",
            navigateTo: "/profiles" + (user?.displayName ? `/${user.displayName}` : ""),
        },
        {
            label: "Settings",
            navigateTo: "/settings"
        },
        {
            label: "Logout",
            onClick: () => logout()
        }
    ];

    return (
        <header className="sticky">
            <div className="flex w-full pb-4 items-center justify-between align-middle border-b border-gray-200">
                <Link className="select-none" to="/">
                    <img className="select-none w-40 h-6" alt="" src={logo} />
                </Link>
                <div>
                    {
                        isLoggedIn
                            ? <div className="flex flex-row gap-6">
                                <p className="pt-2 max-w-[8rem] md:max-w-[20rem] whitespace-nowrap overflow-hidden text-ellipsis">Welcome, {user?.displayName ?? user?.email ?? "Unknown User"}!</p>
                                <Dropdown
                                    options={dropdownOptions}
                                    btnStyles="rounded-full w-10 h-10 bg-gray-500 hover:bg-zinc-500"
                                    label={<img className="w-full h-full rounded-full hover:opacity-80 hover:ease-in-out hover:duration-200" alt="" src={user?.photoURL!} />}
                                />
                            </div>
                            : <div className="flex flex-row gap-2">
                                <Button onClick={handleModal}>Login</Button>
                                <Button colors={{ background: "bg-green-600 hover:bg-green-700" }} onClick={() => { handleModal(false) }}>Register</Button>
                            </div>
                    }
                </div>
            </div>
            <Navigation />
        </header>
    )
}

export default Header;

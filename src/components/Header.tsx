import { Link } from "react-router-dom";
import { useAuth, useModal } from "../hooks";
import { FiLogIn } from "react-icons/fi";
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
            navigateTo: user?.displayName ? `/${user.displayName}/profile` : "",
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
        <header>
            <div className="flex w-full pb-4 items-center justify-between align-middle">
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
                                    btnStyles="rounded-full w-10 h-10 bg-gray-500 border-2 border-blue-600 hover:shadow-[0_0_10px_7px_rgba(0,0,255,.35)]"
                                    label={<img className="w-full h-full rounded-full hover:opacity-80 hover:ease-in-out hover:duration-200" alt="" src={user?.photoURL!} />}
                                />
                            </div>
                            : <div className="flex flex-row gap-2">
                                <Button styles="w-10 h-10 bg-gray-500 rounded-full p-1 flex items-center justify-center border-2 border-blue-600 hover:shadow-[0_0_10px_7px_rgba(0,0,255,.35)]" onClick={handleModal}>
                                    <FiLogIn className="w-5 h-5" />
                                </Button>
                            </div>
                    }
                </div>
            </div>
            <Navigation />
        </header>
    )
}

export default Header;

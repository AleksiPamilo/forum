import { Link } from "react-router-dom";
import { useAuth, useModal } from "../hooks";
import Button from "./Button";
import Login from "./modals/auth/loginSignup";
import Navigation from "./Navigation";

const Header = () => {
    const { user, isLoggedIn, logout } = useAuth();
    const { setIsModalOpen, setModalContent } = useModal();

    const handleModal = (isLogin?: boolean) => {
        setIsModalOpen(true);
        setModalContent(<Login isLogin={isLogin ?? true} />);
    }

    return (
        <header>
            <div className="flex w-full pb-2 justify-between align-middle border-b border-gray-200">
                <h1 className="text-2xl font-extrabold">ForumX</h1>
                <div>
                    {
                        isLoggedIn
                            ? <div className="flex flex-row gap-6">
                                <p className="pt-2">Hi, <Link to="/settings" className="py-2 hover:bg-zinc-800 cursor-pointer">{user?.displayName ?? user?.email ?? "Unknown User"}</Link>!</p>
                                <Button onClick={logout}>Logout</Button>
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
